import closeButton from "../images/close-icon.svg";

const ModalWithForm = ({ children, title, buttonText, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <img className="modal__close-button" onClick={onClose} alt="close-icon" src={closeButton} />
        <h3 className="modal-form__heading">{title}</h3>
        <form className="modal-form__children">{children}</form>
        <button type="submit" className="modal-form__submit-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
