import { useState, useEffect } from "react";
import { SignUpValidation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  modalName,
  formTitle,
  buttonText,
  orButtonText,
  onModalOpen,
  onRegister,
  onModalClose,
  onClickOutsideModal,
}) {
  //* States: Registration Values + Validity
  const [registerValues, setRegisterValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  //* Handlers: Input Change + Submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerValues);
  };

  //* UseEffect: Check Form Validity
  useEffect(() => {
    const { email, password, name } = registerValues;

    if (email && password && name) {
      setIsFormValid(SignUpValidation(email, password, name));
    } else {
      setIsFormValid(false);
    }
  }, [registerValues]);

  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      orButtonText={orButtonText}
      onModalOpen={onModalOpen}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      onModalClose={onModalClose}
      onClickOutsideModal={onClickOutsideModal}>
      <label className="modal-form__input-title">Email</label>
      <input
        required
        className="modal-form__input-field"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={registerValues.email || ""}
        onChange={handleInputChange}
      />
      <label className="modal-form__input-title">Password</label>
      <input
        required
        className="modal-form__input-field"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={registerValues.password || ""}
        onChange={handleInputChange}
      />
      <label className="modal-form__input-title">Name</label>
      <input
        required
        className="modal-form__input-field"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={registerValues.name || ""}
        onChange={handleInputChange}
      />

      <label className="modal-form__input-title">Avatar URL</label>
      <input
        className="modal-form__input-field"
        type="text"
        name="avatar"
        id="avatar"
        placeholder="Avatar URL"
        value={registerValues.avatar || ""}
        onChange={handleInputChange}
      />
    </ModalWithForm>
  );
}
