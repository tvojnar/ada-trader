import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus,

    // TODO specify what bus events to listen to!
  }, // initialize
  render() {
     // TODO: need a template to render!
  }, // render
  // TODO need to define the event handler functions for the bus events that I am listening to!
}) // TradeHistoryView

export defualt TradeHistoryView
