import * as types from './mutation-types';

export default {
  [types.SET_PRODUCTS](state, products) {
    state.products = products;
  },
  [types.SET_PRODUCT_DETAIL](state, productDetail) {
    state.productDetail = productDetail;
  },
  [types.SET_CATEGORY_ID](state, categoryId) {
    state.categoryId = categoryId;
  }
};
