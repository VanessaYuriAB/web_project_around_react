import { useContext } from 'react';

import Popup from './components/Popup/Popup';

import NewCard from './components/Popup/components/NewCard/NewCard';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';

import Card from './components/Card/Card';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    children: <NewCard handleClosePopup={onClosePopup} popup={popup} />,
  };

  // este componente de popup não precisa da prop 'popup' para verificação pq o popup é aberto com as informações do perfil preenchidas nos campos, não há reset na validação
  const editProfilePopup = {
    children: <EditProfile handleClosePopup={onClosePopup} />,
  };

  const editAvatarPopup = {
    children: <EditAvatar handleClosePopup={onClosePopup} popup={popup} />,
  };

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="photo profile__photo">
          {/* foto configurada pelo css, como background-image, antes de conectar com as infos da API*/}
          <img
            src={currentUser.avatar}
            alt="____Foto____"
            className="profile__photo_img"
          />
          <button
            aria-label="Alterar foto do perfil"
            className="photo profile__photo_overlay"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="infos profile__infos">
          {/*o "nome" e "sobre" são obtidos do contexto CurrentUserContext*/}
          <h1 className="name infos__name">{currentUser.name}</h1>
          <button
            aria-label="Alterar informações do perfil"
            className="edit-btn infos__edit-btn"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <h2 className="about infos__about">{currentUser.about}</h2>
        </div>
        <button
          aria-label="Adicionar novo cartão"
          type="button"
          className="add-btn profile__add-btn"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="elements content__elements">
        <ul className="cards elements__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              handleClosePopup={onClosePopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* se o popup não for nulo, o componente será renderizado na tela */}
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
    </main>
  );
}

export default Main;
