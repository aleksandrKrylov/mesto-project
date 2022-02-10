import '../pages/index.css'; 
import {
  buttonProfileEdit,
  formProfile,
  popupProfile,
  userName, 
  userAbout, 
  inputuserName, 
  inputuserAbou,
  buttonAddCard, 
  formCardAdd, 
  popupCard,
  inputTitle, 
  inputLink, 
  buttonFormCardAdd,
  profileAvatar, 
  popupAvatar, 
  imgAvatar, 
  inputLinkAvatar, 
  formAvatar, 
  formButtonAvatar, 
  popups, 
  cardsСontainer, 
  validationConfig
} from "./constants.js"
import { openPopup,  closePopup } from './utils.js';
import { saveProfileInfo, renderLoading } from './modal.js';
import { enableValidation, disabledButton } from './validate.js';
import { createCard } from './card.js';
import { getAppInfo, addLike, deleteLike, addCard, deleteCard, updateAvatar } from './api.js';

enableValidation(validationConfig);

function handleLikeClick(likeCounterElement, likeElement, cardId) {
  if (likeElement.classList.contains('card__button-like_active')) {
    deleteLike(cardId)
      .then((res) => {
        likeCounterElement.textContent = res.likes.length;
        likeElement.classList.toggle('card__button-like_active');
      })
      .catch(err => console.log(err));
  } else {
    addLike(cardId)
    .then((res) => {
      likeCounterElement.textContent = res.likes.length;
      likeElement.classList.toggle('card__button-like_active');
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
      cardsСontainer.append(createCard(card, user._id, handleLikeClick,  handleCardDelete));
    })
    imgAvatar.style.backgroundImage = `url(${user.avatar})`;
    userName.textContent = user.name;
    userAbout.textContent = user.about;
    inputuserName.value = user.name;
    inputuserAbou.value = user.about;
  })
  .catch(err => console.log(err));

buttonProfileEdit.addEventListener("click", () => openPopup(popupProfile));
profileAvatar.addEventListener("click", () => openPopup(popupAvatar));
buttonAddCard.addEventListener("click", () => openPopup(popupCard));
formProfile.addEventListener("submit", () => saveProfileInfo(inputuserName, inputuserAbou, userName, userAbout));

formCardAdd.addEventListener("submit", () => {
  renderLoading(true, buttonFormCardAdd);
  addCard(inputTitle.value, inputLink.value)
    .then((card) => {
      cardsСontainer.prepend(createCard(card, card.owner._id, handleLikeClick, handleCardDelete));
      inputTitle.value = "";
      inputLink.value = "";
      closePopup(popupCard);
      disabledButton(buttonFormCardAdd, validationConfig.buttonDisabledClass);
    })
    .catch(err => console.log(err))
    .finally (() => {
      renderLoading(false, buttonFormCardAdd);
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
  renderLoading(true, formButtonAvatar);
  updateAvatar(inputLinkAvatar.value)
    .then((user) => {
      imgAvatar.style.backgroundImage = `url(${user.avatar})`;
      inputLinkAvatar.value = "";
      disabledButton(formButtonAvatar, validationConfig.buttonDisabledClass)
      closePopup(popupAvatar);
    })
    .catch(err => console.log(err))
    .finally (() => {
      renderLoading(false, formButtonAvatar);
    });
});