import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../../../contexts/CurrentUserContext.js';

function EditProfile() {
  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext, permitindo que o componente acesse as informações do usuário atual, como nome e descrição
  const currentUser = useContext(CurrentUserContext);

  // Define o estado inicial do formulário com os valores do usuário atual, garantindo que o formulário seja preenchido com as informações corretas quando aberto
  const [name, setName] = useState(currentUser.name); // adiciona variável de estado para nome e usa o nome do usuário atual como valor inicial do estado
  const [about, setAbout] = useState(currentUser.about); // adiciona variável de estado para descrição e usa a descrição do usuário atual como valor inicial do estado

  function handleNameChange(event) {
    setName(event.target.value); // atualiza o nome (name) quando a entrada for alterada
  }

  function handleAboutChange(event) {
    setAbout(event.target.value); // atualiza a descrição (about) quando a entrada for alterada
  }

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
        value={name} // vincula nome ao campo de entrada, usando o valor do estado 'name' para preenchê-lo
        onChange={handleNameChange}
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
        value={about} // vincula descrição ao campo de entrada, usando o valor do estado 'about' para preenchê-lo
        onChange={handleAboutChange}
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
