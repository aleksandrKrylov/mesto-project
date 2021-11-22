const userName = document.querySelector(".profile__name");
const userActivity = document.querySelector(".profile__activity");

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");

const popupProfile = document.querySelector(".popup_type_profile");
const formProfile = document.querySelector(".form_type_profile");
const inputName = document.querySelector(".form__input_type_name");
const inputActivity = document.querySelector(".form__input_type_activity");
const buttonFormSaveProfile = document.querySelector(".form__button_profile");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_card");
const formCard = document.querySelector(".form_type_card");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");
const buttonFormCardAdd = document.querySelector(".form__button_card-add");
const buttonClosePopupCard = popupCard.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_img");
const enlargedViewImage = document.querySelector(".enlarged-view__img");
const popupImageCaption = document.querySelector(".enlarged-view__title");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");

const cardsСontainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#card").content;

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
//Функции для открытие/закрытия форм

function getProfileInfo() {
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
}

function saveProfileInfo() {
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopup(popupProfile);
}
// Функции для редактирование профиля

function createCard(title, link) {
  const card = cardsTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__img");
  const cardTitle = card.querySelector(".card__title");
  const cardButtonLike = card.querySelector(".card__button-like");
  const cardButtonDelete = card.querySelector(".card__button-delete");

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  cardButtonLike.addEventListener("click", () => { // Лайк для карточек
    cardButtonLike.classList.toggle("card__button-like_active");
  });
  cardButtonDelete.addEventListener("click", (evt) => { // Удаление карточки
    cardButtonDelete.closest(".card").remove();
  });
  cardImage.addEventListener("click", () => { // Открыть Popup для карточки
    enlargedViewImage.src = link;
    enlargedViewImage.alt = title;
    popupImageCaption.textContent = title;
    openPopup(popupImage);
  });
  return card;
}

function addCards() {
  initialCards.forEach((cardData) => {
    cardsСontainer.append(createCard(cardData.name, cardData.link));
  });
}

function addCard(title, link) {
  cardsСontainer.prepend(createCard(title, link));
  formCard.reset();
  closePopup(popupCard);
}

addCards();
// Функции для карточек

buttonProfileEdit.addEventListener("click", () => {
  getProfileInfo();
  openPopup(popupProfile);
});

buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfileInfo();
});
// Обработчики для формы профиля

buttonAddCard.addEventListener("click", () => {
  openPopup(popupCard);
});

buttonClosePopupCard.addEventListener("click", () => {
  closePopup(popupCard);
});

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard(inputTitle.value, inputLink.value);
});
// Обработчики для формы добавление карточек

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});