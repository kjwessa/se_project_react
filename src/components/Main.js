import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { useMemo } from "react";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else {
      return "cold";
    }
  }, [weatherTemp]);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((clothingItem) => {
    console.log(clothingItem);
    return clothingItem.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);
  return (
    <main>
      <WeatherCard day={true} type="clear" weatherTemp={weatherTemp} />
      <section className="card__section">
        Today is {weatherTemp} / You may want to wear:
        <div className="card-section__items">
          {filteredCards.map((clothingItem) => (
            <ItemCard clothingItem={clothingItem} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
