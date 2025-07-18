import { useState } from 'react';

import Popup from './components/Popup/Popup';

import NewCard from './components/Popup/components/NewCard/NewCard';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';

import Card from './components/Card/Card';

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

function Main() {
  const [popup, setPopup] = useState(null);

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

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="photo profile__photo">
          {/* foto configurada pelo css, como background-image */}
          <button
            aria-label="Alterar foto do perfil"
            className="photo profile__photo_overlay"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="infos profile__infos">
          <h1 className="name infos__name">Vanessa</h1>
          <button
            aria-label="Alterar informações do perfil"
            className="edit-btn infos__edit-btn"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <h2 className="about infos__about">
            Desenvolvedora web (full-stack)
          </h2>
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
