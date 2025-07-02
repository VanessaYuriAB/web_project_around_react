function EditAvatar() {
  return (
    <form
      className="popup-photo__container"
      name="photo"
      id="edit-avatar-form"
      noValidate
    >
      <input
        className="popup-photo__input-form"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
      />
      <span
        className="popup-photo__input-error photo-input-error"
        id="avatar-photo-error"
      ></span>
      <button
        className="popup-photo__btn-form"
        type="submit"
        aria-label="Atualizar foto de perfil"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
