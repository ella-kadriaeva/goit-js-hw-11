
const searchParams = new URLSearchParams({
  key: '27669680-6a77b114183598540616a731d',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  });
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios').default;


export default class GalleryApiService {
constructor() {
  this.searchQuery = '';
  this.page = 1;
}

async fetchGallery() {
  const url = `${BASE_URL}?q=${this.searchQuery}&${searchParams}&page=${this.page}`;
  try {
  const response = await axios.get(url);
  const data = response.data;
  
  this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
}

incrementPage() {
  this.page += 1;
}

resetPage() {
  this.page = 1;
}

get query() {
  return this.searchQuery;
}

set query(newQuery) {
  this.searchQuery = newQuery;
}
}