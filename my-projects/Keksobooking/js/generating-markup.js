const ALERT_SHOW_TIME = 3500;

const typeAccommodation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addsDataTextContent = (element, text) => {
  if (element) {
    if (text || text === 0) {
      element.textContent = text;
      return element;
    }
    element.remove();
  }
};

const addsDataSrc = (element, src) => {
  if (src) {
    if (src !== null && src !== undefined) {
      element.src = src;
      return element;
    }
    element.remove();
  }
};

const popup = document.querySelector('#card')
  .content
  .querySelector('.popup');

const generatingPopup = (data) => {
  if (popup) {
    const fragment = document.createDocumentFragment();

    for (const itemData of data) {
      const popupClone = popup.cloneNode(true);
      addsDataSrc(popupClone.querySelector('.popup__avatar'), itemData?.author?.avatar);
      addsDataTextContent(popupClone.querySelector('.popup__title'), itemData?.offer?.title);
      addsDataTextContent(popupClone.querySelector('.popup__text--address'), itemData?.offer?.address);
      const textPrice = itemData?.offer?.price ? `${itemData.offer.price} ₽/ночь` : null;
      addsDataTextContent(popupClone.querySelector('.popup__text--price'), textPrice);
      const textType = itemData?.offer?.type ? typeAccommodation[itemData.offer.type] : null;
      addsDataTextContent(popupClone.querySelector('.popup__type'), textType);
      const textCapacity = itemData?.offer?.rooms && itemData?.offer?.guests ? `${itemData.offer.rooms} комнат${itemData.offer.rooms === 1 ? 'а' : 'ы'} для ${itemData.offer.guests} гост${itemData.offer.guests === 1 ? 'я' : 'ей'}` : null;
      addsDataTextContent(popupClone.querySelector('.popup__text--capacity'), textCapacity);
      const textTime = itemData?.offer?.checkin && itemData?.offer?.checkout ? `Заезд после ${itemData.offer.checkin}, выезд до ${itemData.offer.checkout}` : null;
      addsDataTextContent(popupClone.querySelector('.popup__text--time'), textTime);

      const popupFeatures = popupClone.querySelectorAll('.popup__feature');
      const features = itemData?.offer?.features || [];

      for (const popupFeature of popupFeatures) {
        const isPresent = features.some((feature) => popupFeature.classList.contains(`popup__feature--${feature}`));
        if (!isPresent) {
          popupFeature.remove();
        }
      }

      addsDataTextContent(popupClone.querySelector('.popup__description'), itemData?.offer?.description);

      const popupPhotosContainer = popupClone.querySelector('.popup__photos');
      const photosSrc = itemData?.offer?.photos || [];
      let popupPhoto = popupClone.querySelector('.popup__photo');
      if (popupPhoto) {
        if (photosSrc.length > 0) {
          photosSrc.forEach((photo, index) => {
            if (index >= 1) {
              popupPhoto = popupPhoto.cloneNode(true);
              popupPhoto.src = photo;
              popupPhotosContainer.append(popupPhoto);
            } else {
              popupPhoto.src = photo;
            }
          });
        } else {
          popupPhotosContainer.remove();
        }
      }
      fragment.append(popupClone);
    }

    return (fragment);
  }
};

const generateErrorMessage = (message, parent) => {
  const textError = document.createElement('p');
  textError.style.position = 'absolute';
  textError.style.zIndex = '1001';
  textError.style.top = '0';
  textError.style.transform = 'translateY(-100%)';
  textError.style.width = '100%';
  textError.style.margin = '0';
  textError.style.padding = '15px 30px';
  textError.style.fontSize = '20px';
  textError.style.textAlign = 'center';
  textError.style.color = 'red';
  textError.style.backgroundColor = 'white';
  textError.textContent = message;
  parent.prepend(textError);
  setTimeout(() => {
    parent.removeChild(textError);
  }, ALERT_SHOW_TIME);
};

export { generatingPopup, generateErrorMessage };
