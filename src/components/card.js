const cardsTemplate = document.querySelector("#card").content;
const enlargedViewImg = document.querySelector(".enlarged-view__img");
const figcaption = document.querySelector(".enlarged-view__title");
const popupImg = document.querySelector(".popup_type_img");
  
function addEventCard(card) {
    card.querySelector(".card__button-like").addEventListener("click", (evt) => { // Лайк для карточек
        evt.target.classList.toggle("card__button-like_active")  
    })
    card.querySelector(".card__button-delete").addEventListener("click", (evt) => { // Удаление карточки
        evt.target.parentNode.remove();
    })
    card.querySelector(".card__img").addEventListener("click", (evt) => { // Открыть Popup для карточки
        enlargedViewImg.src = `${evt.target.getAttribute("src")}`; 
        figcaption.textContent = card.querySelector(".card__title").textContent;
        enlargedViewImg.alt = figcaption.textContent;
        openPopup(popupImg); 
    })
}

function createCard(link, title) {
        const card = cardsTemplate.querySelector(".card").cloneNode(true);
        card.querySelector(".card__img").src = `${link}`;
        card.querySelector(".card__title").textContent = `${title}`;
        card.querySelector(".card__img").alt = `${title}`;
        addEventCard(card);
        return card;
}

import { openPopup } from './utils.js';
export { createCard };