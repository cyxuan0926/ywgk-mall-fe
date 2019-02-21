import * as types from './mutation-types';
import productService from '../service/product-service';

export default {
  getProducts({ commit, state }, params) {
    return productService.getProducts(params).then(products => {
      commit(types.SET_PRODUCTS, products);
    });
  },
  getProductDetail({ commit, state }, productId) {
    return productService.getDetail(productId).then(product => {
      commit(types.SET_PRODUCT_DETAIL, product);
    });
  },
  addCart({ commit, state }, { productId, quantity, productAttributes }) {
    return productService.add(productId, quantity, productAttributes);
  }
};
