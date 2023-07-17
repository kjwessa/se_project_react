import { useState, useEffect } from "react";
import { validation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  name,
  closeModal,
  handleClickOutsideModal,
  handleSignup,
  handleOpenModal,
}) {
  const [registerValues, setRegisterValues] = useState({});
  const [isRegisterFormValid, setIsRegisterFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(registerValues);
  };

  useEffect(() => {
    const { email, password, name } = registerValues;

    if (email && password && name) {
      setIsRegisterFormValid(validation.SignUpValidation(email, password, name));
    } else {
      setIsRegisterFormValid(false);
    }
  }, [registerValues]);

  return (
    <ModalWithForm
      name={name}
      title={"Sign up"}
      buttonText={"Next"}
      closeModal={closeModal}
      handleClickOutsideModal={handleClickOutsideModal}
      handleSubmit={handleSubmit}
      isRegisterFormValid={isRegisterFormValid}
      handleOpenModal={handleOpenModal}
      orButtonText={"or Login"}>
      <label className="modal__label">Email</label>
      <input
        className="modal__input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        minLength="1"
        maxLength="30"
        value={registerValues.email || ""}
        onChange={handleInputChange}
      />

      <label className="modal__label">Password</label>
      <input
        className="modal__input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        minLength="8"
        maxLength="30"
        value={registerValues.password || ""}
        onChange={handleInputChange}
      />

      <label className="modal__label">Name</label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        value={registerValues.name || ""}
        onChange={handleInputChange}
      />

      <label className="modal__label">Avatar URL</label>
      <input
        className="modal__input"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Avatar URL"
        value={registerValues.avatar || ""}
        onChange={handleInputChange}
      />
    </ModalWithForm>
  );
}
