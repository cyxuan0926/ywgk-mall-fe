import tokenStorage from '../auth/token-storage';

export default {
  config(axios) {
    axios.interceptors.request.use(
      config => {
        config.baseURL = `${window.TRADE_BASE_URL}`;
        config.withCredentials = true;
        const token = tokenStorage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token.access_token}`;
        }
        return Promise.resolve(config);
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
};
