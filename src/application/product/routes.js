import * as components from './components';

export default [
  {
    path: '/product/list/:id',
    component: components.ProductList,
    name: '商品列表',
    meta: { requireAuth: true }
  },
  {
    path: '/product/detail/:id',
    component: components.ProductDetail,
    name: '商品详情',
    meta: { requireAuth: true }
  }
];
