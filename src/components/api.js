const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '79024d29-85c4-4423-a758-043ae3470965',
      'Content-Type': 'application/json'
    }
};
  
function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
 
function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => getResponseData(res));
};
  
function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => getResponseData(res));
};

function editingProfile(dataName, dataAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
          name: dataName,
          about: dataAbout,
        })
    })
    .then(res => getResponseData(res));
}

function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => getResponseData(res));
};

function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => getResponseData(res));
}

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => getResponseData(res));
}

function addCard(dataName, dataLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name: dataName,
          link: dataLink
        })
    })
    .then(res => getResponseData(res));
};

function updateAvatar(dataLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: dataLink
        })
    })
    .then(res => getResponseData(res));
};

function getAppInfo() {
    return Promise.all([getUser(), getCards()]);
};

export { getAppInfo, addLike, deleteLike, addCard, deleteCard, editingProfile, updateAvatar };