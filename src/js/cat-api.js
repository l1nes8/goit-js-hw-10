import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { renderBreed } from './createMarkup.js';

import axios from 'axios';

const URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_ZRhb9QDqxOnsayJ7SBwmz2cdAH5d3wcwd1nW40wI4YVwoMzYP3fvG0Z6NwvzBO0k';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(render)
  .catch(error => {
    refs.loader.classList.remove('loader-is-visible');
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

export function fetchBreeds() {
  refs.loader.classList.add('loader-is-visible');
  return fetch(URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(res => {
    return res.json();
  });
}

function render(data) {
  data = data.filter(img => img.image?.url != null);
  const storedBreeds = data;

  for (let i = 0; i < storedBreeds.length; i += 1) {
    const breed = storedBreeds[i];
    if (!breed.image) continue;

    let option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.append(option);
  }
  selectStyled();
  refs.loader.classList.remove('loader-is-visible');
}

function selectStyled() {
  new SlimSelect({
    select: refs.breedSelect,
  });
}

let page = 1;
refs.breedSelect.addEventListener('change', onChange);

function onChange(e) {
  refs.loader.classList.add('loader-is-visible');
  const option = e.currentTarget;
  const selectedOption = option.value;

  page = 1;

  fetchCatByBreed(selectedOption)
    .then(res => renderBreed(res))
    .catch(error => {
      refs.loader.classList.remove('loader-is-visible');
      refs.catInfo.innerHTML = '';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?page=${page}&breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  ).then(response => {
    return response.json();
  });
}
