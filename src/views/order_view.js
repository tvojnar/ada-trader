import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // TODO: add bus events for it to listen to for when the price of the specific quote model it is attached to changes
  }, // initialize
  render() {
    console.log('in the OrderView render');
    const compiledOrderTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledOrderTemplate);

    return this
  }, // render
}) // OrderView 

export default OrderView
