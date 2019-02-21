import { routes as login } from './login';
import { routes as error } from './error';
import { routes as home } from './home';
import { routes as order } from './order';
import { routes as category } from './category';
import { routes as product } from './product';
import { routes as personalCenter } from './personal-center';
import { routes as address } from './address';
import { routes as shoppingCart } from './shopping-cart';
import { routes as refund } from './refund';
import main from './main';

export default [
  {
    path: '/',
    component: main,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      ...home,
      ...order,
      ...category,
      ...personalCenter,
      ...address,
      ...shoppingCart,
      ...refund,
      ...product
    ]
  },
  ...login,
  ...error
];
