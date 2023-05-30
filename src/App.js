import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import ItemModal from "./components/ItemModal";
import { getForecastWeather, parseWeatherData, parseWeatherLocation } from "./utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");

  const handleCreateModal = () => {
    setActiveModal("create");
    document.addEventListener("keyup", handleEscUp);
    document.addEventListener("click", handleOverlayClick);
  };
  const handleCloseModal = () => {
    setActiveModal("");
    document.removeEventListener("keyup", handleEscUp);
    document.removeEventListener("click", handleOverlayClick);
  };
  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

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

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const location = parseWeatherLocation(data);
        setCity(location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="page">
      <Header onCreateModal={handleCreateModal} location={city} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <label>
            name<input type="text" name="name " minLength="1" maxLength="30"></input>
          </label>
          <label>
            Image<input type="url" name="link " minLength="1" maxLength="30"></input>
          </label>
          <p>Select the weather type:</p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" />
              <label for="hot">Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <label for="warm">Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <label for="cold">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
