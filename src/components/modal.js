const userName = document.querySelector(".profile__name");
const userActivity = document.querySelector(".profile__activity");
const inputName = document.querySelector(".form__input_type_name");
const inputActivity = document.querySelector(".form__input_type_activity");

function infoProfileForm () {
    inputName.value = userName.textContent;
    inputActivity.value = userActivity.textContent;
}


function saveProfileInfo ( ) {
    userName.textContent = inputName.value;
    userActivity.textContent = inputActivity.value;
}

export { infoProfileForm, saveProfileInfo };