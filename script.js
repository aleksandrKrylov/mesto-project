const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const buttonProfileEdit = document.querySelector(".profile__button-edit");

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');
const form = document.querySelector('.form');

const inputName = document.querySelector('.form__input_type_name');
const inputActivity = document.querySelector('.form__input_type_activity');
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
//----------------------- Фенкции --------------------------/

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
