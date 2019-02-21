import * as components from './components';

export default [
  {
    path: '/order',
    component: components.Order,
    name: '提交订单',
    meta: { requireAuth: true }
  },
  {
    path: '/my/order',
    component: components.MyOrder,
    name: '我的订单',
    meta: { requireAuth: true }
  },
  {
    path: '/order/payment/success',
    component: components.OrderPaymentSuccess,
    name: '订单支付成功',
    meta: { requireAuth: true }
  },
  {
    path: '/order/detail/:id',
    component: components.OrderDetail,
    name: '订单详情',
    meta: { requireAuth: true }
  }
];
