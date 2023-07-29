import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function Main({
  currentTemp,
  skyCondition,
  cards,
  handleCardLike,
  handleSelectedCard,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherType = getWeatherType();

  function getWeatherType() {
    if (currentTemp?.temp?.main >= 86) {
      return "hot";
    } else if (currentTemp?.temp?.main >= 66 && currentTemp?.temp?.main <= 85) {
      return "warm";
    } else if (currentTemp?.temp?.main <= 65) {
      return "cold";
    }
  }

  const filteredCards = cards.filter((item) => {
    return item.weather?.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard skyCondition={skyCondition} currentTemp={currentTemp} />
      <section className="card-section">
        Today is {currentTemp && currentTemp.temp[currentTemperatureUnit]} / You may want to wear:
        <div className="card-section__items">
          {Array.isArray(filteredCards) &&
            filteredCards.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handleCardLike={handleCardLike}
                handleSelectedCard={handleSelectedCard}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
