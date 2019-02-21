import axios from 'axios';
import countryStorage from './country-storage';
import provinceStorage from './province-storage';
import cityStorage from './city-storage';
import countyStorage from './county-storage';

export default {
  getAllCountries() {
    let allCountries = countryStorage.getAllCountries();
    if (allCountries) {
      return Promise.resolve(allCountries);
    }
    return axios.get(`${window.AUTH_BASE_URL}countries`).then(response => {
      allCountries = response.data;
      countryStorage.setAllCountries(allCountries);
      return allCountries;
    });
  },
  getProvincesBy(countryCode) {
    let provinces = provinceStorage.getProvinces(countryCode);
    if (provinces) {
      return Promise.resolve(provinces);
    }
    const params = { countryCode: countryCode };
    return axios.get(`${window.AUTH_BASE_URL}provinces`, { params: params }).then(response => {
      provinces = response.data;
      provinceStorage.setProvinces(countryCode, provinces);
      return provinces;
    });
  },
  getCitiesBy(provinceCode) {
    let cities = cityStorage.getCities(provinceCode);
    if (cities) {
      return Promise.resolve(cities);
    }
    const params = { provinceCode: provinceCode };
    return axios.get(`${window.AUTH_BASE_URL}cities`, { params: params }).then(response => {
      cities = response.data;
      cityStorage.setCities(params.provinceCode, cities);
      return cities;
    });
  },
  getCountiesBy(cityCode) {
    let counties = countyStorage.getCounties(cityCode);
    if (counties) {
      return Promise.resolve(counties);
    }
    const params = { cityCode: cityCode };
    return axios.get(`${window.AUTH_BASE_URL}counties`, { params: params }).then(response => {
      counties = response.data;
      countyStorage.setCounties(params.cityCode, counties);
      return counties;
    });
  }
};
