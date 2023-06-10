import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, location }) => {
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
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__button" type="text" onClick={onCreateModal}>
          + New Clothes
        </button>
        <Link className="header__profile-link" to="/profile">
          <div className="header__name">Terrence Tegegne</div>
        </Link>
        <img src={avatarPath} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
