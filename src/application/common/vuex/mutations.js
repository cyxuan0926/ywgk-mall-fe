import * as types from './mutation-types';

export default {
  [types.SET_ALL_COUNTRIES](state, countries) {
    state.allCountries = countries;
  },
  [types.SET_ALL_PROVINCES](state, allProvinces) {
    state.allProvinces = allProvinces;
  },
  [types.SET_ALL_CITIES](state, allCities) {
    state.allCities = allCities;
  },
  [types.SET_ALL_COUNTIES](state, allCounties) {
    state.allCounties = allCounties;
  },
  [types.SET_CONFIRM](state, everconfirmed) {
    state.everconfirmed = everconfirmed;
    console.log('是否会回调', everconfirmed);
  }
};
