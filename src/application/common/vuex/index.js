import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  allCountries: [],
  allProvinces: [],
  allCities: [],
  allCounties: [],
  everconfirmed: false
};

export default {
  state,
  actions,
  mutations,
  getters
};
