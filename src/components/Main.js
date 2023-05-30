import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";

function Main({ weatherTemp, onSelectCard }) {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = defaultClothingItems.filter((clothingItem) => {
    return clothingItem.weather.toLowerCase() === weatherType;
  });

  return (
    <main>
      <WeatherCard day={true} type="clear" weatherTemp={weatherTemp} />
      <section className="card-section">
        Today is {weatherTemp}° F / You may want to wear:
        <div className="card-section__items">
          {filteredCards.map((card) => {
            return <ItemCard key={card._id} card={card} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
