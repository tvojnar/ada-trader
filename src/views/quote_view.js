import Backbone from 'backbone'
import Quote from '../models/quote'

const QuoteView = Backbone.View.extend({
  // initialize is called when a new instance of QuoteView is created
  // we will pass an underscore template in the params
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    // this.render will be called when an attribute of a model is changed (aka when the Quote buy and sell methods run)
    this.listenTo(this.model, 'change', this.render);
  }, // initialize
  // in render we are compiling a template and then we are setting the inside of $el to be the html from compiledTemplate
  // $el is the jQuery selection of the element that encompasses our view
  render() {
    console.log('in the QuoteView render');
    const compiledTemplate =
    this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  }, // render
  events: {
    'click button.btn-buy': 'buyStock',
    'click button.btn-sell': 'sellStock',
  }, // events
  buyStock(event) {
    // buyStock function runs when the 'buy' button is clicked
    // call the buy() function in the Quote model that will increase the price of the stock by $1.00

  // NOTE: have the buy method return the price the stock was bought at. then I can pass the stock name, the price, and that it was as the argument to the method in TradeHistoryView that will respond to the event I will trigger here

  // NOTE: I may want to move the functionality of generating the tradeData object to the model and then I can pass this method in a more DRY way since I might have to repeat this code in the OrderView to
    let buyPrice = this.model.buy();
    let stockName = this.model.get('symbol');

    let tradeData = {
      price: buyPrice,
      name: stockName,
      action: 'bought',
    }

    this.bus.trigger('boughtOrSold', tradeData);
  }, // buyStock
  sellStock(event) {
    // the sellStock function is called when the user clicks on the 'sell' button
    // calls the sell() function in the Quote model that will decrease the price of the stock by $1.00
    let sellPrice = this.model.sell();
    let stockName = this.model.get('symbol');


    let tradeData = {
      price: sellPrice,
      name: stockName,
      action: 'sold',
    }

    this.bus.trigger('boughtOrSold', tradeData);

  }, // sellStock
});



export default QuoteView
