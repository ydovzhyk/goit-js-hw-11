import { UnsplashAPI } from './unsplash-api';
import createGalleryCards from '../templates/gallery-card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const userInput = document.querySelector('.js-search-input');
const unsplashAPI = new UnsplashAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  unsplashAPI.query = userInput.value;
  unsplashAPI.page = 1;

  try { 
    const response = await unsplashAPI.fetchPhotosByQuery();

      if (response.data.hits.length === 0) { //Якщо не коректний запрос повертаэться масив з length = 0, тоді очищаємо форму, ховаємо кнопку, очищуємо Input
        
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");

        galleryEl.innerHTML = ''; 

        loadMoreBtnEl.classList.add('is-hidden');

        event.target.reset();
        return;
      }

      if(response.data.hits.length < unsplashAPI.per_page) {

        loadMoreBtnEl.classList.add('is-hidden');

        galleryEl.innerHTML = createGalleryCards(response.data.hits);

        modalWindow();

        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.", {
          timeout: 3000,
        });
        return;
      }

      galleryEl.innerHTML = createGalleryCards(response.data.hits);

      scrollOnButton();
      modalWindow();

      loadMoreBtnEl.classList.remove('is-hidden');

      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} totalHits images.`, {
        timeout: 3000,
      },);

    } catch(err) {
      console.log(err);
    };
};

const onLoadMoreBtnClick = async event => {
  unsplashAPI.page += 1;

  try {
    const response = await unsplashAPI.fetchPhotosByQuery();

      if (response.data.totalHits <= unsplashAPI.per_page*unsplashAPI.page) {

        galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(response.data.hits));

        modalWindow();

        loadMoreBtnEl.classList.add('is-hidden');

        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {
          timeout: 3000,
        }, );
        return;
      }
      
      galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(response.data.hits));

      scrollOnButton();
      modalWindow();

    } catch(err) {
      console.log(err);
    };
};

const modalWindow = function() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 300,
  });
  return lightbox;
};

function scrollOnButton() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);