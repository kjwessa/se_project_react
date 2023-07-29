//* Import React
import { useEffect, useState } from "react";
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

  //* State: User, Token & LoggedIn
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //* State: Cards
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  //* Profile Handlers: Register, Login, SignOut, Edit Profile
  const handleRegistration = (data) => {
    setIsLoading(true);
    console.log("App: Set isLoading to true");
    const { email, password } = data;
    console.log("App: Handling sign up with:", data);
    auth
      .signUp(data)
      .then((res) => {
        console.log("Handle Registration: Got signUp response:", res);
        handleLogin({ email, password });
        console.log("Handle Registration: Signed up, now logging in");
        handleCloseModal();
      })
      .catch((err) => {
        console.log("Handle Registration: Registration Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (data) => {
    setIsLoading(true);
    console.log("App: Set isLoading to true");
    console.log("App: Handling login with:", data);
    auth
      .signIn(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        console.log("App: Set Token in Local Storage");
        auth.checkToken(res.token).then((res) => {
          setCurrentUser(res.data);
          console.log("App: Set Current User");
          setIsLoggedIn(true);
          console.log("App: Set Is Logged In to True");
        });
        handleCloseModal();
      })
      .catch((err) => {
        if (err === "Error: 401") {
          setInvalidPassword(true);
        }
        console.error(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    console.log("Signing out user");
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleEditProfile = (data) => {
    setIsLoading(true);
    console.log("App: Set isLoading to true");
    console.log("App: Handling edit profile with:", data);
    const token = localStorage.getItem("jwt");
    auth
      .updateProfile(data, token)
      .then((res) => {
        setCurrentUser(res);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("App: Set isLoading to false");
      });
  };

  //* Weather Handlers: Weather Toggle Switch
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //* Modal Handlers: Open, Close
  const handleOpenModal = (modalName) => {
    console.log("Opening modal:", modalName);
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    console.log("Closing active modal");
    setActiveModal("");
  };

  const handleClickOutsideModal = (e) => {
    console.log("Clicked outside modal");
    if (e.target.classList.contains("modal")) {
      handleCloseModal();
    }
  };

  //* Card Handlers: Click, Add, Delete, Like
  const handleAddCardSubmit = (data) => {
    setIsLoading(true);
    console.log("App: Set isLoading to true");
    const { name, imageUrl, weather } = data;
    console.log("Handling add card submit with:", data);
    api
      .addCard({ name, imageUrl, weather }, localStorage.getItem("jwt"))
      .then((newCard) => {
        console.log("App: Got add card response:", newCard);
        setCards([newCard, ...cards]);
        console.log("App: Updated cards state with new card");
        handleCloseModal();
        console.log("App: Closed modals after adding card");
        api
          .getCards()
          .then((data) => {
            const byDate = data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
            setCards(byDate);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error adding card:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDeleteSubmit = () => {
    setIsDeleting(true);
    api
      .deleteCard(selectedCard._id, token)
      .then(() => {
        setCards((cards) => cards.filter((c) => c.id !== selectedCard._id));
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  //* Card Handlers: Like, Unlike, Click
  const handleCardLike = (id, isLiked) => {
    console.log("App: Handling card like with:", id, isLiked);
    const jwt = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(id, jwt)
          .then((updatedCard) => {
            console.log("Handling Card Like for: ", id, jwt);
            setCards((cards) => cards.map((card) => (card._id === id ? updatedCard.data : card)));
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, jwt)
          .then((updatedCard) => {
            console.log("Handling Card Unlike");
            setCards((cards) => cards.map((card) => (card._id === id ? updatedCard.data : card)));
          })
          .catch((err) => console.log(err));
  };

  const handleSelectedCard = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    console.log("Set selected card to:", card);
    setActiveModal("preview");
    console.log("Opened preview modal");
  };

  //* User Handlers: Check Token
  const confirmToken = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("user not found", err.message);
        });
    }
  };
  //* useEffect: Render Cards
  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        const byDate = data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        setCards(byDate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //* useEffect: Get Weather Data
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

  //* useEffect: Close Modal on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  //* useEffect: Confirm JWT Token
  useEffect(() => {
    confirmToken();
    console.log(localStorage.getItem("jwt"));
  }, [localStorage.getItem("jwt")]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header city={city} onModalOpen={handleOpenModal} />
          <Switch>
            <Route exact path="/">
              <Main
                currentTemp={currentTemp}
                skyCondition={skyCondition}
                cards={cards}
                handleCardLike={handleCardLike}
                handleSelectedCard={handleSelectedCard}
              />
            </Route>
            <ProtectedRoute path="/profile">
              <Route path="/profile">
                <Profile
                  cards={cards}
                  onModalOpen={handleOpenModal}
                  handleSelectedCard={handleSelectedCard}
                  handleCardLike={handleCardLike}
                  onSignOut={handleSignOut}
                />
              </Route>
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              modalName={"create"}
              formTitle={"Add Item"}
              buttonText={"Add Item"}
              onAddItem={handleAddCardSubmit}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              modalName={"preview"}
              card={selectedCard}
              onCardDelete={handleCardDeleteSubmit}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
              onModalOpen={handleOpenModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              modalName={"register"}
              formTitle={"Sign up"}
              buttonText={"Next"}
              orButtonText={"or Login"}
              onModalOpen={handleOpenModal}
              onRegister={handleRegistration}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              modalName={"login"}
              formTitle={"Log In"}
              buttonText={"Log In"}
              orButtonText={"or Register"}
              onModalOpen={handleOpenModal}
              invalidPassword={invalidPassword}
              setInvalidPassword={setInvalidPassword}
              onLogin={handleLogin}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
            />
          )}
          {activeModal === "confirmation" && (
            <ConfirmationModal
              modalName={"confirmation"}
              onDeleteSubmit={handleCardDeleteSubmit}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              modalName={"edit"}
              formTitle={"Change Profile Data"}
              buttonText={"Submit"}
              onUpdateUser={handleEditProfile}
              onModalClose={handleCloseModal}
              onClickOutsideModal={handleClickOutsideModal}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
