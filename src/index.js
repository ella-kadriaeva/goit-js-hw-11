import './sass/main.scss';
import Notiflix from 'notiflix';
import GalleryApiService from './api-service.js';

const searchForm = document.querySelector('#search-form');
const galleryCard = document.querySelector(".gallery");
const buttonLoad = document.querySelector('.load-more');
const createGallery = new GalleryApiService();

searchForm.addEventListener('submit', getSearch);
buttonLoad.addEventListener('click', onLoadMore);

function getSearch(e) {
 e.preventDefault();
 const form = e.currentTarget;
 createGallery.query = form.elements.searchQuery.value.trim();
 if(createGallery.query === '') {
     return
 }
 createGallery.fetchGallery().then(renderGallery).then(newGalery)
 
}

function renderGallery(array) {
   
const newArray = array.hits;
    if(newArray.length === 0) {
       Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
       return
    }
    
    return newArray.map(({previewURL, tags, likes, views, comments, downloads}) => {
        return `
    <div class="photo-card">
        <img class="gallery__image" src="${previewURL}" alt="${tags}" max-width="320px"height="200px" loading="lazy" />
     
      <div class="info">
        <p class="info-item">
          <b>Likes</b>: ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>: ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>: ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>: ${downloads}
        </p>
      </div>
    </div>
    `
    })
    .join("");
    
}
function newGalery (array) {
  return  galleryCard.insertAdjacentHTML("beforeend", array);
} 

function onLoadMore() { 
  return  createGallery.fetchGallery().then(renderGallery).then(newGalery)
}
