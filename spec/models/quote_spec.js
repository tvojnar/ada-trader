import Quote from 'models/quote';

describe('Quote spec', () => {
  let quote;
  beforeEach(() => {
    quote = new Quote({
      symbol: 'HELLO',
      price: 100.00,
    });
    // QUESTION: why isn't startPrice defined if I create it here?
    // let startPrice = quote.get('price');
  });

  describe('Buy function', () => {
    it('increases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.buy();

      expect(quote.get('price')).toEqual(startPrice + 1.00);
    }); // increases the price

    it('returns the buying price', () => {
      const buyPrice = quote.get('price');

      expect(quote.buy()).toEqual(buyPrice);
    }) // returns the buying price
  });

  describe('Sell function', () => {
    it('decreases the price by $1.00', () => {
      const startPrice = quote.get('price');

      quote.sell();

      expect(quote.get('price')).toEqual(startPrice - 1.00);
    });

    it('returns the selling price', () => {
      const sellPrice = quote.get('price');

      expect(quote.buy()).toEqual(sellPrice);
    }) // returns the buying price
  });
});
