const cards = document.querySelector('.cards');
const page = document.querySelector('.page');

cards.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const flippedCard = document.querySelector('.card__inner--flipped');
    if (flippedCard) {
        flippedCard.classList.remove('card__inner--flipped');
    }
    const cardInner = evt.target.closest('.card__inner');
    cardInner.classList.add('card__inner--flipped');
});

page.addEventListener('click', () => {
    const flippedCard = document.querySelector('.card__inner--flipped');
    if (flippedCard) {
        flippedCard.classList.remove('card__inner--flipped');
    }
});
