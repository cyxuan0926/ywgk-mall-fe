import * as components from './components';

export default [
  {
    path: '/cart',
    component: components.Cart,
    name: '购物车',
    meta: { requireAuth: true }
  }
];
