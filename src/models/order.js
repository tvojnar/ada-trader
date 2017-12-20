import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  validate(attributes) {
    const errors = {};

    if (!attributes.targetPrice) {
      errors.targetPrice = ['cannot be blank'];
    }

    if (!attributes.symbol) {
      errors.symbol = ['cannot be blank'];
    }

    if (!attributes.action) {
      errors.action = ['cannot be blank'];
    }

    if (Object.keys(errors).length < 1) {
      return false
    }

    return errors;
  }, // validate
}) // Order

export default Order
