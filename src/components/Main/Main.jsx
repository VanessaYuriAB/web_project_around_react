import { useState, useEffect, useContext } from 'react';

import Popup from './components/Popup/Popup';

import NewCard from './components/Popup/components/NewCard/NewCard';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';

import Card from './components/Card/Card';

import myApi from '../../utils/api.js';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';

/*
Linha comentada para prevenir duplicação ao enviar cards iniciais. Executar apenas uma vez, quando necessário enviar os dados para a API.
// envia meus cards iniciais
// myApi.submitMyNewCards();
*/

function Main() {
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    myApi
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(`Erro ao obter os cartões iniciais: ${err}`);
      });
  }, []);

  const newCardPopup = {
    children: <NewCard />,
  };

  const editProfilePopup = {
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    children: <EditAvatar />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // Função para lidar com o evento de curtir/descurtir um cartão: ela recebe o cartão atual como argumento e verifica se ele já foi curtido ou não, se o cartão já foi curtido, a função envia uma solicitação para a API para remover o like, caso contrário, envia uma solicitação para adicionar o like - após a solicitação, atualiza o estado dos cartões com os dados retornados pela API

  async function handleCardLike(card) {
    // Verifica, mais um vez, se o cartão já foi curtido - é verificado no componente Card, mas é uma boa prática verificar novamente aqui
    const isLiked = card.isLiked;

    // Envia uma solicitação para a API e obtém os dados do cartão atualizados
    await myApi
      // !isLiked = ação inversa do estado atual de curtida - corresponde à shouldLike no método toggleLikeCard
      .toggleLikeCard(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((stateCards) =>
          stateCards.map((currentCardInMap) =>
            currentCardInMap._id === card._id ? updatedCard : currentCardInMap
          )
        );
      })
      .catch((error) =>
        console.error(`Erro ao curtir/descurtir o cartão: ${error}`)
      );
  }

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="photo profile__photo">
          {/* foto configurada pelo css, como background-image, antes de conectar com as infos da API*/}
          <img
            src={currentUser.avatar}
            alt="Foto do perfil"
            className="profile__photo_img"
          />

          {/* Tag img adicionada para a foto de perfil, conectada com a API. Verificar configurações após ajustar envio de POST para dados de perfil. */}

          <button
            aria-label="Alterar foto do perfil"
            className="photo profile__photo_overlay"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="infos profile__infos">
          {/*o "nome" e "sobre" são obtidos do contexto CurrentUserContext*/}
          <h1 className="name infos__name">{currentUser.name}</h1>
          <button
            aria-label="Alterar informações do perfil"
            className="edit-btn infos__edit-btn"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <h2 className="about infos__about">{currentUser.about}</h2>
        </div>
        <button
          aria-label="Adicionar novo cartão"
          type="button"
          className="add-btn profile__add-btn"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="elements content__elements">
        <ul className="cards elements__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              onCardLike={handleCardLike}
            />
          ))}
        </ul>
      </section>

      {/* se o popup não for nulo, o componente será renderizado na tela */}
      {popup && <Popup onClose={handleClosePopup}>{popup.children}</Popup>}
    </main>
  );
}

export default Main;
