export default function Popup(props) {
  //children é o conteúdo de popup
  const { children, onClose } = props;

  // Para verificar se children é o componente ImagePopup e configurar a classe do botão de fechar
  const isImagePopup = children.type.name === 'ImagePopup';

  return (
    <div className="popup popup_closed">
      {children}
      <button
        className={`icon-close-btn popup__icon-close-btn ${
          isImagePopup ? 'popup__icon-close-btn_card' : ''
        }`}
        type="button"
        aria-label="Botão de fechar"
        onClick={onClose}
      ></button>
    </div>
  );
}
