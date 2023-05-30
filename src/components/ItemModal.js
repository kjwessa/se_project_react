import closeButton from "../images/close-icon-white.svg";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content item-modal__content">
        <img className="modal__close-button" onClick={onClose} src={closeButton} alt="close-icon" />
        <img src={selectedCard.link} alt={selectedCard.name} className="item-modal__image" />

        <div className="item-modal__bottom">
          <div>{selectedCard.name}</div>
          <div>Weather Type: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
