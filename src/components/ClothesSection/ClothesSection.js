import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function ClothesSection({ cards, onModalOpen, handleSelectedCard, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(cards);
  const filteredCards = cards.filter((item) => {
    return item.owner === currentUser?._id;
  });

  // const filteredCards = cards.filter((item) => {
  //   return item.weather?.toLowerCase() === weatherType;
  // });

  console.log(filteredCards);
  return (
    <section className="clothes-section">
      <div className="clothes-section__text">
        <h2 className="clothes-section__your-items">Your items</h2>
        <button onClick={() => onModalOpen("create")} className="clothes-section__add-new">
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">
        {Array.isArray(filteredCards) &&
          filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              handleSelectedCard={handleSelectedCard}
              handleCardLike={handleCardLike}
            />
          ))}
      </div>
    </section>
  );
}

export default ClothesSection;

// import { useContext } from "react";
// import ItemCard from "../ItemCard/ItemCard";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// export function ClothesSection({ onSelectCard, cards, onCreateModal, onAddNewClick }) {
//   const { currentUser } = useContext(CurrentUserContext);
//   return (
//     <section className="clothes-section">
//       <div className="clothes-section__text">
//         <h2 className="clothes-section__your-items">Your items</h2>
//         <button onClick={onAddNewClick} className="clothes-section__add-new">
//           + Add new
//         </button>
//       </div>
//       <div className="clothes-section__items">
//         {cards.map((card) => {
//           return <ItemCard key={card._id} card={card} onSelectCard={onSelectCard} />;
//         })}
//       </div>
//     </section>
//   );
// }

// export default ClothesSection;
