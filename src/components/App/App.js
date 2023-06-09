import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getForecastWeather, parseWeatherData, parseWeatherLocation } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { api } from "../../utils/api";

function App() {
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
      .getItems()
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
    console.log("Create modal function called"); // Add this line

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

  //TODO updated this from removeItem to deleteItem. Return here if there are any issues.
  const handleCardDelete = (card) => {
    api
      .deleteItem(card.id)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!activeModal) return;
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
            <Profile
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              onCreateModal={handleCreateModal}></Profile>
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
