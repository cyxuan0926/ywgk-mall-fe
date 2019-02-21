import axios from 'axios';
import qs from 'qs';
import tokenStorage from '@/utils/auth/token-storage';

function getParams(user) {
  var params = qs.stringify({
    grant_type: 'password',
    username: user.username,
    password: user.password
  });
  return params;
}
function getRefreshTokenParams(refreshToken) {
  var params = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: `${refreshToken.refresh_token}`
  });
  return params;
}

export default {
  login(user) {
    const params = getParams(user);
    return axios
      .post(`${window.AUTH_BASE_URL}oauth/token`, params, {
        auth: {
          username: 'consumer.m.app',
          password: '1688c4f69fc6404285aadbc996f5e429'
        }
      })
      .then(response => {
        tokenStorage.setToken(response.data);
      });
  },
  loginRefresh() {
    const params = getRefreshTokenParams(tokenStorage.getToken());
    return axios
      .post(`${window.AUTH_BASE_URL}oauth/token`, params, {
        auth: {
          username: 'consumer.m.app',
          password: '1688c4f69fc6404285aadbc996f5e429'
        }
      })
      .then(response => {
        tokenStorage.setToken(response.data);
      });
  },
  logout() {
    tokenStorage.removeToken();
  }
};
