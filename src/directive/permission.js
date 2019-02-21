import tokenChecker from '../utils/auth/token-checker';

const permission = {
  inserted: function(el, binding, vnode) {
    const hasPermission = tokenChecker.hasPermission(binding.value);
    if (!hasPermission) {
      el.parentNode.removeChild(el);
    }
  }
};

export default permission;
