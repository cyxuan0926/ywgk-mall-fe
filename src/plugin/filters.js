import * as filters from '@/filter';

export default {
  install: (Vue, Option) => {
    Vue.filter('moment', filters.moment);
    Vue.filter('text', filters.text);
    Vue.filter('money', filters.money);
    Vue.filter('yesNo', filters.yesNo);
    Vue.filter('status', filters.status);
    Vue.filter('refundReason', filters.refundReason);
    Vue.filter('refundState', filters.refundState);
    Vue.filter('payMethod', filters.payMethod);
  }
};
