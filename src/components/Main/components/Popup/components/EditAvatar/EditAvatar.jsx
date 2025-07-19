import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../../../contexts/CurrentUserContext.js';

function EditAvatar({ handleClosePopup }) {
  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext, permitindo que o componente acesse as informações do usuário atual, como foto do perfil
  const userContext = useContext(CurrentUserContext); // extrai o contexto do usuário atual
  const { currentUser, handleUpdateAvatar } = userContext; // extrai o usuário atual e a função de atualização do avatar do contexto

  // Cria uma referência para o input de foto, permitindo acessar diretamente o elemento DOM
  const avatarInputRef = useRef();

  // Função para lidar com o envio do formulário: chama a função de atualização do avatar com o valor do input de foto e fecha o popup após a atualização
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleUpdateAvatar(avatarInputRef.current.value); // chama a função de atualização do avatar com o valor atual do input de foto
      handleClosePopup(); // fecha o popup após a atualização, só fecha se a atualização for bem-sucedida
    } catch (error) {
      console.error(`Erro ao atualizar a foto do perfil: ${error}`);
    }
  };

  return (
    <form
      className="popup__container_photo"
      name="photo"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit} // define o manipulador de envio do formulário para chamar a função handleSubmit
    >
      <h3 className="popup__title-form_photo">Alterar a foto do perfil</h3>
      <input
        className="popup__input-form_photo"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
        ref={avatarInputRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
        defaultValue={currentUser.avatar || ''} // usa o valor atual do avatar do usuário como valor inicial do input, garantindo que o input seja preenchido com a foto atual quando aberto
        aria-label="Link da foto do perfil"
      />
      <span
        className="popup__input-error_photo photo-input-error"
        id="avatar-photo-error"
      ></span>
      <button className="popup__btn-form_photo" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
