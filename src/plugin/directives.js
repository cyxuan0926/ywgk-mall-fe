import * as directives from '@/directive';

export default {
  install: (Vue, Option) => {
    Vue.directive('permission', directives.permission);
  }
};
