import './sass/main.scss';

const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
    key: '27669680-6a77b114183598540616a731d',
    q: 'dog',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    
  });

  function fetchSerch() {
    return fetch(`${BASE_URL}?${searchParams}`).then(response => {
     if(response.ok) {
           return response.json();
     }
      throw new Error('Error fetching data')
    });
  }

fetchSerch();

