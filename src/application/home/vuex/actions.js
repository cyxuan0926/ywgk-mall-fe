import * as types from './mutation-types';

export default {
  setValues({ commit, state }, values) {
    return commit(types.SET_HOME_SEARCH, values);
  }
};
