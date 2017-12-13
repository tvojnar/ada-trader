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
import TradeHistoryView from './views/trade_history_view';


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




let quoteTemplate;
let tradeTemplate;

$(document).ready(function() {
  // create a new collection from the quoteList data
  const quotes = new QuoteList(quoteData);

  // create a new simulator model
  const simulator = new Simulator({
    quotes: quotes,
  });

  // the start method updates the price of each stock every second
  simulator.start();

  // define the template that will be used in QuoteVistView and QuoteList
  quoteTemplate = _.template($('#quote-template').html());
  // make a template for the TradeHistoryView
  tradeTemplate = _.template($('#trade-template').html());

  // define our bus and extend Backbone.Event into it so that bus will have the functionality to listen to and have events called on it
  let bus = {};
  bus = _.extend(bus, Backbone.Events);


  // create a new QuoteListView
  const quoteListView = new QuoteListView({
    model: quotes,
    template: quoteTemplate,
    el: $('#quotes-container'),
    bus: bus,
  })

  // render the QuoteListView to get the quotes to appear on the page
  // each quote will imidiately attach to the DOM since the el for quoteListView already exists on the DOM
  quoteListView.render();


  // create a new TradeHistoryView
  const tradeHistoryView = new TradeHistoryView({
    template: tradeTemplate,
    el: $('#trades-container'),
    bus: bus,
  })

});
