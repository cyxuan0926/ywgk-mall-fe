import * as components from './components';

export default [
  {
    path: '',
    component: components.TheError,
    children: [
      {
        path: '/forbidden',
        component: components.TheForbiddenError,
        name: '403'
      },
      {
        path: '/not-found',
        component: components.TheNotFoundError,
        name: '404'
      },
      {
        path: '/error',
        component: components.TheServerError,
        name: '500'
      },
      {
        path: '*',
        component: components.TheNotFoundError
      }
    ]
  }
];
