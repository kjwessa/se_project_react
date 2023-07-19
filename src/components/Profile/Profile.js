import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/SideBar";

export function Profile({ cards, onAddNewClick, onSelectCard, onCreateModal }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onAddNewClick={onAddNewClick}
        cards={cards}
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
      />
    </section>
  );
}

export default Profile;
