import { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import avatarPath from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  handleAddCardClick,
  openLoginModal,
  openSignUpModal,
  setCurrentUser,
  onCreateModal,
  location,
}) => {
  //* Get the current date
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  //* Get the current city
  const { city } = weatherData;
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logoPath} alt="logo" className="header__logo" />
        </Link>
        <h2 className="header__date">
          {currentDate}, {city}
        </h2>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {currentUser ? (
          <>
            <button className="header__button" type="text" onClick={handleAddCardClick}>
              + Add Clothes
            </button>
            <Link className="header__profile-link" to="/profile">
              <div className="header__name">
                {currentUser ? currentUser.name : "Terrence Tegegne"}
              </div>
              {currentUser && (
                <img className="header__avatar" src={currentUser.avatar} alt="avatar" />
              )}
            </Link>
          </>
        ) : (
          <>
            <span className="header__button" onClick={openLoginModal}>
              Log in
            </span>
            <span className="header__button" onClick={openSignUpModal}>
              Sign up
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
