import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import Profile from "./Profile";
import { getForecastWeather, parseWeatherData, parseWeatherLocation } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { api } from "../utils/api";

function App() {
  //TODO Return here to the top clean up to make sure everything is good
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState({
    temperature: {
      F: 0,
      C: 0,
    },
  });
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //* The useEffect hook is used to fetch data from the API and update the state of the component on mounting
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp({
          F: `${Math.round(temperature)}°F`,
          C: `${Math.round(((temperature - 32) * 5) / 9)}°C`,
        });
        const location = parseWeatherLocation(data);
        setCity(location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //* The App component saves default clothing items in the state
  useEffect(() => {
    api
      .getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleItemSubmit = (item) => {
    console.log("The raw data from submitting:", item);
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .removeItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header onCreateModal={handleCreateModal} location={city} />
        <Switch>
          <Route path="/profile">
            <Profile onSelectCard={handleSelectedCard} clothingItems={clothingItems}></Profile>
          </Route>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal card={selectedCard} onClose={handleCloseModal} onDelete={handleCardDelete} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
