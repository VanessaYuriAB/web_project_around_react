import ImagePopup from '../Popup/components/ImagePopup/ImagePopup';

function Card({ card, handleOpenPopup }) {
  const { name, link, isLiked } = card;

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
          className="like-btn card__like-btn"
          type="button"
          aria-label="Curtir/descurtir cartão"
        ></button>
      </div>
    </li>
  );
}

export default Card;
