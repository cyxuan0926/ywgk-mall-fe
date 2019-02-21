function show(error, message) {
  const response = error.response;
  if (response && response.status === 400) {
    if (response.data && response.data.code) {
      this.$chip({
        chipOptions: `${response.data.message}`
      });
    } else {
      this.$chip({
        chipOptions: `${message}`
      });
    }
  }
}

export default {
  install: (Vue, Option) => {
    Vue.prototype.$error = {
      show,
      $chip: Vue.prototype.$chip
    };
  }
};
