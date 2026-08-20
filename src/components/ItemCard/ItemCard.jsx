import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, handleCardLike, handleSelectedCard }) => {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((user) => {
    return user === currentUser?._id;
  });

  const handleLikeClick = () => {
    handleCardLike(item._id, isLiked);
  };

  return (
    <div className="card-section__container">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => handleSelectedCard(item)}
      />
      <div className="card__name-wrap">
        <p className="card__name">{item.name}</p>
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
