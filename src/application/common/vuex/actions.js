import _ from 'lodash';
import * as types from './mutation-types';
import { authService, regionService, fileService } from '../service';

export default {
  login({ commit }, user) {
    return authService.login(user);
  },
  logout({ commit }) {
    authService.logout();
  },
  loginByRefresh({ commit }) {
    return authService.loginRefresh();
  },
  getAllCountries({ commit }) {
    return regionService.getAllCountries().then(countries => {
      commit(types.SET_ALL_COUNTRIES, countries);
    });
  },
  getProvincesBy({ commit, state }, countryCode) {
    return regionService.getProvincesBy(countryCode).then(provinces => {
      let allProvinces = _.cloneDeep(state.allProvinces);
      allProvinces = _.unionWith(allProvinces, provinces, _.isEqual);
      commit(types.SET_ALL_PROVINCES, allProvinces);
    });
  },
  getCitiesBy({ commit, state }, provinceCode) {
    return regionService.getCitiesBy(provinceCode).then(cities => {
      let allCities = _.cloneDeep(state.allCities);
      allCities = _.unionWith(allCities, cities, _.isEqual);
      commit(types.SET_ALL_CITIES, allCities);
    });
  },
  getCountiesBy({ commit, state }, cityCode) {
    return regionService.getCountiesBy(cityCode).then(counties => {
      let allCounties = _.cloneDeep(state.allCounties);
      allCounties = _.unionWith(allCounties, counties, _.isEqual);
      commit(types.SET_ALL_COUNTIES, allCounties);
    });
  },
  getFile({ commit }, id) {
    return fileService.getFile(id);
  },
  deleteFile({ commit }, id) {
    return fileService.delete(id);
  }
};
