import 'foundation-sites/dist/foundation.css';
import 'css/app.css';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Simulator from 'models/simulator';
import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';
import Order from 'models/order';
import OrderList from 'collections/order_list';

import QuoteView from './views/quote_view';
import QuoteListView from './views/quote_list_view';
import TradeHistoryView from './views/trade_history_view';
import OrderListView from './views/order_list_view';




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






$(document).ready(function() {
  // create a new collection from the quoteList data
  const quotes = new QuoteList(quoteData);

  // create a new (empty) collection of OrderList that will eventually hold instances of Order when they are created using the form
  const orders = new OrderList();

  // create a new simulator model
  const simulator = new Simulator({
    quotes: quotes,
  });

  // the start method updates the price of each stock every second
  simulator.start();

  // define the template that will be used in QuoteVistView and QuoteList
  let quoteTemplate = _.template($('#quote-template').html());
  // make a template for the TradeHistoryView
  let tradeTemplate = _.template($('#trade-template').html());
  // make a template for the OrderListView and OrderView
  let orderTemplate = _.template($('#order-template').html());
  // make a template for the OrderListView that will be used to add the names of all the quotes as 'options' for the select drop down in the form
  let formOptionTemplate = _.template($('#option-template').html());

  // define our bus and extend Backbone.Event into it so that bus will have the functionality to listen to and have events called on it
  let bus = {};
  bus = _.extend(bus, Backbone.Events);


  // create a new OrderListView that will display all of the users Open Orders that are created using the form
  // this view will be rendered when an Order is added to OrderList because in the initialize method for OrderListView we listen for an 'update' event on the model (and the model is the orderList). The Orders will be added to the OrderList in the addOrder function in OrderListView when a user creates a new Order via the form
  const orderListView = new OrderListView({
    template: orderTemplate,
    optionTemplate: formOptionTemplate,
    el: $('#order-workspace'),
    bus: bus,
    model: orders,
  }) // orderListView

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


  // create a new TradeHistoryView that will display all of the users trades
  // pass it the bus so it can communicate with the other views
  const tradeHistoryView = new TradeHistoryView({
    template: tradeTemplate,
    el: $('#trades-container'),
    bus: bus,
  })

}); // .ready 
