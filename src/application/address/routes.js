import * as components from './components';

export default [
  {
    path: '/address/add',
    component: components.AddressAdd,
    name: '新增地址',
    meta: { requireAuth: true }
  },
  {
    path: '/address/list',
    component: components.AddressList,
    name: '选择收货地址',
    meta: { requireAuth: true }
  },
  {
    path: '/address/management',
    component: components.AddressManagement,
    name: '管理收货地址',
    meta: { requireAuth: true }
  },
  {
    path: '/address/edit/:id',
    component: components.AddressEdit,
    name: '编辑收货地址',
    meta: { requireAuth: true }
  }
];
