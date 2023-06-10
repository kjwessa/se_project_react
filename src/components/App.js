import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData, parseWeatherLocation } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    }
  };

  useEffect(() => {
    const handleEscUp = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleOverlayClick = (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("keyup", handleEscUp);
    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keyup", handleEscUp);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [activeModal]);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        console.log(temperature);
        const location = parseWeatherLocation(data);
        setCity(location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(currentTemperatureUnit);
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header onCreateModal={handleCreateModal} location={city} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm title="New Garment" onClose={handleCloseModal} buttonText="Add garment">
            <label>
              <h2 className="modal-form__input-title">Name</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                minLength="1"
                maxLength="30"
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
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
