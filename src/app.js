import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';


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
// const render = function(quotes) {
//     console.log('in render');
//     const renderQuotes = function(quotes) {
//     const $quotesUl = $('#quotes');
//     $quotesUl.empty();
//     quotes.forEach((quote) => {
//       const quoteView = new QuoteView({
//         model: quote,
//         template: _.template($('#quote-template').html()),
//         tagName: 'li',
//         className: 'quote',
//       }) // quoteView
//       $quotesUl.append(quoteView.render().$el)
//     }) // forEach
//   }
//   renderQuotes(quotes);
// }


let quoteTemplate;

$(document).ready(function() {
  // create a new collection from the quoteList data
  const quotes = new QuoteList(quoteData);

  // create a new simulator model
  const simulator = new Simulator({
    quotes: quotes,
  });

  // the start method updates the price of each stock every second
  simulator.start();

  quoteTemplate = _.template($('#quote-template').html());

  // TODO: move the render functionality into the QuoteListView!
  // render(quotes);

  // create a new QuoteListView
  const quoteListView = new QuoteListView({
    model: quotes,
    template: quoteTemplate,
    el: $('#quotes-container'),
  })

  // render the QuoteListView to get the quotes to appear on the page
  // each quote will imidiately attach to the DOM since the el for quoteListView already exists on the DOM
  quoteListView.render();

});
