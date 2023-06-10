import avatarPath from "../images/avatar.svg";

export function SideBar() {
  return (
    <section className="sidebar">
      <div className="sidebar__info">
        <img src={avatarPath} alt="logo" className="sidebar__avatar" />
        <div className="sidebar__name">Terrence Tegegne</div>
      </div>
    </section>
  );
}

export default SideBar;
