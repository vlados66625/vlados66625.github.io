const showErrorBlockTime = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorBlock = (errorText) => {
  const errorFragment = document.createElement('div');
  errorFragment.style.zIndex = '100';
  errorFragment.style.position = 'absolute';
  errorFragment.style.left = '0';
  errorFragment.style.top = '0';
  errorFragment.style.right = '0';
  errorFragment.style.padding = '10px 3px';
  errorFragment.style.fontSize = '30px';
  errorFragment.style.lineHeight = '35px';
  errorFragment.style.textAlign = 'center';
  errorFragment.style.backgroundColor = 'red';

  errorFragment.textContent = errorText;

  document.body.append(errorFragment);

  setTimeout(() => {
    errorFragment.remove();
  }, showErrorBlockTime);
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, isEscapeKey, showErrorBlock, debounce };

