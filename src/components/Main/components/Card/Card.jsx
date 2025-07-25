import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';
import DeleteConfirmation from '../Popup/components/DeleteConfirmation/DeleteConfirmation.jsx';

import { useContext } from 'react';

import CurrentUserContext from '../../../../contexts/CurrentUserContext.js';

function Card({
  card,
  handleOpenPopup,
  handleClosePopup,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Desestruturação do objeto card para obter as propriedades necessárias
  const { name, link, isLiked } = card;

  // Verifica se o usuário atual “curtiu” o cartão: se isLiked for true, a classe 'card__like-button_is-active' será aplicada para mostrar que o botão está no status "curtir", se for false, nenhuma classe adicional será aplicada.
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' : ''
  }`;

  // Cria um objeto para o popup de imagem, que será passado para a função handleOpenPopup, o popup de imagem recebe o card atual para exibir a imagem e o nome, a função handleOpenPopup é chamada quando a imagem do cartão é clicada
  const imagePopup = { children: <ImagePopup card={card} /> };

  // Cria objeto para popup de confirmação de exclusão, passado à função handleOpenPopup, o popup de confirmação recebe a função de fechar o popup, a função de deletar o popup e o objeto com os dados do card
  const deleteConfirmationPopup = {
    children: (
      <DeleteConfirmation
        handleCardDelete={onCardDelete}
        handleClosePopup={handleClosePopup}
        handleCardDelete={onCardDelete}
        card={card}
      />
    ),
  };
  function handleLikeClick() {
    onCardLike(card);
  }

  // Função para lidar com o clique no botão de deletar cartão: ela chama a função onCardDelete, que é passada como prop, passando o cartão atual como argumento; isso permite que o componente pai (Main) gerencie a lógica de deletar o cartão e atualize o estado dos cartões; a função onCardDelete é definida no componente Main e é responsável por enviar a solicitação para a API
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="image card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />
      <button
        className="trash-btn card__trash-btn"
        id="tsh-model"
        type="button"
        aria-label="Deletar cartão"
        onClick={() => {
          handleOpenPopup(deleteConfirmationPopup);
        }}
      ></button>
      <div className="text card__text">
        <h3 className="name card__name">{name}</h3>
        <button
          // Botão de curtir/descurtir cartão, que recebe a classe conforme estado, definido na variável cardLikeButtonClassName, para aplicar o estilo correto
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Curtir/descurtir cartão"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}

export default Card;
