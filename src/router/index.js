import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '@/application';
import tokenChecker from '@/utils/auth/token-checker';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {
    next();
    return;
  }
  if (!tokenChecker.isAuthenticated()) {
    if (window.JSInterface) {
      window.JSInterface.tokenTimeLimit();
    } else {
      const login = { path: '/login', query: { redirect: to.fullPath } };
      next(login);
    }

    return;
  }
  const permission = to.meta.permission;
  if (!to.meta.permission) {
    next();
    return;
  }
  let hasPermission = tokenChecker.hasPermission(permission);
  if (!hasPermission) {
    const forbidden = { path: '/forbidden' };
    next(forbidden);
    return;
  }
  next();
});

export default router;
