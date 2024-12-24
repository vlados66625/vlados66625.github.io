const ADRESS = 'https://28.javascript.htmlacademy.pro/keksobooking';

const getData = (route, messageError) =>
  fetch(`${ADRESS}${route}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(messageError);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const sendData = (route, messageError, form) =>
  fetch(`${ADRESS}${route}`, {
    method: 'POST',
    body: new FormData(form)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(messageError);
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });

export { getData, sendData };
