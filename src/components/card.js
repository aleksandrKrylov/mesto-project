const enlargedViewImg = document.querySelector(".enlarged-view__img");
const figcaption = document.querySelector(".enlarged-view__title");
const popupImg = document.querySelector(".popup_type_img");

function handlePopupImgClick(card) {
    card.querySelector(".card__img").addEventListener("click", (evt) => { // Открыть Popup для карточки
        enlargedViewImg.src = `${evt.target.getAttribute("src")}`; 
        figcaption.textContent = card.querySelector(".card__title").textContent;
        enlargedViewImg.alt = figcaption.textContent;
        openPopup(popupImg); 
    })
}

function createCard({name, link, likes, _id, owner}, currentUserId, handleLikeClick,  handleDeleteClick) {
    const cardElement = document.querySelector('#card').content.querySelector('.card').cloneNode(true);
    const imgElement = cardElement.querySelector(".card__img");
    const likeCounterElement = cardElement.querySelector(".card__counter-like");
    const likeElement = cardElement.querySelector(".card__button-like");
    const deleteElement = cardElement.querySelector(".card__button-delete");

    imgElement.src = `${link}`;
    imgElement.alt = `${name}`;
    cardElement.querySelector(".card__title").textContent = `${name}`;
    likeCounterElement.textContent = likes.length.toString();

    if(owner._id == currentUserId) {
        deleteElement.classList.remove("card__button-delete_hidden");
    }

    let isLiked = Boolean(likes.find(user => user._id === currentUserId));
    if (isLiked) {
        likeElement.classList.add('card__button-like_active');
    }
    likeElement.addEventListener('click', () => {
        handleLikeClick(cardElement, _id, isLiked);
        isLiked = !isLiked;
        likeElement.classList.toggle('card__button-like_active');
    });

    deleteElement.addEventListener('click', () => handleDeleteClick(cardElement, _id));
    handlePopupImgClick(cardElement)
    return cardElement;
  };

import { openPopup } from './utils.js';
export { createCard };