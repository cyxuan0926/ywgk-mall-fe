import actions from './actions';
import mutations from './mutations';

const state = {
  orderId: '',
  orderItemId: '',
  refundItem: {},
  selectRefundWay: null,
  refundOrderId: '',
  refundDetail: {},
  refundId: null
};

export default {
  state,
  actions,
  mutations
};
