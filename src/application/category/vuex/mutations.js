import * as types from './mutation-types';

export default {
  [types.SET_CATEGORIES](state, categories) {
    state.categories = categories;
  }
};
