import axios from 'axios';

export default {
  getProducts(params) {
    return axios.get(`/products`, { params: params }).then(response => {
      return response.data;
    });
  },
  getDetail(productId) {
    return axios.get(`/products/${productId}`).then(response => {
      return response.data;
    });
  },
  add(productId, quantity, productAttributes) {
    return axios.post(`/cart/items`, { 'productId': productId, 'quantity': quantity, 'productAttributes': productAttributes }).then(response => {
      return response.data;
    });
  }
};
