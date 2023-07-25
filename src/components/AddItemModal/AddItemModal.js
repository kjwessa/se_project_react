import { useState, useEffect } from "react";
import { NewItemValidation } from "../../utils/validation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  modalName,
  formTitle,
  buttonText,
  onAddItem,
  onModalClose,
  onClickOutsideModal,
}) => {
  //* State: Form Values + Validity
  const [itemValues, setItemValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  //* Handlers: Input Change + Submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemValues({ ...itemValues, [name]: value });
    console.log("AddItemModal: Handled Input Change");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AddItemModal: Prevented default");
    onAddItem(itemValues);
    console.log("AddItemModal: Handled Add Item Submission");
  };

  //* UseEffect: Check Form Validity
  useEffect(() => {
    const { name, imageUrl, weather } = itemValues;

    if (name && imageUrl && weather) {
      setIsFormValid(NewItemValidation(name, imageUrl, weather));
    } else {
      setIsFormValid(false);
    }
  }, [itemValues]);

  return (
    <ModalWithForm
      modalName={modalName}
      formTitle={formTitle}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onModalClose={onModalClose}
      onClickOutsideModal={onClickOutsideModal}>
      <label>
        <h2 className="modal-form__input-title">Name</h2>
        <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={itemValues.name || ""}
          onChange={handleInputChange}
          className="modal-form__input-field"></input>
      </label>
      <label>
        <h2 className="modal-form__input-title">Image</h2>
        <input
          required
          type="url"
          name="imageUrl"
          id="imageUrl"
          placeholder="Image URL"
          value={itemValues.imageUrl || ""}
          onChange={handleInputChange}
          className="modal-form__input-field"></input>
      </label>
      <p className="modal-form__text">Select the weather type:</p>
      <div className="modal-form__radio-wrap">
        <div className="modal-form__radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            className="modal-form__radio-button"
            name="weather"
            onChange={handleInputChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="modal-form__radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            className="modal-form__radio-button"
            name="weather"
            onChange={handleInputChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="modal-form__radio">
          <input
            type="radio"
            id="cold"
            value="cold"
            className="modal-form__radio-button"
            name="weather"
            onChange={handleInputChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
