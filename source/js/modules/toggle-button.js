const navMain = document.querySelector('.header-top__navigation');
const navToggle = document.querySelector('.header-top__toggle');
const navLogo = document.querySelector('.header-top__logo');
const navTelephoneIcon = document.querySelector('.header-top__telephone');
const closeButton = document.querySelector('.header-top__close-button');
const navMainUl = navMain.querySelector('Ul');


export const addEvtToggleButton = () => {
  if (navMain && navToggle && navLogo && navTelephoneIcon) {
    const openedNav = () => {
      navMain.classList.remove('header-top__navigation--closed');
      navMain.classList.add('header-top__navigation--opened');
      navToggle.classList.remove('header-top__toggle--closed');
      navToggle.classList.add('header-top__toggle--opened');
      navLogo.classList.add('header-top__logo-icon--dark');
      navTelephoneIcon.classList.add('header-top__telephone--dark');
      document.body.style.overflow = 'hidden';
    };

    const closedNav = () => {
      navMain.classList.add('header-top__navigation--closed');
      navMain.classList.remove('header-top__navigation--opened');
      navToggle.classList.add('header-top__toggle--closed');
      navToggle.classList.remove('header-top__toggle--opened');
      navLogo.classList.remove('header-top__logo-icon--dark');
      navTelephoneIcon.classList.remove('header-top__telephone--dark');
      document.body.style.overflow = 'auto';
    };

    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('header-top__navigation--closed')) {
        openedNav();
      } else {
        closedNav();
      }
    });

    closeButton.addEventListener('click', () => {
      closedNav();
    });

    document.addEventListener('click', (evt) => {
      if (window.innerWidth < 1200 && navMainUl.contains(evt.target) && evt.target.tagName === 'A') {
        closedNav();
      }
    });

  }
};
