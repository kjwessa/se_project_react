import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ card, handleCardLike, handleSelectedCard }) => {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const isLiked = card.likes.some((user) => {
    return user === currentUser?._id;
  });

  const handleLikeClick = () => {
    handleCardLike(card._id, isLiked);
  };
  //TODO Polish the UI and improve the classes
  return (
    <div className="card-section__container">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="card-section__image"
        onClick={() => handleSelectedCard(card)}
      />
      <div className="card-section__name-wrap">
        <p className="card-section__name">{card.name}</p>
        {isLoggedIn && (
          <button
            onClick={handleLikeClick}
            className={
              isLiked ? "card__like-button card__like-button_active" : "card__like-button"
            }></button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
