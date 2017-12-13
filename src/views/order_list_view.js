import Backbone from 'backbone';
import OrderView from './order_view';

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
    // use the optionsTemplate to dynamically generate the options for the select using the names passed via the bus from the QuoteListView
    console.log('in generateOptions');
    console.log(names);
    names.forEach((name) => {
      const compiledOption = this.optionTemplate(name);
      this.$('select').append(compiledOption);
    }) // .each

  }, // generateOptions
}) // OrderListView


export default OrderListView
