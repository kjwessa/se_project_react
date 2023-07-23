import closeButton from "../../images/close-icon-gray.svg";

const ModalWithForm = ({
  children,
  name,
  onSubmit,
  title,
  buttonText,
  onModalClose,
  onClickOutsideModal,
}) => {
  return (
    <div className={`modal modal_type_${name}`} onMouseDown={onClickOutsideModal}>
      <div className="modal__content">
        <img
          className="modal__close-button"
          onClick={onModalClose}
          alt="close-icon"
          src={closeButton}
        />
        <h3 className="modal-form__heading">{title}</h3>
        <form className="modal-form__children" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal-form__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
