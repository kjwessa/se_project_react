import closeButton from "../../images/close-icon-gray.svg";

//TODO Improve the order of the props for consistency and clarity
//TODO Add missing props (like button text and orButtonText)
const ModalWithForm = ({
  children,
  modalName,
  onSubmit,
  formTitle,
  orButtonText,
  buttonText,
  onModalOpen,
  onModalClose,
  onClickOutsideModal,
}) => {
  //TODO Check that the prop names are correct and what is needed. I'm trying to pass function parameters to the props but it's not the original function name. Loop back here if it's not working.
  const handleOrClick = (modal) => {
    switch (modal) {
      case "signup":
        onModalOpen("login");
        break;
      case "login":
        onModalOpen("signup");
        break;
      default:
        onModalClose();
    }
  };

  return (
    <div className={`modal modal_type_${modalName}`} onMouseDown={onClickOutsideModal}>
      <div className="modal__content">
        <img
          className="modal__close-button"
          onClick={onModalClose}
          alt="close-icon"
          src={closeButton}
        />
        <h3 className="modal-form__heading">{formTitle}</h3>
        <form className="modal-form__children" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal-form__submit-button">
            {buttonText}
          </button>
          <button
            type="button"
            className="modal__or-button"
            onClick={() => handleOrClick(modalName)}>
            {orButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
