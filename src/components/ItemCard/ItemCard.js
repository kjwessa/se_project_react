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
  //TODO Polish the UI and improve the classes
  return (
    <div className="card-section__container">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card-section__image"
        onClick={() => handleSelectedCard(item)}
      />
      <div className="card-section__name-wrap">
        <p className="card-section__name">{item.name}</p>
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

// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// export default function ItemCard({ card, handleSelectedCard, handleLike }) {
//   const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

//   const isLiked = card.likes.some((user) => {
//     return user === currentUser?._id;
//   });

//   const handleLikeClick = () => {
//     handleLike(card._id, isLiked);
//   };

//   return (
//     <div className="card">
//       <img
//         className="card__image"
//         src={item.imageUrl}
//         alt={item.name}
//         onClick={() => handleSelectedCard(item)}
//       />
//       <div className="card__name-container">
//         <p className="card__name">{item.name}</p>
//         {isLoggedIn && (
//           <button
//             onClick={handleLikeClick}
//             className={
//               isLiked ? "card__like-button card__like-button_active" : "card__like-button"
//             }></button>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useContext } from "react";
// import HeartLiked from "../../images/likeIconActive.png";
// import HeartNotLiked from "../../images/likeIconInactive.svg";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// const ItemCard = ({ card, onCardClick, onCardLike }) => {
//   const currentUser = useContext(CurrentUserContext);

//   const isLiked = card.likes.some((card) => card === currentUser._id);
//   const cardClassName = `card ${currentUser === null ? "card__invisible" : "card__visible"}`;

//   const renderNotLiked = () => {
//     return (
//       <button onClick={() => onCardLike(card, isLiked)} className="card__like-button">
//         <img src={HeartLiked} alt="This item has been liked" />
//       </button>
//     );
//   };

//   const renderLiked = () => {
//     return (
//       <button onClick={() => onCardLike(card, isLiked)} className="card__like-button">
//         <img src={HeartNotLiked} alt="This item has not been liked" />
//       </button>
//     );
//   };

//   return (
//     <div className={cardClassName}>
//       <div className="card__header">
//         <div className="card__name">{card.name}</div>
//         {isLiked ? renderLiked() : renderNotLiked()}
//       </div>

//       <img
//         className="card__image"
//         src={card.imageUrl || card.link}
//         alt={card.name}
//         onClick={() => {
//           onCardClick(card);
//         }}
//       />
//     </div>
//   );
// };

// export default ItemCard;
// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// const ItemCard = ({ card, onCardLike, handleSelectedCard }) => {
//   // Default to empty array
//   const likes = card.likes || [];

//   const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

//   const isLiked = likes.some((id) => id === currentUser._id);

//   const handleLikeClick = () => {
//     onCardLike(card._id, isLiked);
//   };

//   return (
//     <div className="card-section__container">
//       <img
//         src={card.imageUrl}
//         alt={card.name}
//         className="card-section__image"
//         onClick={() => handleSelectedCard(card)}
//       />

//       <div className="card-section__name-wrap">
//         <p className="card-section__name">{card.name}</p>

//         {isLoggedIn && likes && (
//           <button onClick={handleLikeClick} className={isLiked ? "liked" : ""}>
//             {likes.length} 👍
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

//TODO Submission: Remove this below if unneeded
