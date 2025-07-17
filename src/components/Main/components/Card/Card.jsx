import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';

function Card({ card, handleOpenPopup, onCardLike }) {
  // Desestruturação do objeto card para obter as propriedades necessárias
  const { name, link, isLiked } = card;

  // Verifica se o usuário atual “curtiu” o cartão: se isLiked for true, a classe 'card__like-button_is-active' será aplicada para mostrar que o botão está no status "curtir", se for false, nenhuma classe adicional será aplicada.
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' : ''
  }`;

  // Cria um objeto para o popup de imagem, que será passado para a função handleOpenPopup, o popup de imagem recebe o card atual para exibir a imagem e o nome, a função handleOpenPopup é chamada quando a imagem do cartão é clicada
  const imagePopup = { children: <ImagePopup card={card} /> };

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
      ></button>
      <div className="text card__text">
        <h3 className="name card__name">{name}</h3>
        <button
          // Botão de curtir/descurtir cartão, que recebe a classe conforme estado, definido na variável cardLikeButtonClassName, para aplicar o estilo correto
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Curtir/descurtir cartão"
          onClick={() => onCardLike(card)}
        ></button>
      </div>
    </li>
  );
}

export default Card;
