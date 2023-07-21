//* Import React
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
import { location, APIKey } from "../../utils/constants";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

//* Import the styles
import "../../index.css";

//* Import the Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

//* Import the Variables
import { getForecastWeather, filterDataFromWeatherApi } from "../../utils/weatherApi";

import { api } from "../../utils/api";

function App() {
  //* State: Weather Data
  const [weatherData, setWeatherData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //* State: User, Token & AuthError
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //* State: Cards
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  //* Profile Handlers: Register, Login, SignOut, Edit Profile
  const handleRegistration = ({ name, avatar, email, password }) => {
    console.log("App: Handling sign up with:", { name, avatar, email, password });
    auth
      .signUp(name, avatar, email, password)
      .then((res) => {
        console.log("Got signUp response:", res);
        handleLogin({ email, password });
        console.log("Signed up, now logging in");
      })
      .catch((err) => {
        console.log("Registration Error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    console.log("App: Handling login with:", { email, password });
    auth
      .signIn(email, password)
      .then((res) => {
        console.log("App: Got signIn response:", res);
        if (res && res.token) {
          console.log("App: Got token in response", res.token);
          localStorage.setItem("token", res.token);
          console.log("App: Token saved to localStorage");
          isReloading(res.token);
        } else {
          console.log("App: No token in response");
          setAuthError(res.message || "App: Invalid credentials");
          console.log("App: Set auth error message");
        }
      })
      .catch(() => {
        console.log("App: Error signing in");
        setAuthError("App: Invalid credentials");
      });
  };

  const handleSignOut = () => {
    console.log("Signing out user");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

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

  //* Card Handlers: Click, Add, Delete
  const handleAddCardClick = () => {
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

  //* User Handlers: Reloading, Null User
  const isReloading = (token) => {
    console.log("App: Checking token...", token);
    auth
      .checkToken(token)
      .then((res) => {
        console.log("App: Token check response", res);
        setCurrentUser(res.data);
        setIsLoginModalOpen(false);
        setIsRegistrationModalOpen(false);
        setIsDeleteModalOpen(false);
        setAuthError("");
        setToken(token);
        console.log("App: User authenticated!");
      })
      .catch((err) => {
        console.log("App: Error checking token", err);
        setAuthError("App: Please enter a valid email and password");
      });
  };

  const handleSetUserNull = useCallback(() => {
    console.log("App: Setting current user to null");
    setCurrentUser(null);
  }, [setCurrentUser]);
  useEffect(() => {
    fetchWeatherData();
  }, []);

  //* Card Handlers: Like, Unlike, Click
  const handleCardLike = (card, isLiked) => {
    console.log("Handle like for card:", card);
    const { _id: id } = card;
    const token = localStorage.getItem("token");
    if (isLiked) {
      console.log("Card already liked, removing like...");
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          console.log("Got updated card:", updatedCard);
          setCards((cards) =>
            cards.map((card) => {
              if (card._id === id) {
                return updatedCard.data;
              } else {
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
      api.addCardLike(id, token).then().catch();
    }
  };

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    console.log("Set selected card to:", card);
    setActiveModal("preview");
    console.log("Opened preview modal");
  };

  //* useEffect: Check for valid token on load
  useEffect(() => {
    console.log("App: Setting isLoading to true");
    console.log("App:", currentUser);
    setIsLoading(true);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("App: Found stored token", storedToken);
    } else {
      console.log("App: No stored token found");
    }
    if (storedToken) {
      isReloading(storedToken);
    }
    setIsLoading(false);
  }, []);

  //* useEffect: Render Cards
  useEffect(() => {
    if (token) {
      api
        .getCards(token)
        .then(({ data }) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  //! Refactor these below
  //* The App component saves the modal states
  const [activeModal, setActiveModal] = useState("");
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setActiveModal("");
  };

  const handleCloseModals = () => {
    console.log("Closing all modals");
    setActiveModal("");
    setIsEditProfileModalOpen(false);
  };

  const handleEditProfileOpen = () => {
    console.log("Opening edit profile modal");
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    console.log("Closing edit profile modal");
    setIsEditProfileModalOpen(false);
  };

  //! Refactor these below

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //TODO Return here to polish this and update the weather data with the new format
  const fetchWeatherData = () => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherApi(data));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header
            weatherData={weatherData}
            onAddNewClick={handleAddCardClick}
            openLoginModal={() => setIsLoginModalOpen(true)}
            openSignUpModal={() => setIsRegistrationModalOpen(true)}
            setCurrentUser={setCurrentUser}
          />
          <Switch>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isAuthenticated={currentUser}
              cards={cards}
              onAddNewClick={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              handleSetUserNull={handleSetUserNull}
              onEditProfileOpen={handleEditProfileOpen}
              onSignOut={handleSignOut}
            />

            <Route exact path="/">
              <Main
                weatherData={weatherData}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
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
          {isRegistrationModalOpen && (
            <RegisterModal
              modalName={"Register"}
              formTitle={"Sign up"}
              buttonText={"Next"}
              isOpen={isRegistrationModalOpen}
              onClose={() => setIsRegistrationModalOpen(false)}
              onRegister={handleRegistration}
              authError={authError}
              switchToLogin={() => {
                setIsLoginModalOpen(true);
                setIsRegistrationModalOpen(false);
              }}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              modalName={"Login"}
              formTitle={"Log In"}
              buttonText={"Log In"}
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
              authError={authError}
              switchToRegister={() => {
                setIsRegistrationModalOpen(true);
                setIsLoginModalOpen(false);
              }}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

// const [temp, setTemp] = useState({
//   temperature: {
//     F: 0,
//     C: 0,
//   },
// });
// const [city, setCity] = useState("");
// const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
