import './sass/main.scss';
import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
    key: '27669680-6a77b114183598540616a731d',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    });

const searchForm = document.querySelector('#search-form');
const galleryCard = document.querySelector(".gallery");

searchForm.addEventListener('submit', getSearch);

function getSearch(e) {
 e.preventDefault();
 const form = e.currentTarget;
 const searchValue = form.elements.searchQuery.value.trim();

 if(searchValue === '') {
     return
 }
 fetchGallery(searchValue).then(renderGallery).then(createGalery)
 
}
function fetchGallery(value) {
    return fetch(`${BASE_URL}?${searchParams}&q=${value}`).then(response => {
     if(response.ok) {
         console.log('ok');
           return response.json();
     }
      throw new Error('Error fetching data')
    });
  }

function renderGallery(data) {
   
    console.log(data.total, data.totalHits, data,  data.hits);

    const array =  data.hits;
    if(array.length === 0) {
       Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
       return
    }
    return array.map(({previewURL, tags, likes, views, comments, downloads}) => {
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
          <b>Downloads</b>:${downloads}
        </p>
      </div>
    </div>
    `
    })
    .join("");
    
}
function createGalery (array) {
  return  galleryCard.insertAdjacentHTML("beforeend", array);
} 
