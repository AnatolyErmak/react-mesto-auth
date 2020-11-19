// Токен: 13de1ca2-8912-41c4-9088-2a3599664c41
// Идентификатор группы: cohort-14

class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._headers = options.headers;
    }

    postNewCard(formData) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: formData.name,
                    link: formData.link
                })
            })
            .then(handleResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
                headers: this._headers
            })
            .then(handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                headers: this._headers
            })
            .then(handleResponse)
    }

    setUserInfo(newUserData) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: newUserData.name,
                    about: newUserData.about
                })
            })
            .then(handleResponse)
    }

    setUserAvatar(newUserData) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: newUserData.avatar
                })
            })
            .then(handleResponse)
    }

    putLike(cardId) {

        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(handleResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(handleResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(handleResponse)
    }
}

const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status} ${res.statusText}`);
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '13de1ca2-8912-41c4-9088-2a3599664c41',
        'Content-Type': 'application/json'
    }
})



export default api