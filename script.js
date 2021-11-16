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

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');
const form = document.querySelector('.form');

const inputName = document.querySelector('.form__input_type_name');
const inputActivity = document.querySelector('.form__input_type_activity');

const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card').content;
//----------------------- Переменные --------------------------/

function openAndClose () {
    popup.classList.toggle('popup_opened');
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

popupClose.addEventListener('click', openAndClose);

form.addEventListener('submit', (event) => {event.preventDefault();})

buttonProfileEdit.addEventListener('click', () => {
    openAndClose();
    infoProfile();
});

formButton.addEventListener('click', () => {
    saveProfileInfo();
    openAndClose()
});
//----------------------- Обработчики события --------------------------/