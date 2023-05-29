const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose} type="button">
          Close
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit">{buttonText}</button>
      </div>
    </div>
  );
};

export default ModalWithForm;
