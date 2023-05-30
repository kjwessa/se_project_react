import closeButton from "../images/close-icon.svg";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <img className="modal__close-button" onClick={onClose} src={closeButton} alt="close-icon" />
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div>{selectedCard.name}</div>
        <div>Weather Type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
