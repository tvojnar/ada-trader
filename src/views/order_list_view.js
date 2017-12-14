import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';


const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.optionTemplate = params.optionTemplate;
    this.quoteList = params.quoteList;

    // TODO add events to listen to here
    // this.model' is a collection in this view
    this.listenTo(this.model, 'update', this.render)
    // listen for the 'quote_names_for_form' being triggered when the QuoteListView is rendered
    this.listenTo(this.bus, 'quote_names_for_form', this.generateOptions)
  }, // initialize
  events: {
    'click button.btn-buy': 'addOrder',
    'click button.btn-sell': 'addOrder',
  },
  addOrder(event) {
    event.preventDefault();
    console.log('in addOrder!');
    // generate the data to make a new instance of Order from the form and then make a new instance of Order
    const formData = this.getFormData(event);
    const newOrder = new Order(formData);


    // QUESTION: leaving the check that the targetPrice is > or < the price of the quote in here because this will change and an order would later be invalid at the time the buy or sell goes though if I put it in the validations... also there are diffent validations for buy and sell?

    console.log(`created a new instance of order: ${newOrder}`);
    if (newOrder.isValid()) {
      // NOTE: this is HUGE if/else statement! Try to come back and refactor this to make it better later :)

      // pull out the current price of the Quote that corresponds to newOrder to check the targetPrice of newOrder againts
      let currentQuote = this.quoteList.find(function(model) { return model.get('symbol') === newOrder.get('symbol')})
      let currentQuotePrice = currentQuote.get('price');
      console.log(`the current price of the quote is ${currentQuotePrice}`);

      // for a BUY: if the targetPrice of the newOrder is less than the current price of the Quote go ahead and add newOrder to the OrderList collection
      if (newOrder.get('action') === 'Buy' && (newOrder.get('targetPrice') < currentQuotePrice )) {
        console.log(`in if (buy). targetPrice: ${newOrder.get('targetPrice')}, currentQuotePrice: ${currentQuotePrice}`);
        this.model.add(newOrder);
        this.statusMessage(`A new order for ${newOrder.get('symbol')} was created!`)
        this.clearFormData();
      // for a SELL: if the targetPrice of newOrder is greater than the current price of the Quote go ahead and add newOrder to the OrderList collection
      } else if ((newOrder.get('action') === 'Sell' && (newOrder.get('targetPrice') > currentQuotePrice ))) {
        console.log(`in else if (sell). targetPrice: ${newOrder.get('targetPrice')}, currentQuotePrice: ${currentQuotePrice}`);
        this.model.add(newOrder);
        this.statusMessage(`A new order for ${newOrder.get('symbol')} was created!`)
        this.clearFormData();
      // else display the correct error message depending on if the user tired to create a BUY or SELL order! 
      } else {
        console.log(`in else. targetPrice: ${newOrder.get('targetPrice')}, currentQuotePrice: ${currentQuotePrice}`);
        if (newOrder.get('action') === 'Buy') {
          this.statusMessage(`The target price you listed (${Number(newOrder.get('targetPrice')).toFixed(2)}) is less than the current price of the Quote (${Number(currentQuotePrice).toFixed(2)}) so the order was not created.`)
        } else if (newOrder.get('action') === 'Sell') {
          this.statusMessage(`The target price you listed (${Number(newOrder.get('targetPrice')).toFixed(2)}) is greater than the current price of the Quote (${Number(currentQuotePrice).toFixed(2)}) so the order was not created.`)
        }
      } // inner if/else
    } else {
      this.failureStatusMessageFrom(newOrder.validationError);
      newOrder.destroy();
    } // if/else
  }, //addOrder
  failureStatusMessageFrom(messageHash) {
    // this function will be called in addOrder when the new instance of Order is not valid
    // this error message will appear below the input label
    Object.keys(messageHash).forEach((messageType) => {
      let $statusMessages = this.$(`#${messageType}`)
      messageHash[messageType].forEach((message) => {
        $statusMessages.append(`<li>${message}</li>`)
      }) // inner forEach
    }) // outer forEach
  }, // updateStatusMessageFrom
  statusMessage(message) {
    // this function will be called from in addOrder when a valid instance of Order was created
    // this status message will appear at the top of the form!
    const $statusMesages = this.$('#status-messages');
    $statusMesages.empty();
    $statusMesages.append(`<li>${message}</li>`)
  }, // updateStatusMessage
  getFormData(event) {
    console.log('in getFormData');

    // create an object to store the form data in
    const orderData = {};

    // pull out the symbol from the form for the and add it to orderData
    let select = this.$(`#select`)
    let symbolFromForm = select.val();
    orderData['symbol'] = symbolFromForm;

    // pull out the price-target from the form and add it to orderData
    // have to convert formTargetPrice from a string into a Number because we call .toFixed(2) on it in the template
    let formTargetPrice  = this.$(`#order-form input[name=${'price-target'}]`).val();
    if (formTargetPrice !== '') {
      orderData['targetPrice'] = Number(formTargetPrice);
    }

    // pull out the innerHTML from the button that was clicked (get this via the event that was passed as an argument from addOrder) to set the action attribute as either 'Buy' or 'Sell' depending on if the Buy to Sell button was clicked by the user
    let buttonHtml = event.target.innerHTML;
    orderData['action'] = buttonHtml;

    console.log('at end of getFormData');
    console.log(orderData);

    // return the orderData to addOrder where it will be used to create a new instance of Order
    return orderData;
  }, // getFormData
  clearFormData() {
    console.log('in clearFormData');
    // clear out the targetPrice input field
    this.$(`#order-form input[name=${'price-target'}]`).val('');
    this.$('#targetPrice > li').remove();
  }, // clearFormData
  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      }) // orderView
      this.$(orders).append(orderView.render().$el)
    }) // .each
    return this
  }, // render
  generateOptions(names) {
    // use the optionsTemplate to dynamically generate the options for the select dropdown using the 'names' passed via the bus from the QuoteListView
    console.log('in generateOptions');
    console.log(names);
    // format each name into an object with the name as the value and symbol as the key. This is the format that the optionTemplate is expecting.
    names.forEach((name) => {
      const compiledOption = this.optionTemplate({symbol: name });
      this.$('select').append(compiledOption);
    }) // .each
  }, // generateOptions
}) // OrderListView


export default OrderListView
