import { useEffect, useRef } from 'react';

export default function Popup(props) {
  // 1. Desestruturação do objeto passado como prop ao componente, children é conteúdo de popup
  const { children, onClose, popup } = props;

  // 2. Ref para encapsulamento de children: para fechamento do popup por clique na tela, fora do popup em si: para detectar clique fora da caixa
  const childrenPopupRef = useRef(null);

  // 3. Verificação de tipo de popup: para verificar se children é o componente popup que precisa de configuração diferente da classe do botão de fechar para ajuste da margem superior
  // ImagePopup
  const isImagePopup = children.type.name === 'ImagePopup';

  // DeleteConfirmation
  const isDeleteConfirmation = children.type.name === 'DeleteConfirmation';

  // EditAvatar
  const isEditAvatar = children.type.name === 'EditAvatar';

  // 4. Efeito colateral para fechamento do popup pela tecla 'Esc'
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

  // 5. Handler: fechamento por clique fora
  const handleClickClose = (evt) => {
    const childrenContent = childrenPopupRef.current;
    const clickedOutside =
      childrenContent && !childrenContent.contains(evt.target);

    if (clickedOutside) onClose();
  };

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
      />
    </div>
  );
}
