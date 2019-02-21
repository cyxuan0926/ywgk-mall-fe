export default {
  filterCountry: state => countryCode => {
    return state.allCountries.find(country => country.code === countryCode);
  },
  filterProvince: state => provinceCode => {
    return state.allProvinces.find(province => province.code === provinceCode);
  },
  filterProvinces: state => countryCode => {
    return state.allProvinces.filter(province => province.countryCode === countryCode);
  },
  filterCity: state => cityCode => {
    return state.allCities.find(city => city.code === cityCode);
  },
  filterCities: state => provinceCode => {
    return state.allCities.filter(city => city.provinceCode === provinceCode);
  },
  filterCounty: state => countyCode => {
    return state.allCounties.find(county => county.code === countyCode);
  },
  filterCounties: state => cityCode => {
    return state.allCounties.filter(county => county.cityCode === cityCode);
  }
};
