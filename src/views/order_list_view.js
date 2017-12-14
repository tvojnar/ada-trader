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
    // TODO: figure out how to get the right data out of the form to populate the model attributes with these values! Right symbol is undefined but I can access the price-target. The error message is complaining that 'price' is not defined when it is trying to make the template, but I am confused why because I don't see where the code is trying to access price ....
    console.log('in getFormData');
    console.log(event.target.innerHTML);
    // console.log(this.$(`#order-form`));





    // var e = document.getElementById("ddlViewBy");
    // var strUser = e.options[e.selectedIndex].text;
    const orderData = {};

    // pull out the symbol from the form for the orderData
    let select = this.$(`#select`)
    let symbolFromForm = select.val();
    orderData['symbol'] = symbolFromForm;
    console.log(symbolFromForm);

    // pull out the price-target from the form for orderData
    let formTargetPrice  = this.$(`#order-form input[name=${'price-target'}]`).val();
      if (formTargetPrice !== '') {
        orderData['targetPrice'] = Number(formTargetPrice);
      }
    let type = typeof formTargetPrice
    console.log(`the type is: ${type}`);

    formTargetPrice = Number(formTargetPrice);
    type = typeof formTargetPrice
    console.log(`formTargetPrice is ${formTargetPrice}`);
    console.log(`type of formTargetPrice is now ${type}`);

    // pull out the innerHTML from the button that was clicked (get this via the event that was passed as an argument from addOrder) to set the action attribute as either 'Buy' or 'Sell'
    let buttonHtml = event.target.innerHTML;
    console.log('buttonHtml');
    console.log(buttonHtml);
    orderData['action'] = buttonHtml;
    // NOTE: why is action still not defined????

    console.log('at end of getFormData');
    console.log(orderData);

    return orderData;

    // getFormData() {
    //           const taskData = {};
    //           ['task_name', 'assignee'].forEach((field) => {
    //             val = this.$('#add-new-task input[name=${field}]').val('');
    //             if (val !== '') {
    //               taskData[field] = val;
    //               } // if
    //           }) // forEach
    //           return taskData;
    //         }
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
