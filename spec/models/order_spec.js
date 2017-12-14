import Order from 'models/order';

describe('Order spec', () => {
  describe('validate', () => {
    it('will create a valid instance of Order', () => {
      const order = new Order({
        symbol: 'HI',
        targetPrice: 100,
        action: 'Buy',
      }) // order
      let result = order.isValid();
      expect(result).toBeTruthy();
    }) // valid instance

    it('will catch invalid instances of Order', () => {
      const order2 = new Order({
        symbol: '',
        targetPrice: 100,
        action: 'Buy',
      }) // order

      const order3 =
      new Order({
        symbol: '',
        action: 'Buy',
      }) // order

      const order4 = new Order({
        symbol: '',
        targetPrice: 100,
      }) // order

      const allOrders = [order2, order3, order4];

      for (let i = 0; i < allOrders.length; i++) {
        expect(allOrders[i].isValid()).not.toBeTruthy();
      }

    }) // invalid instances
  }) // validate
}) // 'Order spec'
