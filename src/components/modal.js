import { popupProfile } from './constants.js';
import { closePopup } from './utils.js';
import { editingProfile } from './api.js';
import { buttonProfile } from './constants';

function renderLoading(isLoading, element) {
    if(isLoading) {
      element.textContent = "Сохранение...";
    }
    else {
      element.textContent = "Cохранить";
    }
  }

function saveProfileInfo (inputuserName,  inputuserAbou, userName, userAbou) {
    renderLoading(true, buttonProfile);
    editingProfile(inputuserName.value, inputuserAbou.value)
      .then((user) => {
        userName.textContent = user.name;
        userAbou.textContent = user.about;
        closePopup(popupProfile);
        })
        .catch(err => console.log(err))
        .finally (() => {            
            renderLoading(false, buttonProfile);
        });
}

export { saveProfileInfo, renderLoading };

