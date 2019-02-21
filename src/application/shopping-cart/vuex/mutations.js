import * as types from './mutation-types';

export default {
  [types.SET_CART](state, cartItems) {
    state.cartItems = cartItems;
  },
  [types.SET_SELECTITEMS](state, selectItems) {
    state.selectItems = selectItems;
  },
  [types.SET_COUNT](state, count) {
    state.count = count;
  }
};
