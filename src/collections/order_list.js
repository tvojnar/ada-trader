import Backbone from 'backbone';
import Order from '../models/order';

const OrderList = Backbone.Collection.extend({
  model: Order
}) // OrderList

export default OrderList
