import axios from 'axios';

export default {
  getFile(id) {
    const params = { attachment: false };
    const responseType = 'blob';
    return axios.get(`${window.AUTH_BASE_URL}files/${id}`, { params: params, responseType: responseType });
  },
  delete(id) {
    return axios.delete(`${window.AUTH_BASE_URL}files/${id}`);
  }
};
