import { sendData } from './api.js';
import { isEscape, synchronizeFields } from './util.js';
import { mapFiltersForm } from './generate-usual-marker.js';
import { showsPreviewPhoto } from './shows-preview-photo.js';


const adForm = document.querySelector('.ad-form');
const avatarField = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const imagesField = adForm.querySelector('#images');
const imagesPreview = adForm.querySelector('.ad-form__photo img');
const adFormSubmitButton = adForm.querySelector('.ad-form__submit');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const priceField = adForm.querySelector('#price');
const housingTypeField = adForm.querySelector('#type');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');
const body = document.body;

const MESSAGE_DISPLAY_DURATION = 2500;

const RoomCapacityValue = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const HousingTypeMinValue = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

avatarField.addEventListener('change', () => {
  showsPreviewPhoto(avatarField, avatarPreview);
  avatarPreview.style.width = '100%';
  avatarPreview.style.height = '100%';
});

imagesField.addEventListener('change', () => {
  showsPreviewPhoto(imagesField, imagesPreview);
  imagesPreview.classList.remove('visually-hidden');
});

housingTypeField.addEventListener('change', ()=>{
  priceField.placeholder = HousingTypeMinValue[housingTypeField.value]
});

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, false);

pristine.addValidator(
  capacityField,

  (value) => RoomCapacityValue[roomNumberField.value].includes(value),

  () => {
    const roomNumber = roomNumberField.value;
    return roomNumber === '100'
      ? '100 комнат не доступны для гостей'
      : `Для ${roomNumber} комнат${/1$/.test(roomNumber) ? 'ы' : ''} доступное количество гостей - до ${roomNumber}`;
  }
);

pristine.addValidator(
  priceField,

  (value) => value >= HousingTypeMinValue[housingTypeField.value],

  () => `Для выбранного типа жилья минимальная цена за ночь - ${HousingTypeMinValue[adForm.querySelector('#type').value]} руб.`
);

synchronizeFields(timeinField, timeoutField);

const appendMessage = (message) => {
  const messageClone = message.cloneNode(true);
  body.append(messageClone);
  return messageClone;
};

const setupEventHandlers = (messageClone, removeMessage, buttonClass) => {
  messageClone.addEventListener('click', removeMessage);

  const closeMessageEscapePress = (evt) => {
    if (isEscape(evt)) {
      removeMessage();
    }
  };
  document.addEventListener('keydown', closeMessageEscapePress);

  if (buttonClass) {
    const errorButton = messageClone.querySelector(`.${buttonClass}`);
    errorButton?.addEventListener('click', removeMessage);
  }

  return () => {
    document.removeEventListener('keydown', closeMessageEscapePress);
  };
};

const setupTimeout = (removeMessage, shouldAutoRemove) => {
  if (shouldAutoRemove) {
    const timeout = setTimeout(() => {
      removeMessage();
    }, MESSAGE_DISPLAY_DURATION);
    return () => clearTimeout(timeout);
  }
  return () => { };
};

const showMessage = (message, shouldAutoRemove, buttonClass) => () => {
  const messageClone = appendMessage(message);
  const removeHandlers = setupEventHandlers(messageClone, removeMessage, buttonClass);
  const removetimeout = setupTimeout(removeMessage, shouldAutoRemove);

  function removeMessage() {
    removeHandlers();
    removetimeout();
    messageClone.remove();
  }
};

const showMessageonSuccess = showMessage(successMessage, true);
const showMessageonError = showMessage(errorMessage, false, 'error__button');

adForm.addEventListener('reset', () => {
  imagesPreview.classList.add('visually-hidden');
  avatarPreview.src = 'img/muffin-grey.svg';
  avatarPreview.style.width = '40px';
  avatarPreview.style.height = '44px';
});


const handleradFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      adFormSubmitButton.setAttribute('disabled', 'true');
      sendData('', 'Ошибка отправки данных', adForm)
        .then(() => {
          showMessageonSuccess();
          adForm.reset();
          mapFiltersForm.reset();
        })
        .catch(() => {
          showMessageonError();
        })
        .finally(() => {
          adFormSubmitButton.removeAttribute('disabled');
        });
    }
  });
};

export { handleradFormSubmit, adForm };
