//* Import React
import { useEffect, useState, useCallback, useContext } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

//* Import the components
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { auth } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

//* Import the styles
import "../../index.css";

//* Import the Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

//* Import the Variables
import { getForecastWeather, parseWeatherData, getWeatherCard } from "../../utils/weatherApi";
import { api } from "../../utils/api";

function App() {
  //* State: Modals
  const [activeModal, setActiveModal] = useState("");

  //* State: Weather Data
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [skyCondition, setSkyCondition] = useState();
  const [city, setCity] = useState("");
  const [currentTemp, setCurrentTemp] = useState(0);
  // const [weatherData, setWeatherData] = useState({});

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
        handleCloseModal();
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
        handleCloseModal();
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
        handleCloseModal();
        // setIsConfirmationModalOpen(false);
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
        // setIsLoginModalOpen(false);
        // setIsRegistrationModalOpen(false);
        // setIsConfirmationModalOpen(false);
        handleCloseModal();
        setAuthError("");
        setToken(token);
        console.log("App: User authenticated!");
      })
      .catch((err) => {
        console.log("App: Error checking token", err);
        setAuthError("App: Please enter a valid email and password");
      });
  };

  //TODO Return here to repair null
  const handleSetUserNull = useCallback(() => {
    console.log("App: Setting current user to null");
    setCurrentUser(null);
  }, [setCurrentUser]);
  useEffect(() => {
    // fetchWeatherData();
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

  //* Handlers: Weather Switch, Weather Data
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const cityName = data && data.name;
        setCity(cityName);
        const temp = parseWeatherData(data);
        setCurrentTemp(temp);
        const weatherCardImg = getWeatherCard(data);
        setSkyCondition(weatherCardImg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  // const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // const openConfirmationModal = () => {
  //   setIsConfirmationModalOpen(true);
  //   setActiveModal("");
  // };

  const handleOpenModal = (modalName) => {
    console.log("Opening modal:", modalName);
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    console.log("Closing active modal");
    setActiveModal("");
  };

  // const handleEditProfileOpen = () => {
  //   console.log("Opening edit profile modal");
  //   setIsEditProfileModalOpen(true);
  // };

  // const handleEditProfileClose = () => {
  //   console.log("Closing edit profile modal");
  //   setIsEditProfileModalOpen(false);
  // };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header
            city={city}
            currentTemp={currentTemp}
            onAddNewClick={handleAddCardClick}
            // openLoginModal={() => setIsLoginModalOpen(true)}
            // openSignUpModal={() => setIsRegistrationModalOpen(true)}
            setCurrentUser={setCurrentUser}
            openModal={handleOpenModal}
            // closeModal={handleCloseModal}
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
              // onEditProfileOpen={handleEditProfileOpen}
              onSignOut={handleSignOut}
            />

            <Route exact path="/">
              <Main
                currentTemp={currentTemp}
                skyCondition={skyCondition}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              // onClose={handleCloseModals}
              // isOpen={activeModal === "create"}
              onAddItem={handleAddCardSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              // onClose={handleCloseModals}
              // onOpenConfirmationModal={openConfirmationModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              modalName={"register"}
              formTitle={"Sign up"}
              buttonText={"Next"}
              // isOpen={isRegistrationModalOpen}
              // onClose={() => setIsRegistrationModalOpen(false)}
              onRegister={handleRegistration}
              authError={authError}
              // switchToLogin={() => {
              //   setIsLoginModalOpen(true);
              //   setIsRegistrationModalOpen(false);
              // }}
              modalClose={handleCloseModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              modalName={"Login"}
              formTitle={"Log In"}
              buttonText={"Log In"}
              // isOpen={isLoginModalOpen}
              // onClose={() => setIsLoginModalOpen(false)}
              onLogin={handleLogin}
              authError={authError}
              // switchToRegister={() => {
              //   setIsRegistrationModalOpen(true);
              //   setIsLoginModalOpen(false);
              // }}
              modalClose={handleCloseModal}
            />
          )}
          {activeModal === "delete" && (
            <ConfirmationModal
              // onClose={() => setIsConfirmationModalOpen(false)}
              handleDelete={handleCardDeleteSubmit}
              isLoading={isDeleting}
              // onItemDeleted={closeAllModals}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              // isOpen={isEditProfileModalOpen}
              // onClose={handleEditProfileClose}
              onUpdateUser={handleEditProfile}
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

// const fetchWeatherData = () => {
//   if (location.latitude && location.longitude) {
//     getForecastWeather(location, APIKey)
//       .then((data) => {
//         setWeatherData(filterDataFromWeatherApi(data));
//       })
//       .catch((err) => console.log(err));
//   }
// };
