const ALL_COUNTRIES = 'allCountries';

export default {
  getAllCountries() {
    const allCountries = JSON.parse(localStorage.getItem(ALL_COUNTRIES));
    const version = window.VERSION;
    if (allCountries && allCountries.version === version) {
      return allCountries.value;
    }
  },
  setAllCountries(allCountries) {
    const version = window.VERSION;
    localStorage.setItem(ALL_COUNTRIES, JSON.stringify({ version, value: allCountries }));
  },
  removeAllCountries() {
    localStorage.removeItem(ALL_COUNTRIES);
  }
};
