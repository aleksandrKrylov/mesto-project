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

const userName = document.querySelector(".profile__name");
const userActivity = document.querySelector(".profile__activity");

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");

const popupProfile = document.querySelector(".popup_type_profile");
const formProfile = document.querySelector(".form_type_profile");
const inputName = document.querySelector(".form__input_type_name");
const inputActivity = document.querySelector(".form__input_type_activity");
const buttonFormSaveProfile = document.querySelector(".form__button_profile");

const popupCard = document.querySelector(".popup_type_card");
const formCard = document.querySelector(".form_type_card");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");
const buttonFormCardAdd = document.querySelector(".form__button_card-add");

const popupImg = document.querySelector(".popup_type_img");
const enlargedViewImg = document.querySelector(".enlarged-view__img");
const figcaption = document.querySelector(".enlarged-view__title");

const cards = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#card").content;



function openPopup (popup) {
    popup.classList.add("popup_opened");
}

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}
//Функции для открытие/закрытия форм


function infoProfileForm () {
    inputName.value = userName.textContent;
    inputActivity.value = userActivity.textContent;
}

function saveProfileInfo () {
    userName.textContent = inputName.value;
    userActivity.textContent = inputActivity.value;
}
// Функции для редактирование профиля



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

addCards();
// Функции для карточек



buttonProfileEdit.addEventListener("click", () => {
    infoProfileForm();
    openPopup(popupProfile);
});

popupProfile.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupProfile);
});

buttonFormSaveProfile.addEventListener("click", () => {
    saveProfileInfo();
    closePopup(popupProfile);
});
// Обработчики для формы профиля  



buttonAddCard.addEventListener("click", () => {
    inputTitle.value = "";
    inputLink.value = "";
    openPopup(popupCard);
});

popupCard.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupCard);
});

buttonFormCardAdd.addEventListener("click", () => {
    addCard(inputLink.value,inputTitle.value);
    closePopup(popupCard);
})
// Обработчики для формы добавление карточек  



popupImg.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popupImg);
});



formProfile.addEventListener("submit", (event) => {
    event.preventDefault();
})
formCard.addEventListener("submit", (event) => {
    event.preventDefault();
})