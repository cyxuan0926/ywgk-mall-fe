import * as types from './mutation-types';

export default {
  [types.SET_ORDER_ITEM_ID](state, orderItemId) {
    state.orderItemId = orderItemId;
  },
  [types.SET_REFUND](state, refundItem) {
    state.refundItem = refundItem;
  },
  [types.SET_SELECT_REFUND_WAY](state, selectRefundWay) {
    state.selectRefundWay = selectRefundWay;
  },
  [types.SET_REFUND_ORDER_ID](state, reundOrderId) {
    state.refundOrderId = reundOrderId;
  },
  [types.SET_REFUND_DETAIL](state, refundDetail) {
    state.refundDetail = refundDetail;
  },
  [types.SET_REFUND_ID](state, refundId) {
    state.refundId = refundId.id;
  },
  [types.SET_CLEAR_REFUND_ID](state, clearRefundId) {
    state.refundId = clearRefundId;
  },
  [types.SET_REFUND_AMEND](state, refundItem) {
    state.refundItem = refundItem;
  },
  [types.SET_REFUND_STATE](state, refundStateDetail) {
    state.refundDetail = refundStateDetail;
  }
};
