import * as components from './components';

export default [
  {
    path: '/home',
    component: components.TheHome,
    name: '主页',
    meta: { requireAuth: true }
  }

];
