import './pages/index.css'; 

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const formProfile = document.querySelector(".form_type_profile");
const popupProfile = document.querySelector(".popup_type_profile");
const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__activity");
const inputuserName = document.querySelector(".form__input_type_name");
const inputuserAbou = document.querySelector(".form__input_type_activity");

const buttonAddCard = document.querySelector(".profile__button-add");
const formCardAdd = document.querySelector(".form_type_card");
const popupCard = document.querySelector(".popup_type_card");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");
const buttonFormCardAdd = document.querySelector(".form__button_card-add");

const profileAvatar = document.querySelector(".profile__avatar-overlay");
const popupAvatar = document.querySelector(".popup_type_avatar");
const imgAvatar = document.querySelector(".profile__img");
const inputLinkAvatar = document.querySelector(".form__input_type_link-avatar");
const formAvatar = document.querySelector(".form_type_avatar");
const formButtonAvatar = document.querySelector(".form__button_avatar");

const popups = document.querySelectorAll('.popup')
const cardsСontainer = document.querySelector(".cards");
const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__input", 
    inputInvalidClass: "form__input_validation", 
    buttonSelector: ".form__button",
    buttonDisabledClass: "form__button_validation"
};

import { openPopup,  closePopup } from './components/utils.js';
import { saveProfileInfo, renderLoading } from './components/modal.js';
import { enableValidation, disabledButton } from './components/validate.js';
import { createCard } from './components/card.js';
import { getAppInfo, addLike, deleteLike, addCard, deleteCard, updateAvatar } from './components/api.js';

enableValidation(validationConfig);

function handleCardLike(cardElement, cardId, isLiked) {
  if (isLiked) {
    deleteLike(cardId)
      .then((res) => {
        cardElement.querySelector(".card__counter-like").textContent = res.likes.length.toString();
      })
      .catch(err => console.log(err));
  } else {
    addLike(cardId)
      .then((res) => {
        cardElement.querySelector(".card__counter-like").textContent = res.likes.length.toString();
      })
      .catch(err => console.log(err));
  }
};

function handleCardDelete(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();

    })
    .catch(err => console.log(err));
};

getAppInfo()
  .then(([user, cards]) => {
    cards.forEach(card => {
      cardsСontainer.prepend(createCard(card, user._id, handleCardLike,  handleCardDelete));
    })
    imgAvatar.style.backgroundImage = `url(${user.avatar})`;
    userName.textContent = user.name;
    userAbout.textContent = user.about;
    inputuserName.value = user.name;
    inputuserAbou.value = user.about;
    enableValidation(validationConfig);
  })
  .catch(err => console.log(err));

buttonProfileEdit.addEventListener("click", () => openPopup(popupProfile));
profileAvatar.addEventListener("click", () => openPopup(popupAvatar));
buttonAddCard.addEventListener("click", () => {openPopup(popupCard)});

formProfile.addEventListener("submit", () => saveProfileInfo(inputuserName, inputuserAbou, userName, userAbout));

formCardAdd.addEventListener("submit", () => {
  renderLoading(true, buttonFormCardAdd)
  addCard(inputTitle.value, inputLink.value)
    .then((card) => {
      cardsСontainer.append(createCard(card, card.owner._id, handleCardLike, handleCardDelete));
    })
    .catch(err => console.log(err))
    .finally (() => {
      renderLoading(false, buttonFormCardAdd);
      closePopup(popupCard);
      inputTitle.value = "";
      inputLink.value = "";
      disabledButton(buttonFormCardAdd, validationConfig.buttonDisabledClass);
    });
})

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

formAvatar.addEventListener("submit", () => {
  updateAvatar(inputLinkAvatar.value)
    .then((user) => {
      imgAvatar.style.backgroundImage = `url(${user.avatar})`;
      inputLinkAvatar.value = "";
      disabledButton(formButtonAvatar, validationConfig.buttonDisabledClass)
    })
    .catch(err => console.log(err));
  closePopup(popupAvatar);
});