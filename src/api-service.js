
const searchParams = new URLSearchParams({
    key: '27669680-6a77b114183598540616a731d',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    });
const BASE_URL = 'https://pixabay.com/api/';


export default class GalleryApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchGallery() {
    const url = `${BASE_URL}?q=${this.query}&${searchParams}&page=${this.page}`;
    console.log('ok')
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.incrementPage();
        return data;
      });
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