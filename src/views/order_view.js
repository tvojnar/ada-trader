import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // listen to bus event for when the price of the specific quote model it matches changes to know when to buy or sell the order
    this.name = this.model.get('symbol')
    this.listenTo(this.bus, this.name, this.checkPriceChange);

  }, // initialize
  render() {
    console.log('in the OrderView render');
    const compiledOrderTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledOrderTemplate);

    return this
  }, // render
  // TODO: Finish this function to sell or buy the stock if the price is good!
  checkPriceChange(currentQuotePrice) {
    console.log('in checkPriceChange');
    let target = Number(this.model.get('targetPrice'));
    currentQuotePrice = Number(currentQuotePrice);
    console.log(`target = ${target}`);
    console.log(`currentQuotePrice is : ${currentQuotePrice}`);
    // QUESTION: Why does this code freeze my app? Why am I always getting into buy with this?
    // I thought making target and currentQuotePrice Numbers would fix it but it didn't
    // maybe this is because I'm not destroying the Order when this happens so it just keeps firing the event?
    if (this.model.get('action') === 'Buy' && (target > currentQuotePrice) ) {
      console.log('target < currentQuotePrice');
      this.model.destroy();
      this.remove();

      this.bus.trigger(`buy${this.model.get('symbol')}`)
    }
  } // checkPriceChange
}) // OrderView

export default OrderView
