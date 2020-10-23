export default {
  fetchCountries(inputValue) {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${inputValue}`,
    ).then(res => res.json());
  },
};
