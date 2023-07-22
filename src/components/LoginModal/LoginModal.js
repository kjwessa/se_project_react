import { useEffect, useState } from "react";
import { validation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

//TODO Determine how to handle errors in the UI
//TODO Add OpenModal Prop
//TODO Add CloseModal Prop
//TODO Confirm how props are passed

export default function LoginModal({
  modalName,
  formTitle,
  buttonText,
  onLogin,
  handleOpenModal,
  closeModal,
}) {
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

  //* Check Password Validity
  useEffect(() => {
    const isValid = validation.validatePassword(password);
    setIsPasswordValid(isValid);
    if (!isValid) {
      setIsPasswordError("Invalid password");
    }
  }, [password]);

  //* Check Email Validity
  useEffect(() => {
    const isValid = validation.validateEmail(email);
    setIsEmailValid(isValid);
    if (!isValid) {
      setIsEmailError("Invalid email");
    }
  }, [email]);

  //* Check Form Validity
  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isEmailValid, isPasswordValid]);

  //* Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LoginModal: Prevented default");
    onLogin({ email, password });
    console.log("LoginModal: Handled Login Submission");
  };
  //TODO Figure out why the formTitle is not being passed
  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      handleOpenModal={handleOpenModal}
      closeModal={closeModal}>
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
}
