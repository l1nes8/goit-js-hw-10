import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createMarkup } from './createMarkup.js';
import { refs } from './refs.js';

fetchBreeds().then(render).catch(onError);

function render(data) {
  data = data.filter(img => img.image?.url != null);
  const storedBreeds = data;

  const options = storedBreeds
    .filter(breed => breed.image)
    .map(breed => {
      let option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });

  refs.breedSelect.append(...options);
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

  page += 1;

  fetchCatByBreed(selectedOption, page)
    .then(res => {
      refs.catInfo.innerHTML = createMarkup(res);
      refs.loader.classList.remove('loader-is-visible');
    })
    .catch(onError);
}

function onError() {
  refs.loader.classList.remove('loader-is-visible');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
