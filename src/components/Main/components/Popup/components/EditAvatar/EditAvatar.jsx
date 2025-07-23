import { useRef, useContext, useEffect } from 'react';

import CurrentUserContext from '../../../../../../contexts/CurrentUserContext.js';

import useFormValidator from '../../../../../../hooks/useFormValidator.js';

import { configPhoto } from '../../../../../../utils/constants.js';

function EditAvatar({ handleClosePopup, popup }) {
  // validação do formulário
  const { formRef, validatorRef } = useFormValidator(configPhoto);

  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
  }, [popup]);

  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext, permitindo que o componente acesse as informações do usuário atual, como a função de atualização do avatar
  const { handleUpdateAvatar } = useContext(CurrentUserContext); // extrai a função de atualização do avatar do contexto, que será usada para atualizar a foto do perfil quando o formulário for enviado

  // A referência é usada para obter o valor do input quando o formulário é enviado, facilitando o acesso ao valor do input sem a necessidade de gerenciar o estado do input com useState - permitindo acessar diretamente o elemento DOM com 'current.value'
  // Isso é útil para evitar re-renderizações desnecessárias do componente, já que o input não precisa ser controlado pelo estado do React - a referência é criada usando useRef, que retorna um objeto com uma propriedade 'current' que pode ser usada para armazenar o valor do input
  const avatarRef = useRef();

  // Função para lidar com o envio do formulário: chama a função de atualização do avatar com o valor do input de foto e fecha o popup após a atualização
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleUpdateAvatar(avatarRef.current.value); // chama a função de atualização do avatar com o valor atual do input de foto
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
      ref={formRef}
    >
      <h3 className="popup__title-form_photo">Alterar a foto do perfil</h3>
      <input
        className="popup__input-form_photo"
        id="photo-input"
        name="photo"
        type="url"
        placeholder="Link da foto"
        required
        ref={avatarRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
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
