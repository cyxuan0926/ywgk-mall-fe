import tokenStorage from './token-storage';
import jwtDecode from 'jwt-decode';

function isAuthenticated() {
  const token = tokenStorage.getToken();
  if (token) {
    return true;
  }
  return false;
}
function hasPermission(permission) {
  const token = tokenStorage.getToken();
  if (!token) {
    return false;
  }
  const permissions = jwtDecode(token.access_token).authorities;
  return permissions.some(p => p === permission);
}
export default {
  isAuthenticated,
  hasPermission
};
