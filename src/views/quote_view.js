import Backbone from 'backbone'
import Quote from '../models/quote'

const QuoteView = Backbone.View.extend({
  // initialize is called when a nre instance of QuoteView is created
  // we will pass an underscore template in the params
  initialize(params) {
    this.template = params.template;
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
    this.model.buy();
  }, // buyStock
  sellStock(event) {
    // the sellStock function is called when the user clicks on the 'sell' button

    // calls the sell() function in the Quote model that will decrease the price of the stock by $1.00
    this.model.sell();
  }, // sellStock
});



export default QuoteView
