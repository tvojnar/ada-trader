import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.optionTemplate = params.optionTemplate;

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

    // TODO: add checks to validate that newOrder isValid before adding newOrder to this.model and clearing the form
    console.log(`created a new instance of order: ${newOrder}`);
    this.model.add(newOrder);
    this.clearFormData();

  }, //addOrder
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

  }, // clearFormData




///////
  // addTask(event) {
  //           event.preventDefault();
  //
  //           const formData = this.getFormData();
  //           const newTask = new Task(formData);
  //
  //           if (newTask.isValid()) {
  //             this.model.add(newTask);
  //             clearFormData();
  //             this.updatedStatusMessage(`${newTask.get('task_name')} created!`)
  //           } else {
  //             this.updateStatusMessageFrom(newTask.validationError);
  //             newTask.destroy();
  //           }
  //
  //
  //         },
  //         clearFormData() {
  //         ['task_name', 'assignee'].forEach((field) => {
  //           this.$('#add-new-task input[name=${field}]').val();
  //         },
  //
///////
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
