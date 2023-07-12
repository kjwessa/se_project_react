const ItemCard = ({ card, onSelectCard }) => {
  return (
    <div className="card-section__container">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="card-section__image"
        onClick={() => onSelectCard(card)}
      />
      <div className="card-section__name-wrap">
        <span className="card-section__name">{card.name}</span>
      </div>
    </div>
  );
};

export default ItemCard;
