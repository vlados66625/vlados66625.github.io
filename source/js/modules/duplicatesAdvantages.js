const duplicatesAdvantages = (() => {
  const originalBlock = document.querySelector('.advantages__swiper-wrapper');
  let addedElements = false;

  return () => {
    if (originalBlock && window.innerWidth >= 1200) {
      if (!addedElements) {
        const clonedContent = originalBlock.cloneNode(true).childNodes;
        originalBlock.append(...clonedContent);
        addedElements = true;
      }
    } else if (originalBlock && window.innerWidth < 1200) {
      if (addedElements) {
        const elementsToRemove = originalBlock.querySelectorAll('.advantages__swiper-slide');
        let addedElementCount = elementsToRemove.length * 0.5;
        addedElements = false;

        elementsToRemove.forEach((element, index) => {
          if (index < addedElementCount) {
            element.remove();
          }
        });

      }
    }
  };
})();

export {duplicatesAdvantages};
