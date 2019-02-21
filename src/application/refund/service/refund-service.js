import axios from 'axios';

export default {
  application(params) {
    return axios.post(`/refund-request`, params).then(response => {
      return response.data;
    });
  },
  getRefundDetail(refundItemId) {
    return axios.get(`/refund-request/${refundItemId}`).then(response => {
      return response.data;
    });
  },
  refundStatus(orderID, itemId) {
    return axios.get(`orders/${orderID}/items/${itemId}/refund-requests`).then(response => {
      return response.data;
    });
  },
  withdraw(refundItemId) {
    return axios.post(`/refund-request/${refundItemId}/cancel`).then(response => {
      return response.data;
    });
  },
  logistics(logisticsId, logisticsParams) {
    return axios.post(`/refund-request/${logisticsId}/return-logistics`, logisticsParams).then(response => {
      return response.data;
    });
  },
  amendRefund(refundId, refundParams) {
    return axios.put(`/refund-request/${refundId}`, refundParams).then(response => {
      return response.data;
    });
  }
};
