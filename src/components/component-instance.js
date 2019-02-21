import Vue from 'vue';
import myChip from './chip.vue';

const Chip = Vue.extend(myChip);

Chip.install = function(options, type) {
  let instance = new Chip({
    data: options
  }).$mount();
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.showModel();
  });
};
export default {
  Chip
};
