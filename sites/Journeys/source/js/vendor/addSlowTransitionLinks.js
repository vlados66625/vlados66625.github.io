export const addSlowTransitionLinks = () => {
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
};
