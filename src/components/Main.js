import { useEffect, useState, useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
//TODO Delete the import statement below if unneeded
// import { defaultClothingItems } from "../utils/constants";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  console.log("The weather temp in Main is", weatherTemp);
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const weatherTempString = String(weatherTemp[currentTemperatureUnit]).split("°", 2);
  console.log("Weather Temp Spring", weatherTempString);
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

  const filteredCards = clothingItems.filter((item) => {
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
            return <ItemCard key={card.id} card={card} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
