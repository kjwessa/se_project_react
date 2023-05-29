const ItemModal = ({ selectedCard, onClose }) => {
  console.log("ItemModal");
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose} type="button">
          Close
        </button>
        <img src={selectedCard.link} />
        <div>{selectedCard.name}</div>
        <div>Weather Type: {selectedCard.weather}</div>
      </div>
    </div>
  );
};

export default ItemModal;
