export function renderBreed(data) {
  refs.catInfo.innerHTML = '';
  refs.loader.classList.remove('loader-is-visible');

  data
    .map(el => {
      `
     <div>
        <img src="${el.url}" alt="Image" width="${el.width}" height="${el.height}">
        <h1>${el.breeds[0].name}</h1>
        <p>${el.breeds[0].description}</p>
        <p>Temperament: ${el.breeds[0].temperament}</p>
     </div>
    `;
    })
    .join('');

  refs.loader.classList.remove('loader-is-visible');
}
