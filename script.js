const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const buttonProfileEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");

const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');

const formButtonProfile = document.querySelector('.form__button_profile');
const form = document.querySelector('.form');

const inputName = document.querySelector('.form__input_type_name');
const inputActivity = document.querySelector('.form__input_type_activity');

const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card').content;
//----------------------- Переменные --------------------------/

function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

function infoProfile () {
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;
}

function saveProfileInfo () {
    profileName.textContent = inputName.value;
    profileActivity.textContent = inputActivity.value;
}

function addCards() {
    
    initialCards.forEach((info) => {
        const card = cardsTemplate.querySelector('.card').cloneNode(true);
        card.querySelector('.card__img').src = `${info.link}`;
        card.querySelector('.card__title').textContent = `${info.name}`;
        cards.append(card);
    })
}
//----------------------- Фенкции --------------------------/
addCards();

buttonProfileEdit.addEventListener('click', () => {
    infoProfile();
    openPopup(popupProfile);
});

popupProfile.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popupProfile)
});

formButtonProfile.addEventListener('click', () => {
    saveProfileInfo();
    closePopup(popupProfile)
});


buttonAddCard.addEventListener('click', () => {
    openPopup(popupCard);
});

popupCard.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(popupCard)
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
})
//----------------------- Обработчики события --------------------------/