import { useEffect, useState } from "react";
import { LoginValidation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

//TODO Return and add the error state to the UI for a bad password

export default function LoginModal({
  modalName,
  formTitle,
  buttonText,
  orButtonText,
  onModalOpen,
  onLogin,
  invalidPassword,
  setInvalidPassword,
  onModalClose,
  onClickOutsideModal,
}) {
  //* States: Login Values + Validity
  const [loginValues, setLoginValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  //* Handlers: Input Change + Submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
    setInvalidPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginValues);
  };

  //* UseEffect: Check Form Validity
  useEffect(() => {
    const { email, password } = loginValues;
    if (email && password) {
      setIsFormValid(LoginValidation(email, password));
    } else {
      setIsFormValid(false);
    }
  }, [loginValues]);

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
        value={loginValues.email || ""}
        onChange={handleInputChange}
        autoComplete="email"
      />
      <label className="modal-form__input-title">Password</label>
      <input
        required
        className="modal-form__input-field"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={loginValues.password || ""}
        onChange={handleInputChange}
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
}
