import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  // Implement this function to increase the price by $1.00
  // this function increases the price of a stock by $1.00 when the 'buy' button for the stock is clicked
  // this method is called from in the QuoteView when the buy button is clicked
  buy() {
    // access the current price of the stock
    const currentPrice = this.get('price');
    console.log(`in buy and current price is: ${currentPrice}`);

    // add $1.00 to the current price
    this.set('price', currentPrice + 1)
    console.log(`in buy and post buy price is: ${this.get('price')}`);

    // return the currentPrice so I can send it to the TradeHistoryView from the QuoteView on the bus
    return currentPrice
  },

  // Implement this function to decrease the price by $1.00
  // this function decreases the price of a stock by $1.00 when the 'sell' button for the stock is clicked
  // this function is called from in the QuoteView when the sell button is clicked
  sell() {
    // access the current price of the stock
    const sellPrice = this.get('price');
    console.log(`in sell and sell price is: ${sellPrice}`);

    // subtract $1.00 to the sellPrice
    this.set('price', sellPrice - 1)
    console.log(`in sell and the price after selling is: ${this.get('price')}`);

    // return the sellPrice so I can send it to the TradeHistoryView from the QuoteView on the bus
    return sellPrice;
  },
});

export default Quote;
