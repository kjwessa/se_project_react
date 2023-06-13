import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

export function Profile({ onSelectCard, clothingItems, onCreateModal }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
      />
    </section>
  );
}

export default Profile;
