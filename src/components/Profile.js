import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

export function Profile({ onSelectCard, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} onSelectCard={onSelectCard} />
    </section>
  );
}

export default Profile;
