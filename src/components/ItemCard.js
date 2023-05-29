const ItemCard = ({ clothingItem, onSelectCard }) => {
  return (
    <div>
      <div className="card-section__container">
        <img
          src={clothingItem.link}
          alt={clothingItem.name}
          className="card-section__image"
          onClick={() => onSelectCard(clothingItem)}
        />
        <div className="card-section__name">
          <span className="card-section__span">{clothingItem.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
