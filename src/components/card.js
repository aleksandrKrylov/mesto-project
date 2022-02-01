const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
  ]; 
  const cardsTemplate = document.querySelector("#card").content;
  const cards = document.querySelector(".cards");
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
        openPopup(popupImg); 
    })
}

function addCards() {
    initialCards.forEach((data) => {
        const card = cardsTemplate.querySelector(".card").cloneNode(true);
        card.querySelector(".card__img").src = `${data.link}`;
        card.querySelector(".card__title").textContent = `${data.name}`;
        cards.prepend(card);
        addEventCard(card);
    })
}

function addCard(link, title) {
        const card = cardsTemplate.querySelector(".card").cloneNode(true);
        card.querySelector(".card__img").src = `${link}`;
        card.querySelector(".card__title").textContent = `${title}`;
        cards.append(card);
        addEventCard(card);
        
}

import { openPopup } from './utils.js';
export { addCards,  addCard };