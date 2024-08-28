import { showErrorBlock } from './util.js';
import { sendData } from './api.js';
import { body } from './rendering-full-photo.js';
import { isEscapeKey } from './util.js';
export const uploadFileInput = document.querySelector('#upload-file');
const editFormPopup = document.querySelector('.img-upload__overlay');
const closeFormButton = editFormPopup.querySelector('#upload-cancel');
const imgForm = document.querySelector('.img-upload__form');
const hashtag = imgForm.querySelector('.text__hashtags');
const commentPhoto = imgForm.querySelector('.text__description');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const buttonSubmit = document.querySelector('.img-upload__submit');
const imgMini = document.querySelectorAll('.effects__preview');
// scale
const scaleSmallerButton = editFormPopup.querySelector('.scale__control--smaller');
const scaleBiggerButton = editFormPopup.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleValue = editFormPopup.querySelector('.scale__control--value');
let scale = 100;
// effect-slider
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsValue = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectsRadioButtonAll = document.querySelectorAll('.effects__radio');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const hashtagValid = /^#[a-zа-яё0-9]{1,19}$/i;

const closesPressingEsc = (cb, evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cb();
  }
};

const onFormKeydown = closesPressingEsc.bind(null, closeForm);
const onMessageKeydown = closesPressingEsc.bind(null, closeModalWindow);

const scaleSmaller = () => {
  if ((scale >= 50) && (scale <= 100)) {
    scale -= 25;
  }
  imgUploadPreview.style.transform = `scale(${scale * 0.01})`;
  scaleValue.value = `${scale}%`;
};


const scaleBigger = () => {
  if ((scale >= 0) && (scale <= 75)) {
    scale += 25;
  }
  imgUploadPreview.style.transform = `scale(${scale * 0.01})`;
  scaleValue.value = `${scale}%`;
};

// блок об успешной отправки данных
function closeModalWindow() {
  body.removeChild(successMessage);
  document.removeEventListener('keydown', onMessageKeydown);
}

const openModalWindow = () => {
  body.append(successMessage);
  const successButton = document.querySelector('.success__button');
  document.addEventListener('keydown', onMessageKeydown);
  successButton.addEventListener('click', closeModalWindow);
  body.addEventListener('click', (evt) => {
    if (evt.target.contains(successMessage)) {
      closeModalWindow();
    }
  });
};

// основная форма
function closeForm() {
  scale = 100;
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = 'none';
  sliderElement.classList.add('visually-hidden');
  editFormPopup.classList.add('hidden');
  body.classList.remove('modal-open');
  imgForm.reset();
  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onFormKeydown);
  scaleBiggerButton.removeEventListener('click', scaleBigger);
  scaleSmallerButton.removeEventListener('click', scaleSmaller);
}

export const openForm = () => {
  editFormPopup.classList.remove('hidden');
  body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onFormKeydown);

  const canselsHandlerEsc = (element) => {
    const stopAscentEsc = (evt) => {
      evt.stopPropagation();
    };

    const stopAscentEscFocus = () => {
      element.addEventListener('keydown', stopAscentEsc);
    };

    element.addEventListener('focus', stopAscentEscFocus);
    element.addEventListener('blur', element.removeEventListener('keydown', stopAscentEsc));
    element.removeEventListener('blur', stopAscentEscFocus);
    element.removeEventListener('focus', element.removeEventListener('keydown', stopAscentEsc));
  };

  canselsHandlerEsc(hashtag);
  canselsHandlerEsc(commentPhoto);

  scaleBiggerButton.addEventListener('click', scaleBigger);
  scaleSmallerButton.addEventListener('click', scaleSmaller);

  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    imgMini.forEach((el) => {
      el.style.backgroundImage = `url("${imgUploadPreview.src}")`;
    });
  }
};

uploadFileInput.addEventListener('change', openForm);

const checksValidFormText = () => {
  let valid = true;
  const arrayHashtag = hashtag.value.trim().split(' ');
  arrayHashtag.forEach((hash) => {
    if (!hashtagValid.test(hash)) {
      valid = false;
    }
  });
  return valid;
};

const checksValidRepeat = () => {
  const arrayHashtag = hashtag.value.trim().split(' ');
  let valid = true;
  arrayHashtag.forEach((hash, index) => {
    for (let j = index; j < arrayHashtag.length - 1; j++) {
      if (hash === arrayHashtag[j + 1]) {
        valid = false;
        return;
      }
    }
  });
  return valid;
};

const checksValidQuantity = () => {
  const arrayHashtag = hashtag.value.trim().split(' ');
  return arrayHashtag.length <= 5;
};

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper',
});

pristine.addValidator(
  hashtag,
  checksValidFormText,
  'Формат хэштега неверный'
);

pristine.addValidator(
  hashtag,
  checksValidRepeat,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  hashtag,
  checksValidQuantity,
  'Хэштегов не должно быть больше 5'
);

const buttonSubmitBlocking = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Опубликовывается';
};

const buttonSubmitUnblocking = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};


const setUserFormSubmit = (onSuccess, onSuccessMessage) => {
  imgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      buttonSubmitBlocking();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(onSuccessMessage)
        .catch((err) => {
          showErrorBlock(err.message);
        })
        .finally(buttonSubmitUnblocking);
    }
  });
};

setUserFormSubmit(closeForm, openModalWindow);

// slider

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});
sliderElement.classList.add('visually-hidden');

const changesValueFilter = (parameter, unit) => {
  sliderElement.noUiSlider.on('update', () => {
    effectsValue.value = sliderElement.noUiSlider.get();
    imgUploadPreview.style.filter = `${parameter}(${effectsValue.value}${unit})`;
  });
};

effectsRadioButtonAll.forEach((effectsRadioButton) => {
  effectsRadioButton.addEventListener('input', (evt) => {
    imgUploadPreview.className = '';
    const classImg = evt.target.parentElement.children[1].children[0].getAttribute('class').replace('effects__preview  ', '');
    imgUploadPreview.classList.add(`${classImg}`);

    switch (classImg) {
      case 'effects__preview--none':
        sliderElement.classList.add('visually-hidden');
        imgUploadPreview.style.filter = 'none';
        break;
      case 'effects__preview--chrome':
        sliderElement.classList.remove('visually-hidden');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        changesValueFilter('grayscale', '');
        break;
      case 'effects__preview--sepia':
        sliderElement.classList.remove('visually-hidden');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        changesValueFilter('sepia', '');
        break;
      case 'effects__preview--marvin':
        sliderElement.classList.remove('visually-hidden');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        changesValueFilter('invert', '%');
        break;
      case 'effects__preview--phobos':
        sliderElement.classList.remove('visually-hidden');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        changesValueFilter('blur', 'px');
        break;
      case 'effects__preview--heat':
        sliderElement.classList.remove('visually-hidden');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        changesValueFilter('brightness', '');
        break;
    }

    // if (classImg === 'effects__preview--none') {
    //   sliderElement.classList.add('visually-hidden');
    //   imgUploadPreview.style.filter = 'none';
    // }

    // if (classImg === 'effects__preview--chrome') {
    //   sliderElement.classList.remove('visually-hidden');
    //   sliderElement.noUiSlider.updateOptions({
    //     range: {
    //       min: 0,
    //       max: 1,
    //     },
    //     start: 1,
    //     step: 0.1,
    //   });
    //   changesValueFilter('grayscale', '');
    // }

    // if (classImg === 'effects__preview--sepia') {
    //   sliderElement.classList.remove('visually-hidden');
    //   sliderElement.noUiSlider.updateOptions({
    //     range: {
    //       min: 0,
    //       max: 1,
    //     },
    //     start: 1,
    //     step: 0.1,
    //   });
    //   changesValueFilter('sepia', '');
    // }

    // if (classImg === 'effects__preview--marvin') {
    //   sliderElement.classList.remove('visually-hidden');
    //   sliderElement.noUiSlider.updateOptions({
    //     range: {
    //       min: 0,
    //       max: 100,
    //     },
    //     start: 100,
    //     step: 1,
    //   });
    //   changesValueFilter('invert', '%');
    // }

    // if (classImg === 'effects__preview--phobos') {
    //   sliderElement.classList.remove('visually-hidden');
    //   sliderElement.noUiSlider.updateOptions({
    //     range: {
    //       min: 0,
    //       max: 3,
    //     },
    //     start: 3,
    //     step: 0.1,
    //   });
    //   changesValueFilter('blur', 'px');
    // }

    // if (classImg === 'effects__preview--heat') {
    //   sliderElement.classList.remove('visually-hidden');
    //   sliderElement.noUiSlider.updateOptions({
    //     range: {
    //       min: 1,
    //       max: 3,
    //     },
    //     start: 3,
    //     step: 0.1,
    //   });
    //   changesValueFilter('brightness', '');
    // }
  });
});


