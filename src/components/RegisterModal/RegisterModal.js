import { useState, useEffect } from "react";
import { SignUpValidation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

//TODO Determine how to handle errors in the UI
//TODO Do I pass through the AuthError?
//TODO Convert Or Login to a button, Polish the UI for or login in, create the CSS, and add the functionality to switch to the login modal

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
    console.log("RegisterModal: Handled Input Change");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RegisterModal: Prevented default");
    onRegister(registerValues);
    console.log("RegisterModal: Handled Register Submission");
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
      isValid={isFormValid}
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

//TODO Submission: Remove this below if unneeded

//* Name State
// const [name, setName] = useState("");
// const [isNameValid, setIsNameValid] = useState(undefined);
// const [isNameError, setIsNameError] = useState("");

//* Avatar State
// const [avatar, setAvatar] = useState("");

//* Email State
// const [email, setEmail] = useState("");
// const [isEmailValid, setIsEmailValid] = useState(undefined);
// const [isEmailError, setIsEmailError] = useState("");

//* Password State
// const [password, setPassword] = useState("");
// const [isPasswordValid, setIsPasswordValid] = useState(undefined);
// const [isPasswordError, setIsPasswordError] = useState("");

//* Form State
// const [isFormValid, setIsFormValid] = useState(false);

//* Check Name Validity
// useEffect(() => {
//   const isValid = validation.validateName(name);
//   setIsNameValid(isValid);
//   if (!isValid) {
//     setIsNameError("Invalid name");
//   }
// }, [name]);

//* Check Email Validity
// useEffect(() => {
//   const isValid = validation.validateEmail(email);
//   setIsEmailValid(isValid);
//   if (!isValid) {
//     setIsEmailError("Invalid email");
//   }
// }, [email]);

//* Check Password Validity
// useEffect(() => {
//   const isValid = validation.validatePassword(password);
//   setIsPasswordValid(isValid);
//   if (!isValid) {
//     setIsPasswordError("Invalid password");
//   }
// }, [password]);

//* Check Form Validity
// useEffect(() => {
//   if (isNameValid && isEmailValid && isPasswordValid) {
//     setIsFormValid(true);
//   } else {
//     setIsFormValid(false);
//   }
// }, [isNameValid, isEmailValid, isPasswordValid]);
