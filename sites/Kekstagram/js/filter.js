import { debounce,} from './util.js';
import { ALERT_SHOW_TIME, listPictures } from './main.js';
import { renderPhotos } from './picture.js';
const filterList = document.querySelector('.img-filters__form');
export const removePhotos = (pictures) => {
  pictures.forEach((picture) => {
    listPictures.removeChild(picture);
  });
};

export const sortAscending = (object1, object2) => {
  const difference = object2.comments.length - object1.comments.length;
  return difference;
};

export const setFilter = (elements) => {
  const debounceFilter = debounce(renderPhotos, ALERT_SHOW_TIME);
  filterList.addEventListener('click', (evt) => {
    debounceFilter(elements, evt.target);
  });
};
