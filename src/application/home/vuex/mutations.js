import * as types from './mutation-types';

export default {

  [types.SET_HOME_SEARCH](state, searchValue) {
    state.searchValue = searchValue;
  }

};
