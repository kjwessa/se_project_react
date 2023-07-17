import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ cards, weatherData, onCardClick, onCardLike }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const weatherTempString = String(weatherData[currentTemperatureUnit]).split("°", 2);
  const weatherTempNumber = weatherTempString[0] || 999;
  const weatherTempUnit = weatherTempString[1] || "F";

  const getWeatherTypeFareneheit = () => {
    if (weatherTempNumber >= 86) {
      return "hot";
    } else if (weatherTempNumber >= 66 && weatherTempNumber <= 85) {
      return "warm";
    } else if (weatherTempNumber <= 65) {
      return "cold";
    }
  };

  const getWeatherTypeCelsius = () => {
    if (weatherTempNumber >= 30) {
      return "hot";
    } else if (weatherTempNumber >= 18 && weatherTempNumber <= 29) {
      return "warm";
    } else if (weatherTempNumber <= 17) {
      return "cold";
    }
  };

  const getWeatherType = () => {
    if (currentTemperatureUnit === "F") {
      return getWeatherTypeFareneheit();
    }
    if (currentTemperatureUnit === "C") {
      return getWeatherTypeCelsius();
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = cards.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main>
      <WeatherCard
        day={true}
        type="clear"
        weatherTemp={weatherTempNumber}
        weatherUnit={weatherTempUnit}
      />
      <section className="card-section">
        Today is {weatherTempNumber}°{weatherTempUnit} / You may want to wear:
        <div className="card-section__items">
          {filteredCards.map((card) => {
            return (
              <ItemCard
                key={card.id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
