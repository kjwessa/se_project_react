import closeButton from "../../images/close-icon-white.svg";

const ItemModal = ({ card, onCardDelete, onModalClose, onClickOutsideModal }) => {
  return (
    <div className={`modal`} onMouseDown={onClickOutsideModal}>
      <div className="modal__content item-modal__content">
        <img
          className="modal__close-button"
          onClick={onModalClose}
          src={closeButton}
          alt="close-icon"
        />
        <img src={card.imageUrl} alt={card.name} className="item-modal__image" />
        <div className="item-modal__bottom">
          <div>{card.name}</div>
          <div>Weather Type: {card.weather}</div>
          <button className="item-modal__delete" onClick={() => onCardDelete(card)}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
