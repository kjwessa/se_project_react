import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/SideBar";

export function Profile({ cards, onModalOpen, handleSelectedCard, handleCardLike, handleSignOut }) {
  return (
    <section className="profile">
      <SideBar onModalOpen={onModalOpen} handleSignOut={handleSignOut} />
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
