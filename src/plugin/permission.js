import tokenChecker from '@/utils/auth/token-checker';

export default {
  install: (Vue, Option) => {
    Vue.prototype.$permission = {
      hasPermission: tokenChecker.hasPermission
    };
  }
};
