const ItemCard = ({ card, onSelectCard }) => {
  return (
    <div>
      <div className="card-section__container">
        <img
          src={card.link}
          alt={card.name}
          className="card-section__image"
          onClick={() => onSelectCard(card)}
        />
        <div className="card-section__name-wrap">
          <span className="card-section__name">{card.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
