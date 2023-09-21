export const addWorkingFields = () => {
  if (document.querySelectorAll('a[href^="#"]')) {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();

        document.querySelector(link.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }

  if (document.querySelectorAll('input[type="text"]')) {
    document.querySelectorAll('input[type="text"]').forEach((input) => {
      input.addEventListener('focus', () => {
        input.removeAttribute('placeholder');
      });

      if (document.querySelector('input[name="name"]') && input.getAttribute('name') === 'name') {
        input.addEventListener('blur', () => {
          input.setAttribute('placeholder', 'Имя');
        });
      }

      if (document.querySelector('input[name="tel"]') && input.getAttribute('name') === 'tel') {
        input.addEventListener('blur', () => {
          input.setAttribute('placeholder', 'Телефон');
        });
      }
    });
  }
};
