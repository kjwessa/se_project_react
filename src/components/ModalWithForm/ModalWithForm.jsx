import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeButton from "../../images/close-icon-gray.svg";

const ModalWithForm = ({
  children,
  modalName,
  formTitle,
  orButtonText,
  buttonText,
  onModalOpen,
  isFormValid,
  onSubmit,
  onModalClose,
  onClickOutsideModal,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const handleOrClick = (modal) => {
    switch (modal) {
      case "register":
        onModalOpen("login");
        break;
      case "login":
        onModalOpen("register");
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
          <div>
            {isLoggedIn ? (
              <button
                className={`modal-form__submit-button ${
                  isFormValid ? "modal-form__submit-button_valid" : ""
                }`}>
                {buttonText}
              </button>
            ) : (
              <>
                <button
                  className={`modal-form__submit-button ${
                    isFormValid ? "modal-form__submit-button_valid" : ""
                  }`}
                  type="submit">
                  {buttonText}
                </button>
                <button
                  type="button"
                  className="modal__or-button"
                  onClick={() => handleOrClick(modalName)}>
                  {orButtonText}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
