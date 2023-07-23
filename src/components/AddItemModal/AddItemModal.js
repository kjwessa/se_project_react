// TODO import useEffect
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// TODO import FORMADD
// TODO import NewItemValidation
// TODO Make sure the submit action is right
const AddItemModal = ({
  modalName,
  formTitle,
  buttonText,
  onAddItem,
  onModalClose,
  onClickOutsideModal,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  //TODO Submission: Remove this below if unneeded
  const [weather, setWeather] = useState("");

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      onSubmit={onAddItem}
      onModalClose={onModalClose}
      onClickOutsideModal={onClickOutsideModal}>
      <label>
        <h2 className="modal-form__input-title">Name</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          className="modal-form__input-field"
          required></input>
      </label>
      <label>
        <h2 className="modal-form__input-title">Image</h2>
        <input
          type="url"
          name="link"
          placeholder="Image URL"
          minLength="1"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="modal-form__input-field"
          required></input>
      </label>
      <p className="modal-form__text">Select the weather type:</p>
      <div className="modal-form__radio-wrap">
        <div className="modal-form__radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            className="modal-form__radio-button"
            name="weather-type"
            onChange={handleWeatherChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="modal-form__radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            className="modal-form__radio-button"
            name="weather-type"
            onChange={handleWeatherChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="modal-form__radio">
          <input
            type="radio"
            id="cold"
            value="cold"
            className="modal-form__radio-button"
            name="weather-type"
            onChange={handleWeatherChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

//TODO Submission: Delete this if unused before submission
// const handleSubmit = (e) => {
//   e.preventDefault();
//   onAddItem({ name, weather, imageUrl });
// };
