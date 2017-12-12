import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote'
import QuoteView from './views/quote_view'


const quoteData = [
  {
    symbol: 'HUMOR',
    price: 88.50,
  },
  {
    symbol: 'CLOTH',
    price: 81.70,
  },
  {
    symbol: 'HABIT',
    price: 98.00,
  },
  {
    symbol: 'SUPER',
    price: 83.10,
  },
];

// TODO: move this functionality into the QuoteListView! 
const render = function(quotes) {
    console.log('in render');
    const renderQuotes = function(quotes) {
    const $quotesUl = $('#quotes');
    $quotesUl.empty();
    quotes.forEach((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: _.template($('#quote-template').html()),
        tagName: 'li',
        className: 'quote',
      }) // quoteView
      $quotesUl.append(quoteView.render().$el)
    }) // forEach
  }
  renderQuotes(quotes);
}




$(document).ready(function() {
  const quotes = new QuoteList(quoteData);
  const simulator = new Simulator({
    quotes: quotes,
  });

  simulator.start();

  render(quotes);
});
