import Cookies from 'js-cookie';
const TOKEN = 'token';

export default {
  getToken() {
    return Cookies.getJSON(TOKEN);
  },
  setToken(token) {
    Cookies.set(TOKEN, token);
  },
  removeToken() {
    Cookies.remove(TOKEN);
  }
};
