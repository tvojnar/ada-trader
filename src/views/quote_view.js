import Backbone from 'backbone'
import Quote from '../models/quote'

const QuoteView = Backbone.View.extend({
  // initialize is called when a nre instance of QuoteView is created
  // we will pass an underscore template in the params
  initialize(params) {
    this.template = params.template;
  }, // initialize
  // in render we are compiling a template and then we are setting the inside of $el to be the html from compiledTemplate
  // $el is the jQuery selection of the element that encompasses our view
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    // return this by convention so that methods can be chained off of a render call in app.js
    return this
  }, // render
});

export default QuoteView
