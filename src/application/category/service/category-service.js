import axios from 'axios';

export default {
  getList(params) {
    return axios.get(`/categories`, { params: { parentId: params } }).then(response => {
      return response.data;
    });
  }
};
