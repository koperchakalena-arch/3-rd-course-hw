import { comments } from './comments-data.js';
import { escapeHTML } from './escape-html.js';

const nameInput = document.querySelector('.add-form-name');
const commentInput = document.querySelector('.add-form-text');
const commentList = document.querySelector('.comments');

export function renderComments() {
  let html = '';

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    let likeClass = 'like-button';
    if (comment.isLiked) {
      likeClass = 'like-button -active-like';
    }

    html += `
      <li class="comment" data-index="${i}">
        <div class="comment-header">
          <div>${escapeHTML(comment.name)}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${escapeHTML(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${likeClass}" data-index="${i}"></button>
          </div>
        </div>
      </li>
    `;
  }

  commentList.innerHTML = html;

  const likeButtons = document.querySelectorAll('.like-button');
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function (event) {
      event.stopPropagation();

      const index = likeButtons[i].dataset.index;

      if (comments[index].isLiked) {
        comments[index].isLiked = false;
        comments[index].likes = comments[index].likes - 1;
      } else {
        comments[index].isLiked = true;
        comments[index].likes = comments[index].likes + 1;
      }

      renderComments();
    });
  }

  const commentElements = document.querySelectorAll('.comment');
  for (let i = 0; i < commentElements.length; i++) {
    commentElements[i].addEventListener('click', function () {
      const index = commentElements[i].dataset.index;
      nameInput.value = comments[index].name;
      commentInput.value =
        '> ' + comments[index].text + '\n' + comments[index].name + ', ';
      commentInput.focus();
    });
  }
}
