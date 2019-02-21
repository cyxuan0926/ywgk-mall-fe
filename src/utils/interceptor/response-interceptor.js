
export default {
  config(axios, store, router) {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              store.dispatch('loginByRefresh').catch(() => {
                store.dispatch('logout');
                if (window.JSInterface) {
                  window.JSInterface.tokenTimeLimit();
                } else {
                  router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath }
                  });
                }
              });
              break;
            case 403:
              router.replace({ path: '/forbidden' });
              break;
            case 500:
              router.replace({ path: '/error' });
              break;
          }
        } else {
          router.replace({ path: '/error' });
        }
        return Promise.reject(error);
      }
    );
  }
};
