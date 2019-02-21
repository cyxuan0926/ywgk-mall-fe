import axios from 'axios';

export default {
  get() {
    return axios.get(`/cart`).then(response => {
      return response.data;
    });
  },
  getNumber() {
    return axios.get(`/cart/items/count`).then(response => {
      return response.data;
    });
  },
  update(cartItemId, quantity) {
    return axios.put(`/cart/items/${cartItemId}`, { 'quantity': quantity });
  },
  delete(cartItemIds) {
    return axios.delete('/cart/items', { params: { ids: cartItemIds } });
  },
  clear() {
    return axios.delete('/cart');
  }
};
