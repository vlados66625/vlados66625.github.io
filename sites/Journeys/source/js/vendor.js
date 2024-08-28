// Swiper 10.2.0
import './vendor/focus-visible-polyfill';
import Swiper from './vendor/swiper';
import {addSlowTransitionLinks} from './vendor/addSlowTransitionLinks';
import {Form} from './vendor/form-validate/form';
import {stopVideo} from './modules/play-button';

window.addEventListener('DOMContentLoaded', () => {
  addSlowTransitionLinks();

  const heroSwiper = new Swiper('.header-bottom', {
    loop: true,
    speed: 300,
    pagination: {
      el: '.header-bottom__swiper-pagination',
      clickable: true,
    },
  });

  heroSwiper.on('slideChange', function () {
    stopVideo();
  });

  const upcomingTours = new Swiper('.upcoming-tours__swiper', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.upcoming-tours__button-next',
      prevEl: '.upcoming-tours__button-prev',
    },
  });

  const trainingSwiper = new Swiper('.training__swiper', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: '.training__button-next',
      prevEl: '.training__button-prev',
    },
  });

  const reviewsSwiper = new Swiper('.reviews__swiper', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
  });

  if (window.innerWidth >= 1200) {
    const advantagesSwiper = new Swiper('.advantages__swiper', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      initialSlide: 2,
      navigation: {
        nextEl: '.advantages__button-next',
        prevEl: '.advantages__button-prev',
      },
    });
  }


  const photoGallerySwiper = new Swiper('.photo-gallery__swiper', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 5,
    navigation: {
      nextEl: '.photo-gallery__button-next',
      prevEl: '.photo-gallery__button-prev',
    },
  });

  const updateSwiperOptions = () => {
    if (window.innerWidth >= 1200) {
      upcomingTours.params.spaceBetween = 30;
      upcomingTours.params.slidesPerView = 3;

      trainingSwiper.params.slidesPerView = 4;

    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      upcomingTours.params.slidesPerView = 2;
      upcomingTours.params.spaceBetween = 18;

      trainingSwiper.params.slidesPerView = 3;

    } else if (window.innerWidth >= 540 && window.innerWidth < 768) {
      reviewsSwiper.params.slidesPerView = 'auto';

      upcomingTours.params.slidesPerView = 1;

      trainingSwiper.params.slidesPerView = 1;

    } else {
      upcomingTours.params.slidesPerView = 1;

      trainingSwiper.params.slidesPerView = 1;

      reviewsSwiper.params.slidesPerView = 1;

      photoGallerySwiper.params.spaceBetween = 3;
    }
  };

  updateSwiperOptions();
  window.addEventListener('resize', updateSwiperOptions);

  const form = new Form();
  window.form = form;
  form.init();

});
