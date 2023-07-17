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
import { auth } from "../../utils/auth";
import { location, APIkey } from "../../utils/constants";

//* Import the styles
import "../../index.css";

//* Import the variables
import {
  getForecastWeather,
  // parseWeatherData,
  // parseWeatherLocation,
  filterDataFromWeatherApi,
} from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { api } from "../../utils/api";

//! Where should this go? Current user Context
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { use } from "bcrypt/promises";
// import { is } from "jsdom/lib/jsdom/living/generated/Element";

function App() {
  //* The App component saves the weatherData in the state
  const [weatherData, setWeatherData] = useState({});

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

  //* The App component saves the current temperature unit in the state
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //* The App component saves the deletion state
  const [isDeleting, setIsDeleting] = useState(false);

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
        handleCloseModals();
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
    console.log("Opening edit profile modal");
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    console.log("Closing edit profile modal");
    setIsEditProfileModalOpen(false);
  };

  const handleSignOut = () => {
    console.log("Signing out user");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const isReloading = (token) => {
    console.log("Checking token...", token);
    auth
      .checkToken(token)
      .then((res) => {
        console.log("Token check response", res);
        setCurrentUser(res.data);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        setIsDeleteModalOpen(false);
        setAuthError("");
        setToken(token);
        console.log("User authenticated!");
      })
      .catch((err) => {
        console.log("Error checking token", err);
        setAuthError("Please enter a valid email and password");
      });
  };

  // const [temp, setTemp] = useState({
  //   temperature: {
  //     F: 0,
  //     C: 0,
  //   },
  // });
  // const [city, setCity] = useState("");
  // const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //* The useEffect hook is used to check for valid auth on initial load.
  useEffect(() => {
    // Log that loading state will be set to true
    console.log("Setting isLoading to true");
    // Set loading state to true
    setIsLoading(true);
    // Try to get token from local storage
    const storedToken = localStorage.getItem("token");
    // Log if a token was found
    if (storedToken) {
      console.log("Found stored token", storedToken);
    } else {
      console.log("No stored token found");
    }
    // If there is a token, validate it
    if (storedToken) {
      isReloading(storedToken);
    }
    // Set loading state back to false once done
    setIsLoading(false);
  }, []);

  const handleLogin = ({ email, password }) => {
    console.log("Handling login with:", { email, password });
    auth
      .signIn(email, password)
      .then((res) => {
        console.log("Got signIn response:", res);
        if (res && res.token) {
          console.log("Got token in response", res.token);
          localStorage.setItem("token", res.token);
          console.log("Token saved to localStorage");
          isReloading(res.token);
        } else {
          console.log("No token in response");
          setAuthError(res.message || "Invalid credentials");
          console.log("Set auth error message");
        }
      })
      .catch(() => {
        console.log("Error signing in");
        setAuthError("Invalid credentials");
      });
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    console.log("Handling sign up with:", { name, avatar, email, password });
    auth
      .signUp(name, avatar, email, password)
      .then((res) => {
        console.log("Got signUp response:", res);
        handleLogin({ email, password });
        console.log("Signed up, now logging in");
      })
      .catch((err) => {
        console.log("Error signing up:", err);
      });
  };

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    console.log("Set selected card to:", card);
    setActiveModal("preview");
    console.log("Opened preview modal");
  };

  const handleAddNewClick = () => {
    console.log("Create modal function called");
    setActiveModal("create");
  };

  const handleAddCardSubmit = ({ name, imageUrl, weather }) => {
    console.log("Handling add card submit with:", { name, imageUrl, weather });
    api
      .addCard({ name, imageUrl, weather })
      .then((newCard) => {
        console.log("Got add card response:", newCard);
        setCards([newCard, ...cards]);
        console.log("Updated cards state with new card");
        handleCloseModals();
        console.log("Closed modals after add");
      })
      .catch((err) => {
        console.log("Error adding card:", err);
      });
  };

  const handleCardDeleteSubmit = () => {
    setIsDeleting(true);
    api
      .deleteCard(selectedCard._id, token)
      .then(() => {
        setCards((cards) => cards.filter((c) => c.id !== selectedCard._id));
        setActiveModal("");
        setIsDeleteModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleCardLike = (card, isLiked) => {
    // Log card data
    console.log("Handle like for card:", card);
    // Destructure card id
    const { _id: id } = card;
    // Get token
    const token = localStorage.getItem("token");
    // Check if already liked
    if (isLiked) {
      console.log("Card already liked, removing like...");
      // API call to remove like
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          console.log("Got updated card:", updatedCard);
          // Update cards state
          setCards((cards) =>
            cards.map((card) => {
              if (card._id === id) {
                // Return updated card if match
                return updatedCard.data;
              } else {
                // Keep existing
                return card;
              }
            })
          );
        })
        .catch((err) => {
          console.log("Error removing like:", err);
        });
    } else {
      console.log("Card not liked, adding like...");
      // API call to add like
      api
        .addCardLike(id, token)
        // Similar logging as above
        .then()
        .catch();
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setActiveModal("");
  };

  const handleCloseModals = () => {
    console.log("Closing all modals");
    setActiveModal("");
    setIsEditProfileModalOpen(false);
  };

  // useEffect(() => {
  //   getForecastWeather()
  //     .then((data) => {
  //       const temperature = parseWeatherData(data);
  //       setTemp({
  //         F: `${Math.round(temperature)}°F`,
  //         C: `${Math.round(((temperature - 32) * 5) / 9)}°C`,
  //       });
  //       const location = parseWeatherLocation(data);
  //       setCity(location);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  //TODO Return here to polish this and update the weather data with the new format
  const fetchWeatherData = () => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIkey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSetUserNull = useCallback(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);
  useEffect(() => {
    fetchWeatherData();
  }, []);

  //* The App component saves default clothing items in the state
  useEffect(() => {
    if (token) {
      api
        .getCards(token)
        .then(({ data }) => {
          setCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // useEffect(() => {
  //   if (!activeModal) return;
  //   const handleEscUp = (evt) => {
  //     if (evt.key === "Escape") {
  //       handleCloseModals();
  //     }
  //   };

  //   const handleOverlayClick = (evt) => {
  //     if (
  //       evt.target.classList.contains("modal") ||
  //       evt.target.classList.contains("modal__close-button")
  //     ) {
  //       handleCloseModals();
  //     }
  //   };

  //   document.addEventListener("keyup", handleEscUp);
  //   document.addEventListener("click", handleOverlayClick);

  //   return () => {
  //     document.removeEventListener("keyup", handleEscUp);
  //     document.removeEventListener("click", handleOverlayClick);
  //   };
  // }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header
            weatherData={weatherData}
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
              onClose={handleCloseModals}
              isOpen={activeModal === "create"}
              onAddItem={handleAddCardSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              onClose={handleCloseModals}
              onOpenDeleteModal={openDeleteModal}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
