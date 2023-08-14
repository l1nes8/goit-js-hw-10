const BASE_URL = 'https://api.thecatapi.com/v1';
const URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_ZRhb9QDqxOnsayJ7SBwmz2cdAH5d3wcwd1nW40wI4YVwoMzYP3fvG0Z6NwvzBO0k';

export function fetchBreeds() {
  return fetch(URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}

export function fetchCatByBreed(breedId, page) {
  return fetch(`${BASE_URL}/images/search?page=${page}&breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}
