import Backbone from 'backbone';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    // save the template and bus as instance variables
    this.template = params.template;
    this.bus = params.bus;
    // re-render the collection when a model is updated
    this.listenTo(this.model, 'update', this.render)
  }, // initialize
  render() {
    console.log('in QuoteListView render!');
    // empty out the ul
    this.$('#quotes').empty();

    // loop through each model in the collection and create a QuoteView for it
    // pass 'bus' to each of the QuoteViews
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      }) // quoteView
      // render each quoteView and append the $el for each quoteView to the #quotes ul
      this.$('#quotes').append(quoteView.render().$el)
    }) // .each

    // generate all the names/symbols of the Quptes to pass via the bus to the OrderListView so it can dynamically generate the options for the select dropdown menu with these names
    // NOTE: could combine this into the .each loop above... but more readable if I leave it down here ....
    const quoteNames = []
    this.model.each((quote) => {
      let name = quote.get('symbol');
      quoteNames.push({symbol: name});
    }) // .each

    console.log('right before the trigger for: quote_names_for_form');
    // pass the quoteNames to the OrderListView via the bus
    this.bus.trigger('quote_names_for_form', quoteNames);

    return this
  }, // render
}) // QuoteListView

export default QuoteListView
