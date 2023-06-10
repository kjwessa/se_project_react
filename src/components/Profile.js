import ClothesSection from "./ClothesSection";
import Sidebar from "./Sidebar";

export function Profile({ onSelectCard, clothingItems }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection clothingItems={clothingItems} onSelectCard={onSelectCard} />
    </section>
  );
}

export default Profile;
