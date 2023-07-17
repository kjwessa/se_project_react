//* Import the basic React features
import { useEffect, useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

//* Import the components
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { checkToken, signUp, signIn } from "../../utils/auth";

//* Import the styles
import "../../index.css";

//* Import the variables
import { getForecastWeather, parseWeatherData, parseWeatherLocation } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { api } from "../../utils/api";

//! Where should this go? Current user Context
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  //* The App component saves the Clothing Item cards in the state
  const [cards, setCards] = useState([]);

  //* The App component saves the current user in the state
  const [currentUser, setCurrentUser] = useState(null);

  //* The App component sets the active modal in the state
  const [activeModal, setActiveModal] = useState("");

  //* The App component saves the selected card in the state
  const [selectedCard, setSelectedCard] = useState({});

  //* The App component saves the currently loading state
  const [isLoading, setIsLoading] = useState(false);

  //* The App component saves the modal states
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //* The App component saves the current Token state
  const [token, setToken] = useState(null);

  //* The App component saves the authError state
  const [authError, setAuthError] = useState("");

  //* The function to handle all the logic of the handleEditProfile
  const handleEditProfile = (name, avatar) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api
      .updateProfile(name, avatar, token)
      .then((res) => {
        closeModals();
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileOpen = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const closeModals = () => {
    setActiveModal("");
    setIsEditProfileModalOpen(false);
  };

  const isReloading = (token) => {
    checkToken(token)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setIsDeleteModalOpen(false);
        setAuthError("");
        setToken(token);
      })
      .catch((err) => {
        console.log(err);
        setAuthError("Please enter a valid email and password");
      });
  };

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
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddCardClick = () => {
    console.log("Create modal function called");
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
        setCards([newItem, ...cards]);
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
        setCards((cards) => cards.filter((c) => c.id !== card.id));
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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header
            // weatherData={weatherData}
            handleAddCardClick={() => setActiveModal("create")}
            openLoginModal={() => setIsLoginModalOpen(true)}
            openRegisterModal={() => setIsRegisterModalOpen(true)}
            // onCreateModal={handleCreateModal}
            // location={city}
            setCurrentUser={setCurrentUser}
          />
          <Switch>
            <ProtectedRoute
              path="/profile"
              isAuthenticated={currentUser}
              component={Profile}
              cards={cards}
              onAddNewClick={handleAddNewClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              handleSetUserNull={handleSetUserNull}
              onEditProfileOpen={handleEditProfileOpen}
              onSignOut={handleSignOut}
              // onSelectCard={handleSelectedCard}
              // clothingItems={clothingItems}
              // onCreateModal={handleCreateModal}
            />
            <Route exact path="/">
              <Main
                weatherData={weatherData}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                // weatherTemp={temp}
                // onSelectCard={handleSelectedCard}
                // clothingItems={clothingItems}
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
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
