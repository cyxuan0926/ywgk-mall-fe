import * as types from './mutation-types';
import orderService from '../service/order-service';

export default {
  addOrder({ commit, state }, order) {
    return orderService.add(order).then(orderInformation => {
      commit(types.SET_ORDER, orderInformation);
    });
  },
  getOrderAll({ commit, state }, pagination) {
    return orderService.getOrders(pagination).then(orders => {
      commit(types.SET_ORDERS, orders);
    });
  },
  getOrderDetail({ commit, state }, orderId) {
    return orderService.getOrderDetail(orderId).then(orderDetail => {
      commit(types.SET_ORDER_DETAIL, orderDetail);
    });
  },
  aliPayWay({ commit, state }, orderID) {
    return orderService.aliWay(orderID).then(aliPay => {
      commit(types.SET_ALI_PAY, aliPay);
    });
  },
  weChatPayWay({ commit, state }, orderID) {
    return orderService.weChatWay(orderID).then(weChatPay => {
      commit(types.SET_WE_CHAT_PAY, weChatPay);
    });
  },
  cancelOrder({ commit, state }, orderID) {
    return orderService.cancel(orderID);
  },
  affirmOrder({ commit, state }, orderID) {
    return orderService.affirm(orderID);
  },
  deleteOrder({ commit, state }, orderID) {
    return orderService.delete(orderID);
  },
  againByOrder({ commit, state }, orderID) {
    return orderService.again(orderID);
  }
};
