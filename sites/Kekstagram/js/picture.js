import { removePhotos, sortAscending } from './filter.js';
import { addsPhotos } from './main.js';
import { getRandomInteger } from './util.js';

const pictureHtml = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const filterRandom = document.querySelector('#filter-random');
const filterDefault = document.querySelector('#filter-default');
const filterDiscussed = document.querySelector('#filter-discussed');

export function createPicture({ id, url, likes, comments, description }, handleClickImage) {
  const pictureElement = pictureHtml.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  pictureImage.src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureImage.addEventListener('click', () => handleClickImage({ id, url, likes, comments, description }));

  return pictureElement;
}

export const renderPhotos = (data, filter = null) => {
  const pictures = document.querySelectorAll('.picture');
  removePhotos(pictures);

  if (filter) {
    switch (filter) {
      case filterRandom:
        data = data.slice();
        while (data.length > 10) {
          const elementRemoved = getRandomInteger(0, data.length - 1);
          data.splice(elementRemoved, 1);
        }
        break;
      case filterDefault:
        data = data.slice();
        break;
      case filterDiscussed:
        data = data.slice().sort(sortAscending);
        break;
      default:
        break;
    }
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
  }

  addsPhotos(data);
};
