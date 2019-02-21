import Vue from 'vue';

import 'normalize.css/normalize.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import './assets/styles/index.scss';

import app from './app';
import router from './router';
import store from './store/';
import axios from 'axios';

import directives from '@/plugin/directives';
import filters from '@/plugin/filters';
import validators from '@/plugin/validators';
import error from '@/plugin/error';
import permission from '@/plugin/permission';
import params from '@/plugin/params';
import components from '@/components';
import componentInstance from '@/components/component-instance';
import requestInterceptor from '@/utils/interceptor/request-interceptor';
import responseInterceptor from '@/utils/interceptor/response-interceptor';
import 'exif-js';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.prototype.$chip = componentInstance.Chip.install;
Vue.use(directives);
Vue.use(filters);
Vue.use(validators);
Vue.use(error);
Vue.use(permission);
Vue.use(params);
Vue.use(components);
Vue.use(componentInstance);

requestInterceptor.config(axios);
responseInterceptor.config(axios, store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: { app }
});
