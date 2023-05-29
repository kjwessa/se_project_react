import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";

const Header = ({ onCreateModal, location }) => {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logoPath} alt="logo" className="header__logo" />
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__right">
        <button className="header__button" type="text" onClick={onCreateModal}>
          + New Clothes
        </button>
        <div className="header__name">Name</div>
        <img src={avatarPath} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
