function EditProfile() {
  return (
    <form
      className="popup-edt__container"
      name="edt"
      id="edit-profile-form"
      noValidate
    >
      <input
        className="popup-edt__input-form"
        id="name-input"
        name="name"
        type="text"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className="popup-edt__input-error name-input-error"
        id="profile-name-error"
      ></span>
      <input
        className="popup-edt__input-form"
        id="about-input"
        name="about"
        type="text"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup-edt__input-error about-input-error"
        id="profile-about-error"
      ></span>
      <button
        className="popup-edt__btn-form"
        type="submit"
        aria-label="Atualizar infos do perfil"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
