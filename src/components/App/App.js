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
  const [noAvatar, setNoAvatar] = useState("");
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
          setNoAvatar(currentUser?.name?.slice(0, 1));
          console.log("App: Set No Avatar");
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
    setNoAvatar("");
    setIsLoggedIn(false);
  };

  //TODO Update handleEdit Profile to pass through data + local storage
  const handleEditProfile = (name, avatar) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
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
  // const handleAddCardClick = () => {
  //   console.log("Create modal function called");
  //   setActiveModal("create");
  // };

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

  // const handleLike = (_id, isLiked) => {
  //   const jwt = localStorage.getItem("jwt");

  //   if (!isLiked) {
  //     api
  //       .addCardLike(_id, jwt)
  //       .then((like) => {
  //         setCards((cards) => cards.map((item) => (item._id === _id ? like.data : item)));
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     api
  //       .removeCardLike(_id, jwt)
  //       .then((unlike) => {
  //         setCards((cards) => cards.map((item) => (item._id === _id ? unlike.data : item)));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  //TODO Remove this function if not needed
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

  //* Card Handlers: Like, Unlike, Click
  // const handleCardLike = (card, isLiked) => {
  //   console.log("Handle like for card:", card);
  //   const { _id: id } = card;
  //   const token = localStorage.getItem("jwt");
  //   if (isLiked) {
  //     console.log("Card already liked, removing like...");
  //     api
  //       .removeCardLike(id, token)
  //       .then((updatedCard) => {
  //         console.log("Got updated card:", updatedCard);
  //         setCards((cards) =>
  //           cards.map((card) => {
  //             if (card._id === id) {
  //               return updatedCard.data;
  //             } else {
  //               return card;
  //             }
  //           })
  //         );
  //       })
  //       .catch((err) => {
  //         console.log("Error removing like:", err);
  //       });
  //   } else {
  //     console.log("Card not liked, adding like...");
  //     api.addCardLike(id, token).then().catch();
  //   }
  // };
  const handleCardLike = (card, isLiked) => {
    const token = localStorage.getItem("token");

    if (isLiked) {
      // Call API to unlike
      api
        .removeLike(card, token)
        .then((updatedCard) => {
          // Update cards state
          setCards((currentCards) => {
            return currentCards.map((c) => {
              if (c._id === card._id) {
                return updatedCard;
              } else {
                return c;
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Call API to like
      api
        .addLike(card, token)
        .then((updatedCard) => {
          // Update cards state
          setCards((currentCards) => {
            return currentCards.map((c) => {
              if (c._id === card._id) {
                return updatedCard;
              } else {
                return c;
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSelectedCard = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    console.log("Set selected card to:", card);
    setActiveModal("preview");
    console.log("Opened preview modal");
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
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn, noAvatar }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="page">
          <Header city={city} onModalOpen={handleOpenModal} onSignOut={handleSignOut} />
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
          {activeModal === "delete" && (
            <ConfirmationModal
              modalName={"delete"}
              formTitle={"Confirm Delete"}
              buttonText={"Delete"}
              handleDelete={handleCardDeleteSubmit}
              isLoading={isDeleting}
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

//TODO Submission: Remove code below
// const isReloading = (token) => {
//   console.log("App: Checking token...", token);
//   auth
//     .checkToken(token)
//     .then((res) => {
//       console.log("App: Token check response", res);
//       setCurrentUser(res.data);
//       handleCloseModal();
//       setAuthError("");
//       setToken(token);
//       console.log("App: User authenticated!");
//     })
//     .catch((err) => {
//       console.log("App: Error checking token", err);
//       setAuthError("App: Please enter a valid email and password");
//     });
// };

// useEffect(() => {
//   if (token) {
//     api
//       .getCards(token)
//       .then(({ data }) => {
//         setCards(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }, [token]);

//* useEffect: Check for valid token on load
// useEffect(() => {
//   console.log("App: Setting isLoading to true");
//   console.log("App:", currentUser);
//   setIsLoading(true);
//   const storedToken = localStorage.getItem("token");
//   if (storedToken) {
//     console.log("App: Found stored token", storedToken);
//   } else {
//     console.log("App: No stored token found");
//   }
//   if (storedToken) {
//     isReloading(storedToken);
//   }
//   setIsLoading(false);
// }, []);
