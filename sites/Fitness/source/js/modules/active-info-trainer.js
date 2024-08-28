const trainerPhotoContainer = document.querySelector('.trainer__swiper');

export const activeInfoTrainer = () => {
  if (trainerPhotoContainer && window.innerWidth < 1200) {
    trainerPhotoContainer.addEventListener('click', (event) => {
      const clickedTrainerPhoto = event.target.closest('.trainer__photo-container');
      if (clickedTrainerPhoto) {
        clickedTrainerPhoto.classList.toggle('trainer__photo-container--is-active');
      }
    });
  }
};
