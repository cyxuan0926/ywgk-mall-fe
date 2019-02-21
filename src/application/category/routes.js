import * as components from './components';

export default [
  {
    path: '/category/:id',
    component: components.Category,
    name: '商品分类',
    meta: { requireAuth: true }
  }
];
