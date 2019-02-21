import * as types from './mutation-types';
import refundService from '../service/refund-service';

export default {
  getRefundStatus({ commit, state }, { orderId, itemId }) {
    return refundService.refundStatus(orderId, itemId).then(refundStateDetail => {
      commit(types.SET_REFUND_STATE, refundStateDetail);
    });
  },
  refundRequest({ commit, state }, params) {
    return refundService.application(params).then(refund => {
      commit(types.SET_REFUND_ID, refund);
    });
  },
  refundDetail({ commit, state }, refundItemId) {
    return refundService.getRefundDetail(refundItemId).then(refundDetail => {
      commit(types.SET_REFUND_DETAIL, refundDetail);
    });
  },
  withdrawRefund({ commit, state }, refundItemId) {
    return refundService.withdraw(refundItemId);
  },
  fillLogistics({ commit, state }, { logisticsId, logisticsParams }) {
    return refundService.logistics(logisticsId, logisticsParams);
  },
  amendRefundApplication({ commit, state }, {refundId, refundParams}) {
    return refundService.amendRefund(refundId, refundParams);
  }
};
