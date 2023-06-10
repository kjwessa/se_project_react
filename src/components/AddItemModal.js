import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ isOpen, handleCloseModal, onAddItem }) => {
  const [name, setName] = React.useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setLink] = React.useState("");
  const handleLinkChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    onAddItem({ name, link });
  };
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
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
          maxLength="30"
          value={link}
          onChange={handleLinkChange}
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
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
