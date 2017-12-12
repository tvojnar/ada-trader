import Backbone from 'backbone';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    // save the template as an instance variable
    this.template = params.template;
    // re-render the collection when a model is updated
    this.listenTo(this.model, 'update', this.render)
  }, // initialize
  render() {
    console.log('in QuoteListView render!');
    // empty out the ul
    this.$('#quotes').empty();

    // loop through each model in the collection and create a QuoteView for it
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      }) // quoteView
      // render each quoteView and append the $el for each quoteView to the #quotes ul
      this.$('#quotes').append(quoteView.render().$el)
    }) // .each

    return this
  }, // render
}) // QuoteListView

export default QuoteListView
