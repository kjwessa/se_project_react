import ItemCard from "./ItemCard";

export function ClothesSection({ onSelectCard, clothingItems, onCreateModal }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__text">
        <h2 className="clothes-section__your-items">Your items</h2>
        <button onClick={onCreateModal} className="clothes-section__add-new">
          + Add new
        </button>
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
