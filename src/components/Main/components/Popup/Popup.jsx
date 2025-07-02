export default function Popup(props) {
  //children é o conteúdo de popup
  const { title, children, onClose } = props;

  return (
    <div className="popup popup_closed">
      <div className="popup__content">
        <h3 className="popup__title-form">{title}</h3>
        {children}
      </div>
      <button
        className="icon-close-btn popup__icon-close-btn"
        type="button"
        aria-label="Botão de fechar"
        onClick={onClose}
      ></button>
    </div>
  );
}
