import { useEffect, useState, useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
// import { defaultClothingItems } from "../utils/constants";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  console.log("These are the clothing items passed into Main", clothingItems);
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
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

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main>
      <WeatherCard day={true} type="clear" weatherTemp={temp} />
      <section className="card-section">
        Today is {temp}° F / You may want to wear:
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
