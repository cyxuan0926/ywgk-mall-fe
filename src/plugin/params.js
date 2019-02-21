import params from '@/utils/params';

export default {
  install: (Vue, Option) => {
    Vue.prototype.$params = params;
  }
};
