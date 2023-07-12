import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/SideBar";

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
