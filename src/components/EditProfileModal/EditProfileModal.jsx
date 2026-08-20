import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { UpdateProfileValidation } from "../../utils/validation";

function EditProfileModal({
  modalName,
  formTitle,
  buttonText,
  onUpdateUser,
  onModalClose,
  onClickOutsideModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  //* State: Form Values + Validity
  const [profileValues, setProfileValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  //* Handlers: Input Change + Submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileValues({ ...profileValues, [name]: value });
    console.log("AddItemModal: Handled Input Change");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(profileValues);
  };

  //* UseEffect: Check Form Validity
  useEffect(() => {
    const { name, avatar } = profileValues;
    if (name && avatar) {
      setIsFormValid(UpdateProfileValidation(name, avatar));
    } else {
      setIsFormValid(false);
    }
  }, [profileValues]);

  useEffect(() => {
    setProfileValues({ name: currentUser.name, avatar: currentUser.avatar });
  }, []);

  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      onModalClose={onModalClose}
      onClickOutsideModal={onClickOutsideModal}>
      <label className="modal-form__input-title">
        Name
        <input
          required
          className="modal-form__input-field"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={profileValues.name || ""}
          onChange={handleInputChange}
        />
      </label>
      <label className="modal-form__input-title">
        Avatar URL
        <input
          className="modal-form__input-field"
          type="text"
          name="avatar"
          id="avatar"
          placeholder="Avatar URL"
          value={profileValues.avatar || ""}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
