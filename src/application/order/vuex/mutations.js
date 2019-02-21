import * as types from './mutation-types';

export default {
  [types.SET_ORDER](state, orderInformation) {
    state.orderInformation = orderInformation;
  },
  [types.SET_ALI_PAY](state, aliPay) {
    state.aliPayInformation = aliPay;
  },
  [types.SET_WE_CHAT_PAY](state, weChatPay) {
    state.weChatInformation = weChatPay;
  },
  [types.SET_ORDERS](state, orders) {
    state.orders = orders;
  },
  [types.SET_ORDER_DETAIL](state, orderDetail) {
    state.orderDetail = orderDetail;
  },
  [types.SET_ORDER_ID](state, orderId) {
    state.orderId = orderId;
  },
  [types.SET_TOTAL_PRICES](state, totalPrices) {
    state.totalPrices = totalPrices;
  }

};
