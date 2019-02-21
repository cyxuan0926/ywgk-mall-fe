import axios from 'axios';

export default {
  getAddress(addressId) {
    return axios.get(`/shipping-addresses/${addressId}`).then(response => {
      return response.data;
    });
  },
  getDefault() {
    return axios.get(`/shipping-addresses/default `).then(response => {
      return response.data;
    });
  },
  getAddresses() {
    return axios.get(`/shipping-addresses`).then(response => {
      return response.data;
    });
  },
  add(address) {
    return axios.post('/shipping-addresses', address).then(response => {
      return response.data;
    });
  },
  update(address) {
    return axios.put(`/shipping-addresses/${address.id}`, address);
  },
  delete(id) {
    return axios.delete(`/shipping-addresses/${id}`);
  }
};
