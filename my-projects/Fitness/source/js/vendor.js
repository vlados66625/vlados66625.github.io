// Swiper 10.0.4
import './vendor/focus-visible-polyfill';
import {initTabs, tabs} from './vendor/tabs/init-tabs';
import {initAccordions} from './vendor/accordions/init-accordion';
import Swiper from './vendor/swiper';

const control = document.querySelector('[data-tabs="control"]');


window.addEventListener('DOMContentLoaded', () => {
  if (control) {
    initTabs();
    tabs.openTab(control);
  }

  initAccordions();

  const trainerSwiper = new Swiper('.trainer__swiper', {
    loop: true,
    slidesPerView: 4,


    navigation: {
      nextEl: '.trainer__swiper-button-next',
      prevEl: '.trainer__swiper-button-prev',
    },
  });

  const updateSwiperOptions = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      trainerSwiper.params.slidesPerView = 2;
    } else if (window.innerWidth < 768) {
      trainerSwiper.params.slidesPerView = 1;
    } else {
      trainerSwiper.params.slidesPerView = 4;
    }
    trainerSwiper.update();
    trainerSwiper.updateSlides();
  };
  updateSwiperOptions();

  window.addEventListener('resize', updateSwiperOptions);

  const reviewsSwiper = new Swiper('.reviews__swiper', {
    loop: false,
    slidesPerView: 1,


    navigation: {
      nextEl: '.reviews__swiper-button-next',
      prevEl: '.reviews__swiper-button-prev',
    },
  });
});
