import { myCards } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // método (privado) para tratamento das respostas dos métodos da classe
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}.`);
    // se o servidor retornar um erro, rejeite a promessa
  }

  // carrega as informações de usuário do servidor
  getServerUserInfos() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers, // a solicitação GET é enviada com content-type, mas não interfere no resultado
    }).then((res) => this._checkResponse(res));
  }

  // envia meus cards iniciais ao usuário do servidor
  createInitialCards() {
    const promises = myCards.map((card) => {
      return fetch(`${this._baseUrl}/cards/`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.place, // o nome do input e em myCards é place
          link: card.link,
        }),
      }).then((res) => this._checkResponse(res));
    });

    return Promise.all(promises); // retorna uma Promise que só resolve quando todos forem enviados
  }

  // captura cards iniciais do usuário do servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // atualiza infos do perfil
  updateProfileInfo(dataProfile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataProfile.name,
        about: dataProfile.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // atualiza foto do perfil
  updateProfileAvatar(dataPhoto) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataPhoto,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // adiciona um novo cartão no usuário do servidor
  createNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name, // o nome do input e em NewCard.jsx é place, mas o servidor espera name
        link: dataCard.link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // curte um cartão
  _likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // descurte um cartão
  _unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // altera o status de curtir/descurtir um cartão
  toggleLikeCard(cardId, shouldLike) {
    // se o cartão não foi curtido, curta-o, caso contrário, descurta
    return shouldLike ? this._likeCard(cardId) : this._unlikeCard(cardId);
  }

  // deleta um cartão do servidor
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // captura cartões somente após carregar as informações do usuário no servidor
  getServerUserAndCards() {
    return Promise.all([this.getServerUserInfos(), this.getInitialCards()]);
  }
}

// instância de Api: myApi (fetch)
const myApi = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: '3c7ad9a7-200c-4d07-b160-7978cd40d815',
    'Content-Type': 'application/json',
  },
});

export default myApi;
