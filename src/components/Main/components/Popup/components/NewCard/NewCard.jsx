import { useContext, useRef, useEffect } from 'react';

import CurrentUserContext from '../../../../../../contexts/CurrentUserContext';

import useFormValidator from '../../../../../../hooks/useFormValidator';

import { configAdd } from '../../../../../../utils/constants';

function NewCard({ handleClosePopup, popup }) {
  // validação do formulário
  const { formRef, validatorRef } = useFormValidator(configAdd);

  useEffect(() => {
    if (popup && validatorRef.current) {
      validatorRef.current.resetValidation();
    }
  }, [popup]);

  // Obtém o usuário atual do contexto: assina o contexto CurrentUserContext
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  // Cria referências para os campos do formulário, não é necessário usar useState aqui, pois os valores serão obtidos diretamente do formulário quando o usuário enviar
  const placeRef = useRef(null);
  const linkRef = useRef(null);

  // Função para lidar com o envio do formulário: ela recebe o evento de envio, previne o comportamento padrão do formulário e chama a função handleAddPlaceSubmit com os dados do novo cartão
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddPlaceSubmit({
        name: placeRef.current.value,
        link: linkRef.current.value,
      });
      event.target.reset(); // limpa o formulário após o envio bem-sucedido
      handleClosePopup(); // fecha o popup após o envio, só fecha se a adição for bem-sucedida
    } catch (error) {
      console.error(`Erro ao adicionar novo cartão: ${error}`);
    }
  };

  return (
    <form
      className="popup__container_add"
      name="add"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <h3 className="popup__title-form_add">Novo local</h3>
      <input
        className="popup__input-form_add"
        id="place-input"
        name="place" // o nome do input é place, mas o servidor espera name
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        aria-label="Título do cartão"
        ref={placeRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
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
        aria-label="Link da imagem do cartão"
        ref={linkRef} // vincula a referência ao input, permitindo acessar o valor do input diretamente
      />
      <span
        className="popup__input-error_add link-input-error"
        id="card-link-error"
      ></span>
      <button className="popup__btn-form_add" type="submit">
        Criar
      </button>
    </form>
  );
}

export default NewCard;
