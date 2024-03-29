import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function SideBar({ onModalOpen, onSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__meta-wrap">
        {currentUser.avatar ? (
          <img className="header__avatar_set_true" src={currentUser.avatar} alt="avatar" />
        ) : (
          <p className="header__avatar_set_false">{currentUser.name.charAt(0).toUpperCase()}</p>
        )}
        <div className="sidebar__username">
          {currentUser ? currentUser.name : "Please, log in."}
        </div>
      </div>
      <div className="sidebar__container">
        <button
          className="sidebar__edit-profile sidebar__button"
          type="button"
          onClick={() => onModalOpen("edit")}>
          Change Profile Data
        </button>
        <button className="sidebar__signout sidebar__button" type="button" onClick={onSignOut}>
          Log Out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
