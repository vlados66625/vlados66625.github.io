const USAGE_TIMER_DEFAULT = 500;

const isEscape = (evt) => evt.key === 'Escape';

const synchronizeFields = (field1, field2) => {
  field1.addEventListener('change', () => {
    field2.value = field1.value;
  });
  field2.addEventListener('change', () => {
    field1.value = field2.value;
  });
};


const debounce = (cb, timeoutDelay = USAGE_TIMER_DEFAULT) => {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export { isEscape, synchronizeFields, debounce };
