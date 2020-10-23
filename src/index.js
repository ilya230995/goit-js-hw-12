import './styles.css';
import fetchCountries from './js/fetchCountries.js';
import articlesListTpl from './templates/country-list.hbs';
import articlesCardTpl from './templates/coutry-card.hbs';
import { debounce } from 'lodash';
import {
  alert,
  notice,
  info,
  success,
  error,
  defaultModules,
} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const inputRef = document.querySelector('.js-search-form');
const countryListRef = document.querySelector('.coutry-list');

inputRef.addEventListener('input', debounce(countriesHandler, 800));

function countriesHandler(e) {
  e.preventDefault();
  const searchValue = e.target.value;

  countryListRef.innerHTML = '';

  if (searchValue.length >= 1) {
    fetchCountries.fetchCountries(searchValue).then(data => {
      if (data.length === 1) {
        console.log(data[0]);

        const marcupCard = articlesCardTpl(data[0]);

        countryListRef.insertAdjacentHTML('beforeend', marcupCard);
      } else if (data.length > 1 && data.length <= 10) {
        const marcup = articlesListTpl(data);

        countryListRef.insertAdjacentHTML('beforeend', marcup);
      } else {
        const myError = error({
          text: 'Too many matches found. Please enter a more specific query! ',
          type: 'info',
        });
        return;
      }
    });
  }
}
