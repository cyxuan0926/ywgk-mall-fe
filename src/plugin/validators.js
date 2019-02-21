import * as validators from '@/validator';

export default {
  install: (Vue, Option) => {
    Vue.prototype.$validators = {
      phoneNumber: validators.phoneNumber
    };
  }
};
