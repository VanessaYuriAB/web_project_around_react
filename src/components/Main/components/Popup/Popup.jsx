export default function Popup(props) {
  //children é o conteúdo de popup
  const { children, onClose } = props;

  // Para verificar se children é o componente popup que precisa de configuração diferente da classe do botão de fechar para ajuste da margem superior
  // ImagePopup
  const isImagePopup = children.type.name === 'ImagePopup';

  // DeleteConfirmation
  const isDeleteConfirmation = children.type.name === 'DeleteConfirmation';

  // EditAvatar
  const isEditAvatar = children.type.name === 'EditAvatar';

  return (
    <div className="popup">
      {children}
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
