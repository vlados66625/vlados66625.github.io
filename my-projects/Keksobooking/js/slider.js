const sliderElement = document.querySelector('.ad-form__slider');
const priceFields = document.querySelector('#price');

const createSlider = ({ MIN_VALUE, MAX_VALUE, START_VALUE, STEP_VALUE, CONNECT_VALUE }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_VALUE,
      max: MAX_VALUE,
    },
    start: START_VALUE,
    step: STEP_VALUE,
    connect: CONNECT_VALUE,
  });

  sliderElement.noUiSlider.on('update', () => {
    priceFields.value = Math.round(sliderElement.noUiSlider.get());
  });
  document.querySelector('#price').value = '';
};


export { createSlider };
