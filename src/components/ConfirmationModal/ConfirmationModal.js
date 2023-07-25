import closeButton from "../../images/close-icon-gray.svg";

const ConfirmationModal = ({ onDeleteSubmit, onModalClose }) => {
  return (
    <div className="modal">
      <div className="modal__confirm-container">
        <img
          className="modal__close-button"
          onClick={onModalClose}
          alt="close-icon"
          src={closeButton}
        />
        <div className="modal__confirm-message">
          <p className="modal__confirm-text">Are you sure you want to delete this item?</p>
          <p className="modal__confirm-text">This action is irreversable.</p>
        </div>
        <p className="modal__confirm-yes" onClick={onDeleteSubmit}>
          Yes, delete item
        </p>
        <p className="modal__confirm-cancel" onClick={onModalClose}>
          Cancel
        </p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
