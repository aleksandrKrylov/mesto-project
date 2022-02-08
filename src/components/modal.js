function renderLoading(isLoading, element) {
    if(isLoading) {
      element.textContent = "Сохранение...";
    }
    else {
      element.textContent = "Cохранить";
    }
  }

function saveProfileInfo (inputuserName,  inputuserAbou, userName, userAbou) {
    renderLoading(true, document.querySelector(".form__button_profile"));
    editingProfile(inputuserName.value, inputuserAbou.value)
      .then((user) => {
        userName.textContent = user.name;
        userAbou.textContent = user.about;
        })
        .catch(err => console.log(err))
        .finally (() => {            
            closePopup(document.querySelector(".popup_type_profile"));
            renderLoading(false, document.querySelector(".form__button_profile"));
        });
}

import { closePopup } from './utils.js';
import { editingProfile } from './api.js';
export { saveProfileInfo, renderLoading };

