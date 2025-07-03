function EditProfile() {
  return (
    <form
      className="popup__container_edt"
      name="edt"
      id="edit-profile-form"
      noValidate
    >
      <h3 className="popup__title-form_edt">Editar perfil</h3>
      <input
        className="popup__input-form_edt"
        id="name-input"
        name="name"
        type="text"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup__input-error_edt name-input-error"
        id="profile-name-error"
      ></span>
      <input
        className="popup__input-form_edt"
        id="about-input"
        name="about"
        type="text"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__input-error_edt about-input-error"
        id="profile-about-error"
      ></span>
      <button
        className="popup__btn-form_edt"
        type="submit"
        aria-label="Atualizar infos do perfil"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
