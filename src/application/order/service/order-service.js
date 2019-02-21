import axios from 'axios';

export default {
  add(orders) {
    return axios.post(`/orders`, orders).then(response => {
      return response.data;
    });
  },
  getOrders(pagination) {
    return axios.get('/orders', { params: pagination }).then(response => {
      return response.data;
    });
  },
  getOrderDetail(orderID) {
    return axios.get(`/orders/${orderID}`).then(response => {
      return response.data;
    });
  },
  aliWay(orderID) {
    return axios.get(`/orders/${orderID}/alipay`).then(response => {
      return response.data;
    });
  },
  weChatWay(orderID) {
    return axios.get(`/orders/${orderID}/we-chat-pay`).then(response => {
      return response.data;
    });
  },
  cancel(orderID) {
    return axios.post(`/orders/${orderID}/cancelled`).then(response => {
      return response.data;
    });
  },
  affirm(orderID) {
    return axios.post(`/orders/${orderID}/complete `).then(response => {
      return response.data;
    });
  },
  delete(orderID) {
    return axios.delete(`/orders/${orderID}`).then(response => {
      return response.data;
    });
  },
  again(orderID) {
    return axios.post(`/orders/${orderID}/cart/items`).then(response => {
      return response.data;
    });
  }
};
