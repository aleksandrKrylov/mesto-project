import './pages/index.css'; 

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

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");

const popups = document.querySelectorAll('.popup')

const formProfile = document.querySelector(".form_type_profile");
const formCardAdd = document.querySelector(".form_type_card");
const popupProfile = document.querySelector(".popup_type_profile");

const popupCard = document.querySelector(".popup_type_card");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");
const buttonFormCardAdd = document.querySelector(".form__button_card-add");

const cardsСontainer = document.querySelector(".cards");

const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__input", 
    inputInvalidClass: "form__input_validation", 
    buttonSelector: ".form__button",
    buttonDisabledClass: "form__button_validation"
};

import { openPopup,  closePopup } from './components/utils.js';
import { infoProfileForm, saveProfileInfo } from './components/modal.js';
import { enableValidation, disabledButton } from './components/validate.js';
import { createCard } from './components/card.js';

infoProfileForm ();
enableValidation(validationConfig);
initialCards.forEach(data => {
    cardsСontainer.append(createCard(data.link, data.name));
})

// Обработчики для формы профиля  
buttonProfileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
});

formProfile.addEventListener("submit", () => {
    saveProfileInfo();
    closePopup(popupProfile);
});

// Обработчики для формы добавление карточек  
buttonAddCard.addEventListener("click", () => {
    openPopup(popupCard);
});

formCardAdd.addEventListener("submit", () => {
    cardsСontainer.prepend(createCard(inputLink.value,inputTitle.value));
    inputTitle.value = "";
    inputLink.value = "";
    disabledButton(buttonFormCardAdd, validationConfig.buttonDisabledClass)
    closePopup(popupCard);
})

// Обработчики для закрытие попапа кликом на оверлей и на крестик
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
});
