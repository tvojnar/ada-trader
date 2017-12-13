import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // listen for the 'boughOrSold' event to be triggered from the QuoteView buyStock and sellStock functions
    // when the 'boughOrSold' event is emmited, the addTrade function is called
    this.listenTo(this.bus, 'boughtOrSold', this.addTrade);
  }, // initialize
  addTrade(tradeData) {
      const compiledTemplate = this.template(tradeData);
      this.$('#trades').prepend(compiledTemplate);
  }, // tradeData
}) // TradeHistoryView

export default TradeHistoryView
