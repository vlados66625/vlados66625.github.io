import { map } from './map.js';
import { generatingPopup } from './generating-markup.js';

const mapFiltersForm = document.querySelector('.map__filters');

const housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
const housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsFilter = mapFiltersForm.querySelector('#housing-guests');
const housingFeaturesFilter = mapFiltersForm.querySelector('#housing-features');


const markerGroup = L.layerGroup().addTo(map);

const usualIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const filterUsualMarker = (data) => {
  const selectedFeatures = [...housingFeaturesFilter.querySelectorAll('input:checked')].map((features) => features.value);

  if (housingTypeFilter.value !== 'any') {
    data = data.filter((dwelling) => dwelling.offer.type === housingTypeFilter.value);
  }

  if (housingPriceFilter.value !== 'any') {
    data = data.filter((dwelling) => {
      switch (housingPriceFilter.value) {
        case ('low'):
          return dwelling.offer.price < 10000;
        case ('middle'):
          return dwelling.offer.price >= 10000 && dwelling.offer.price <= 50000;
        case ('high'):
          return dwelling.offer.price > 50000;
      }
    });
  }

  if (housingRoomsFilter.value !== 'any') {
    data = data.filter((dwelling) => dwelling.offer.rooms.toString() === housingRoomsFilter.value);
  }

  if (housingGuestsFilter.value !== 'any') {
    data = data.filter((dwelling) => dwelling.offer.guests.toString() === housingGuestsFilter.value);
  }

  if (selectedFeatures.length > 0) {
    data = data.filter((dwelling) => dwelling.offer.features && selectedFeatures.every((feature) => dwelling.offer.features.includes(feature)));
  }

  return data;
};

const generateUsualMarker = (data) => {
  const dataFiltered = filterUsualMarker(data);
  const dataFilteredSlice = dataFiltered.slice(0, 10);
  dataFilteredSlice.forEach((dwelling, index) => {
    const usualMarker = L.marker(
      dwelling.location,
      { icon: usualIcon });
    usualMarker
      .addTo(markerGroup)
      .bindPopup(generatingPopup(dataFilteredSlice).querySelectorAll('.popup')[index]);
  });
};

const handlerFilterFormChange = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

export { generateUsualMarker, handlerFilterFormChange, mapFiltersForm };
