import * as components from './components';

export default [
  {
    path: '/refund',
    component: components.OrderRefund,
    name: '新增退款',
    meta: { requireAuth: true }
  },
  {
    path: '/refund/edit/:id',
    component: components.OrderRefundEdit,
    name: '修改退款',
    meta: { requireAuth: true }
  },
  {
    path: '/select/service',
    component: components.OrderSelectService,
    name: '选择退款类型',
    meta: { requireAuth: true }
  },
  {
    path: '/refund/detail',
    component: components.OrderRefundDetail,
    name: '退款详情',
    meta: { requireAuth: true }
  },
  {
    path: '/logistics/:id',
    component: components.OrderLogistics,
    name: '填写退货物流',
    meta: { requireAuth: true }
  }
];
