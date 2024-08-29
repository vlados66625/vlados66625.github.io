const playButton = document.querySelector('[data-action="play-button"]');
const video = document.querySelector('[data-action="gym-video"]');

export const addEvtVideo = () => {
  if (playButton && video) {
    video.controls = false;
    playButton.addEventListener('click', function () {
      video.play();
      playButton.classList.add('is-close');
      video.controls = true;
    });
    video.addEventListener('pause', function () {
      playButton.classList.remove('is-close');
      video.controls = false;
    });

    video.addEventListener('play', function () {
      playButton.classList.add('is-close');
      video.controls = true;
    });
  }
};
