import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/SideBar";

export function Profile({ cards, onModalOpen, handleSelectedCard, handleCardLike, onSignOut }) {
  return (
    <section className="profile">
      <SideBar onModalOpen={onModalOpen} onSignOut={onSignOut} />
      <ClothesSection
        cards={cards}
        onModalOpen={onModalOpen}
        handleSelectedCard={handleSelectedCard}
        handleCardLike={handleCardLike}
      />
    </section>
  );
}

export default Profile;
