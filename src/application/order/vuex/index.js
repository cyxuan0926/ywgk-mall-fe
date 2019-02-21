import actions from './actions';
import mutations from './mutations';

const state = {
  orderInformation: {},
  totalPrices: 0,
  orderId: '',
  aliPayInformation: '',
  weChatInformation: {},
  orders: { content: [] },
  orderDetail: { shippingAddress: {}, items: [] }
};

export default {
  state,
  actions,
  mutations
};
