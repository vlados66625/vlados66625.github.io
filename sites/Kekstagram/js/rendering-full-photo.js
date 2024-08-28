import { isEscapeKey } from './util.js';

export const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.comments-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPicture.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const downloadCommentButton = bigPicture.querySelector('.social__comments-loader');
let commentDownload = 0;

const clearBigPictureCommentsList = () => {
  bigPictureCommentsList.innerHTML = '';
};
clearBigPictureCommentsList();

const closesPressingEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

let numberCommentAll;
let thisComments;

const addComment = (data) => {
  const commentItem = bigPictureComment.cloneNode(true);
  const commentItemImg = commentItem.querySelector('.social__picture');
  const commentItemP = commentItem.querySelector('.social__text');
  commentItemImg.src = data.avatar;
  commentItemImg.alt = data.name;
  commentItemP.textContent = data.message;
  return commentItem;
};

const loadComments = () => {
  const commentsWill = commentDownload + 5;
  const newComment = (commentDownloads) => addComment(thisComments[commentDownloads]);
  if (commentsWill >= numberCommentAll) {
    while (commentDownload < numberCommentAll) {
      bigPictureCommentsList.appendChild(newComment(commentDownload));
      commentDownload++;
    }
    downloadCommentButton.classList.add('hidden');
    document.querySelector('.social__comment-count').textContent = `${commentDownload} из ${numberCommentAll}`;
    downloadCommentButton.removeEventListener('click', loadComments);
    return;
  }
  for (commentDownload; commentDownload < commentsWill; commentDownload++) {
    bigPictureCommentsList.appendChild(newComment(commentDownload));
  }
  document.querySelector('.social__comment-count').textContent = `${commentDownload} из ${numberCommentAll}`;
};

export const bigPictureOpen = (dataPhoto) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = dataPhoto.url;
  bigPictureLikes.textContent = dataPhoto.likes;
  bigPictureCommentsNumber.textContent = dataPhoto.comments.length;
  bigPictureDescription.textContent = dataPhoto.description;

  numberCommentAll = dataPhoto.comments.length;
  thisComments = dataPhoto.comments;

  if (numberCommentAll <= 5) {
    thisComments.forEach((data) => {
      commentDownload++;
      const newComment = addComment(data);
      bigPictureCommentsList.appendChild(newComment);
    });
    downloadCommentButton.classList.add('hidden');
  } else {
    for (commentDownload = 0; commentDownload < 5; commentDownload++) {
      const newComment = addComment(thisComments[commentDownload]);
      bigPictureCommentsList.appendChild(newComment);
    }
    downloadCommentButton.classList.remove('hidden');
  }

  document.querySelector('.social__comment-count').textContent = `${commentDownload} из ${numberCommentAll}`;

  body.classList.add('modal-open');
  document.addEventListener('keydown', closesPressingEsc);
  downloadCommentButton.addEventListener('click', loadComments);
};

function bigPictureClose() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  clearBigPictureCommentsList();
  document.removeEventListener('keydown', closesPressingEsc);
  downloadCommentButton.removeEventListener('click', loadComments);
}

bigPictureCloseButton.addEventListener('click', () => {
  bigPictureClose();
});

