import logoPath from "../images/logo.svg";
import avatarPath from "../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__left">
        <img src={logoPath} alt="logo" className="header__logo" />
        <div>Date</div>
      </div>
      <div className="header__right">
        <button type="text" onClick={onCreateModal}>
          + New Clothes
        </button>
        <div>Name</div>
        <img src={avatarPath} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
