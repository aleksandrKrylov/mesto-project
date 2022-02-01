import './pages/index.css'; 

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");

const popupProfile = document.querySelector(".popup_type_profile");
const buttonFormSaveProfile = document.querySelector(".form__button_profile");

const popupCard = document.querySelector(".popup_type_card");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");
const buttonFormCardAdd = document.querySelector(".form__button_card-add");
const popupImg = document.querySelector(".popup_type_img");

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
import { addCards,  addCard } from './components/card.js';

infoProfileForm ();
enableValidation(validationConfig);
addCards();

// Обработчики для формы профиля  
buttonProfileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
});

popupProfile.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupProfile);
});

buttonFormSaveProfile.addEventListener("click", () => {
    saveProfileInfo();
    closePopup(popupProfile);
});

// Обработчики для формы добавление карточек  
buttonAddCard.addEventListener("click", () => {
    openPopup(popupCard);
});

popupCard.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupCard);
});

buttonFormCardAdd.addEventListener("click", () => {
    addCard(inputLink.value,inputTitle.value);
    inputTitle.value = "";
    inputLink.value = "";
    disabledButton(buttonFormCardAdd, validationConfig.buttonDisabledClass)
    closePopup(popupCard);
})

// Обработчик для формы с карточкой  
popupImg.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupImg);
});

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
    //Закрытие попапа кликом на оверлей
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
    //Закрытие попапа нажатием на Esc
    document.addEventListener('keydown', function (evt) {
        if (evt.key == 'Escape') {
            closePopup(popup);
        }
      }); 
});
