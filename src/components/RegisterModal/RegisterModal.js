import { useState, useEffect } from "react";
import { validation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

//TODO Remove the error states if we're not using them, or make them really subtle
//TODO Add the right form classes to the inputs and titles
//TODO Double check the props being passed in because I have some unnecessary ones coming from App.js

export default function RegisterModal({
  modalName,
  formTitle,
  buttonText,
  onRegister,
  closeModal,
  handleClickOutsideModal,
  handleOpenModal,
}) {
  //* Name State
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(undefined);
  const [isNameError, setIsNameError] = useState("");

  //* Avatar State
  const [avatar, setAvatar] = useState("");

  //* Email State
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(undefined);
  const [isEmailError, setIsEmailError] = useState("");

  //* Password State
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(undefined);
  const [isPasswordError, setIsPasswordError] = useState("");

  //* Form State
  const [isFormValid, setIsFormValid] = useState(false);

  //* Check Name Validity
  useEffect(() => {
    const isValid = validation.validateName(name);
    setIsNameValid(isValid);
    if (!isValid) {
      setIsNameError("Invalid name");
    }
  }, [name]);

  //* Check Email Validity
  useEffect(() => {
    const isValid = validation.validateEmail(email);
    setIsEmailValid(isValid);
    if (!isValid) {
      setIsEmailError("Invalid email");
    }
  }, [email]);

  //* Check Password Validity
  useEffect(() => {
    const isValid = validation.validatePassword(password);
    setIsPasswordValid(isValid);
    if (!isValid) {
      setIsPasswordError("Invalid password");
    }
  }, [password]);

  //* Check Form Validity
  useEffect(() => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isNameValid, isEmailValid, isPasswordValid]);

  //* Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prevented default");
    onRegister({ name, avatar, email, password });
    console.log("RegisterModal: Handled Register Submission");
  };
  //TODO Add open modal prop
  //TODO Add close modal prop
  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      handleOpenModal={handleOpenModal}
      orButtonText={"or Login"}>
      <label className="modal-form__input-title">Email</label>
      <input
        required
        className="modal-form__input-field"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="modal-form__input-title">Password</label>
      <input
        required
        className="modal-form__input-field"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="modal-form__input-title">Name</label>
      <input
        required
        className="modal-form__input-field"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="modal-form__input-title">Avatar URL</label>
      <input
        className="modal-form__input-field"
        type="text"
        name="avatar"
        id="avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
    </ModalWithForm>
  );
}
