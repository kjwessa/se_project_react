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
    console.log("LoginModal: Prevented default");
    onLogin(loginValues);
    console.log("LoginModal: Handled Login Submission");
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

  //TODO Figure out why the formTitle is not being passed
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

//TODO Submission: Remove this below if unneeded
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

//* Check Password Validity
// useEffect(() => {
//   const isValid = validation.validatePassword(password);
//   setIsPasswordValid(isValid);
//   if (!isValid) {
//     setIsPasswordError("Invalid password");
//   }
// }, [password]);

//* Check Email Validity
// useEffect(() => {
//   const isValid = validation.validateEmail(email);
//   setIsEmailValid(isValid);
//   if (!isValid) {
//     setIsEmailError("Invalid email");
//   }
// }, [email]);

//* Check Form Validity
// useEffect(() => {
//   if (isEmailValid && isPasswordValid) {
//     setIsFormValid(true);
//   } else {
//     setIsFormValid(false);
//   }
// }, [isEmailValid, isPasswordValid]);
