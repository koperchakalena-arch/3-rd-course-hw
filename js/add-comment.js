import { comments } from './comments-data.js';
import { getDate } from './date.js';
import { renderComments } from './render-comments.js';

const nameInput = document.querySelector('.add-form-name');
const commentInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

export function initAddComment() {
    addButton.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const text = commentInput.value.trim();

        if (name === '' || text === '') {
            alert('Заполните оба поля!');
            return;
        }

        comments.push({
            name: name,
            date: getDate(),
            text: text,
            likes: 0,
            isLiked: false,
        });

        nameInput.value = '';
        commentInput.value = '';

        renderComments();
    });
}