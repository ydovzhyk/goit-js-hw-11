import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/coutry-api';
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const countryFormEl = document.querySelector('#search-box');
const countryCardWrapperEl = document.querySelector('.country-info');
const countrysWrapperEl = document.querySelector('.country-list');

const onSearchFormInput = event => {
      countrysWrapperEl.innerHTML = '';
      countryCardWrapperEl.innerHTML = '';
    
    const searchQuery = countryFormEl.value.trim();

    fetchCountries(searchQuery)
    .then(data => {

      if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      }
      if (data.length < 10 && data.length > 1) {

        for (let i = 0; i <= data.length - 1; i++) {
          countrysWrapperEl.insertAdjacentHTML('beforeend', countryListTemplate(data[i]));
        }
      }

      if (data.length === 1) {
        const language = Object.values(data[0].languages);
        countryCardWrapperEl.innerHTML = countryCardTemplate(data[0]);
        const languageText = document.querySelector('.languages');
        languageText.innerHTML = "languages: " + language;

      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
      console.dir(err);
    });
};


countryFormEl.addEventListener('input', debounce(onSearchFormInput, DEBOUNCE_DELAY));