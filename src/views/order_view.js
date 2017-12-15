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
  events: {
    'click button.btn-cancel': 'cancelOrder',
  }, // events
  cancelOrder(event) {
    // when the cancel button is clicked on an Order destory the model of that Order and also remove that orderView from the DOM so that nothing is listening for events from that Order anymore
    this.model.destroy();
    this.remove();
  }, // cancelOrder
  // This function will sell or buy the stock referenced in the Order if the price is good!
  checkPriceChange(currentQuotePrice) {
    console.log('in checkPriceChange');

    // pull out the targetPrice for the Order and make it a number
    let target = Number(this.model.get('targetPrice'));
    // make the currentQuotePrice (which was passed via the bus from the QuoteView render function) into a number
    currentQuotePrice = Number(currentQuotePrice);

    console.log(`target = ${target}`);
    console.log(`currentQuotePrice is : ${currentQuotePrice}`);

    // check if it is time to buy the quote the order is for
    // only proccess the order and buy the quote if the price of the quote is low enough
    if (this.model.get('action') === 'Buy' && (target >= currentQuotePrice) ) {
      console.log('target < currentQuotePrice -- time to buy! ');

      // If it is time to buy the order you need to destroy the model and remove it from the DOM so that nothing is listening for ecents from it anymore and it will only be bought once
      this.model.destroy();
      this.remove();

      // trigger the quote the order is associated with to be bought via the bus. The event will trigger the buyStock() function in QuoteView that then triggers the buy() method in the Quote model
      this.bus.trigger(`buy${this.model.get('symbol')}`)
    } // if for buy
    // only proccess the order and sell the Quote if the price of the Quote is low enough
    else if (this.model.get('action') === 'Sell' && (target <= currentQuotePrice) ) {
      console.log('target > currentQuotePrice -- time to sell!');

      // If it is time to sell the order you need to destroy the model and remove it from the DOM so that nothing is listening for ecents from it anymore and it will only be bought once
      this.model.destroy();
      this.remove();

      // trigger the quote the order is associated with to be sold via the bus. The event will trigger the sellStock() function in QuoteView that then triggers the sell() method in the Quote model
      this.bus.trigger(`sell${this.model.get('symbol')}`)

    } // else for sell
  } // checkPriceChange
}) // OrderView

export default OrderView
