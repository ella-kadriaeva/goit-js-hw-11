import './sass/main.scss';
import Notiflix from 'notiflix';
import GalleryApiService from './api-service.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const galleryCard = document.querySelector(".gallery");
const buttonLoad = document.querySelector('.load-more');
const createGallery = new GalleryApiService();

const per_page = 40;

searchForm.addEventListener('submit', getSearch);
buttonLoad.addEventListener('click', onLoadMore);
buttonLoad.classList.add("is-hidden");



async function getSearch(e) {
 e.preventDefault();
 createGallery.resetPage();
 clearCard ();
 const form = e.currentTarget;
 createGallery.query = form.elements.searchQuery.value.trim();

 if(createGallery.query === '') {
     return
 }

 const data = await createGallery.fetchGallery();
 const totalHits = data.totalHits;
 Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
 checkTotal(data);
 
 }

 function clearCard () {
  galleryCard.innerHTML = "";
 }
 

async function checkTotal(data) {
  const newArray = await data.hits;
  if(newArray.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return 
   }
  const totalHits = data.totalHits;
 
  let delta = totalHits - per_page  * (createGallery.page - 1); 
    if(delta <= 0) {
      console.log(delta);
     buttonLoad.classList.add("is-hidden");
     newGalery (data);
     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    return
 }
 buttonLoad.classList.remove("is-hidden");
 return newGalery(data);
}

async function renderGallery(array) {
   
const newArray = await array.hits;
   
    return newArray.map(({webformatURL, tags, likes, views, comments, downloads, largeImageURL}) => {
        return `
    <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}"  max-width="320px"height="200px" loading="lazy" />
    </a> 
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


async function newGalery (data) {
  
  const markup = await renderGallery(data);
   galleryCard.insertAdjacentHTML("beforeend", markup);
   const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    close: false,
   });
    lightbox.refresh();
} 
async function onLoadMore() {
  
  const data = await createGallery.fetchGallery();
 checkTotal(data);
}




