import { useContext } from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ city, onModalOpen }) => {
  const { currentUser, isLoggedIn, noAvatar } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

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
        {isLoggedIn ? (
          <>
            <button className="header__button" type="text" onClick={() => onModalOpen("create")}>
              + Add Clothes
            </button>
            <Link className="header__profile-link" to="/profile">
              <div className="header__name">
                {currentUser ? currentUser.name : "Terrence Tegegne"}
              </div>
              {currentUser ? (
                <img className="header__avatar_set_true" src={currentUser.avatar} alt="avatar" />
              ) : (
                <p className="header__avatar_set_false">{noAvatar}</p>
              )}
            </Link>
          </>
        ) : (
          <>
            <span className="header__button" onClick={() => onModalOpen("login")}>
              Log in
            </span>
            <span className="header__button" onClick={() => onModalOpen("register")}>
              Sign up
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

//TODO Remove this below if unneeded
// import avatarPath from "../../images/avatar.svg";
