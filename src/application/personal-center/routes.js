import * as components from './components';

export default [
  {
    path: '/personal/center',
    component: components.PersonalCenter,
    name: '个人中心',
    meta: { requireAuth: true }
  }
];
