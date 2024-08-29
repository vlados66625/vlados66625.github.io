const videoContainer = document.querySelector('.video-container');

export const calculateVideoSize = () => {
  if (videoContainer) {
    const width = getComputedStyle(videoContainer).width;
    if (window.innerWidth >= 768) {
      const height = parseFloat(width) * 0.6278;
      videoContainer.style.height = height + 'px';
    }
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      const height = parseFloat(width) * 0.5219;
      videoContainer.style.height = height + 'px';
    }
  }
};
