import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({
  modalName,
  formTitle,
  buttonText,
  onUpdateUser,
  onModalClose,
  onClickOutsideModal,
}) {
  //TODO Check which states are still needed
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isValid, setIsValid] = useState(false);

  //TODO Check if this is needed
  useEffect(() => {
    if (name.length > 0 && avatar.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, avatar]);

  //TODO Submission: Remove this below if unneeded
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser(name, avatar);
  // };

  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      isValid={isValid}
      onSubmit={onUpdateUser}
      onClose={onModalClose}
      onClickOutsideModal={onClickOutsideModal}>
      <label className="edit-profile-modal__input-label">
        Name
        <input
          className="edit-profile-modal__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="edit-profile-modal__input-label">
        Avatar URL
        <input
          className="edit-profile-modal__input"
          type="url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
