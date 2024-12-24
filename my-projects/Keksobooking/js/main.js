import { toggleForm } from './toggle-form.js';
import { handleradFormSubmit, adForm } from './form.js';
import { generateMap } from './map.js';
import { generateUsualMarker, handlerFilterFormChange, mapFiltersForm } from './generate-usual-marker.js';
import { createSlider } from './slider.js';
import { getData } from './api.js';
import { generateErrorMessage } from './generating-markup.js';
import { debounce } from './util.js';

const filter = document.querySelector('.map__filters-container');
const USAGE_TIMER = 500;

const SliderSettings = {
  MIN_VALUE: 0,
  MAX_VALUE: 100000,
  START_VALUE: 1000,
  STEP_VALUE: 500,
  CONNECT_VALUE: 'lower'
};

toggleForm(mapFiltersForm, true);
toggleForm(adForm, true);
createSlider(SliderSettings);
generateMap();
handleradFormSubmit();

getData('/data', 'Ошибка загрузки данных')
  .then((data) => {
    generateUsualMarker(data);
    handlerFilterFormChange(debounce(() => generateUsualMarker(data)), USAGE_TIMER);
    toggleForm(mapFiltersForm, false);
  })
  .catch((err) => {
    generateErrorMessage(err.message, filter);
  });


