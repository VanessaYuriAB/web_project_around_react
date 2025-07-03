function NewCard() {
  return (
    <form
      className="popup__container_add"
      name="add"
      id="new-card-form"
      noValidate
    >
      <h3 className="popup__title-form_add">Novo local</h3>
      <input
        className="popup__input-form_add"
        id="place-input"
        name="place"
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className="popup__input-error_add place-input-error"
        id="card-name-error"
      ></span>
      <input
        className="popup__input-form_add"
        id="link-input"
        name="link"
        type="url"
        placeholder="Link de imagem"
        required
      />
      <span
        className="popup__input-error_add link-input-error"
        id="card-link-error"
      ></span>
      <button
        className="popup__btn-form_add"
        type="submit"
        aria-label="Adicionar cartão"
      >
        Criar
      </button>
    </form>
  );
}

export default NewCard;
