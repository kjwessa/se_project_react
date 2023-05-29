import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import ItemModal from "./components/ItemModal";

function App() {
  const weatherTemp = "90° F";
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  console.log(selectedCard);
  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
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
      {activeModal && <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
