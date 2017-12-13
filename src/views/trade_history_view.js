import Backbone from 'backbone';

const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    // listen for the 'boughOrSold' event to be triggered from the QupteView buyStock and sellStock functions
    this.listenTo(this.bus, 'boughtOrSold', this.addTrade);
  }, // initialize
  render() {
     // TODO: need a template to render!
  }, // render
  addTrade(tradeData) {
      const compiledTemplate = this.template(tradeData);
      this.$('#trades').prepend(compiledTemplate);
  }, // tradeData
}) // TradeHistoryView

export default TradeHistoryView
