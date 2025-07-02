function NewCard() {
  return (
    <form
      className="popup-add__container"
      name="add"
      id="new-card-form"
      noValidate
    >
      <input
        className="popup-add__input-form"
        id="place-input"
        name="place"
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className="popup-add__input-error place-input-error"
        id="card-name-error"
      ></span>
      <input
        className="popup-add__input-form"
        id="link-input"
        name="link"
        type="url"
        placeholder="Link de imagem"
        required
      />
      <span
        className="popup-add__input-error link-input-error"
        id="card-link-error"
      ></span>
      <button
        className="popup-add__btn-form"
        type="submit"
        aria-label="Adicionar cartão"
      >
        Criar
      </button>
    </form>
  );
}

export default NewCard;
