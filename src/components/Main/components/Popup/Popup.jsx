import { useEffect, useRef } from 'react';

export default function Popup(props) {
  //children é o conteúdo de popup
  const { children, onClose, popup } = props;

  // Para verificar se children é o componente popup que precisa de configuração diferente da classe do botão de fechar para ajuste da margem superior
  // ImagePopup
  const isImagePopup = children.type.name === 'ImagePopup';

  // DeleteConfirmation
  const isDeleteConfirmation = children.type.name === 'DeleteConfirmation';

  // EditAvatar
  const isEditAvatar = children.type.name === 'EditAvatar';

  // Fechamento do popup por clique na tela, fora do popup em si
  const childrenPopupRef = useRef(null);

  const handleClickClose = (evt) => {
    const childrenContent = childrenPopupRef.current;
    const clickedOutside =
      childrenContent && !childrenContent.contains(evt.target);

    if (clickedOutside) onClose();
  };

  // Fechamento do popup pela tecla 'Esc'
  useEffect(() => {
    const handleEscClose = (evt) => {
      const keyIsEsc = evt.code === 'Escape'; // valor de código para eventos de teclado (Windowns, Mac, Linux e Firefox para Android)

      if (popup && keyIsEsc) onClose(); // se o popup estiver aberto e a tecla pressionada for a esc, o popup fecha
    };

    document.addEventListener('keydown', handleEscClose); // adiciona o evento em document > escuta globalmente → essencial para capturar a tecla Esc mesmo sem foco

    // Wipe function: função de limpeza
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      // remove o listener ao desmontar ou ao mudar dependências → evita múltiplas inscrições ou vazamentos
    };
  }, [popup, onClose]);

  return (
    <div className="popup" onClick={handleClickClose}>
      <div className="popup__content" ref={childrenPopupRef}>
        {children}
      </div>
      <button
        className={`icon-close-btn popup__icon-close-btn ${
          isImagePopup ? 'popup__icon-close-btn_card' : ''
        } ${isDeleteConfirmation ? 'popup__icon-close-btn_trash' : ''} ${
          isEditAvatar ? 'popup__icon-close-btn_photo' : ''
        }`}
        type="button"
        aria-label="Botão de fechar"
        onClick={onClose}
      ></button>
    </div>
  );
}
