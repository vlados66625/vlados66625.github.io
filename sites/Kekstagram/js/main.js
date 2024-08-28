import { createPicture } from './picture.js';
import { bigPictureOpen } from './rendering-full-photo.js';
import { uploadFileInput, openForm } from './form.js';
import { getData } from './api.js';
import { setFilter } from './filter.js';

export const ALERT_SHOW_TIME = 500;
const picturesFragment = document.createDocumentFragment();
const filter = document.querySelector('.img-filters');

export const listPictures = document.querySelector('.pictures');

const handleClickImage = (dataPhoto) => {
  bigPictureOpen(dataPhoto);
};

export const addsPhotos = (data) => {
  data.forEach((dataPhoto) => {
    const discussedPhotos = createPicture(dataPhoto, handleClickImage);
    picturesFragment.append(discussedPhotos);
  });
  listPictures.append(picturesFragment);
};

getData()
  .then((data) => {
    addsPhotos(data);
    setFilter(data);
  })
  .then(() => {
    filter.classList.remove('img-filters--inactive');
  });

uploadFileInput.addEventListener('change', openForm);
