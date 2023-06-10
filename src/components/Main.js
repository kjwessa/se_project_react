import React, { useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  console.log(currentTemperatureUnit);
  const getWeatherType = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
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
      <WeatherCard day={true} type="clear" weatherTemp={temp} />
      <section className="card-section">
        Today is {temp}° F / You may want to wear:
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
