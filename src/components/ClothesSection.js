import ItemCard from "./ItemCard";

export function ClothesSection({ onSelectCard, clothingItems }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__text">
        <h2 className="clothes-section__your-items">Your items</h2>
        <h2 className="clothes-section__add-new">+ Add new</h2>
      </div>
      <div className="clothes-section__items">
        {clothingItems.map((card) => {
          return <ItemCard key={card.id} card={card} onSelectCard={onSelectCard} />;
        })}
      </div>
    </section>
  );
}

export default ClothesSection;
