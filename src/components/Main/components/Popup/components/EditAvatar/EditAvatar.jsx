function EditAvatar() {
  return (
    <form
      className="popup__container_photo"
      name="photo"
      id="edit-avatar-form"
      noValidate
    >
      <input
        className="popup__input-form_photo"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
      />
      <span
        className="popup__input-error_photo photo-input-error"
        id="avatar-photo-error"
      ></span>
      <button
        className="popup__btn-form_photo"
        type="submit"
        aria-label="Atualizar foto de perfil"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
