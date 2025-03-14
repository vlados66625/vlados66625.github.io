const cards = document.querySelector('.cards');
const page = document.querySelector('.page');

cards.addEventListener('touchend', (evt) => {
    evt.stopPropagation();
    const flippedCard = document.querySelector('.card__inner--flipped');
    if (flippedCard) {
        flippedCard.classList.remove('card__inner--flipped');
    }
    const cardInner = evt.target.closest('.card__inner');
    cardInner.classList.add('card__inner--flipped');
});

page.addEventListener('touchend', () => {
    const flippedCard = document.querySelector('.card__inner--flipped');
    if (flippedCard) {
        flippedCard.classList.remove('card__inner--flipped');
    }
});
