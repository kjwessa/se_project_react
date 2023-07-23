//TODO Return here and add in all the props that are needed for this component, none of the props are currently added
//TODO Return here and check on this functionality because it's not been used yet
//TODO Return here and ensure all the CSS classes are correct
//TODO Return here and ensure all the functionality is correct

function ConfirmationModal({ onClose, handleDelete, isLoading }) {
  return (
    <div className="modal modal__confirm">
      <div className="modal__delete-container">
        <button className="modal__close modal__close-item" onClick={onClose} />
        <div className="modal__message">
          <p className="modal__message-line">Are you sure you want to delete this item?</p>
          <p className="modal__message-line">This action is irreversable.</p>
        </div>
        <p className="modal__yes" onClick={handleDelete}>
          {isLoading ? "Saving..." : "Yes, delete item"}
        </p>
        <p className="modal__cancel" onClick={onClose}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default ConfirmationModal;
