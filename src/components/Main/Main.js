import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function Main({ currentTemp, skyCondition, cards, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherType = getWeatherType();

  const filteredCards = cards.filter((item) => {
    return item.weather?.toLowerCase() === weatherType;
  });

  function getWeatherType() {
    if (currentTemp?.temp?.main >= 86) {
      return "hot";
    } else if (currentTemp?.temp?.main >= 66 && currentTemp?.temp?.main <= 85) {
      return "warm";
    } else if (currentTemp?.temp?.main <= 65) {
      return "cold";
    }
  }

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
                // handleSelectedCard={handleSelectedCard}
                // handleLike={handleLike}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

// function Main({ currentTemp, skyCondition, cards, onCardClick, onCardLike }) {
//   const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

//   const weatherType = getWeatherType();

//   const filteredCards = cards.filter((item) => {
//     return item.weather?.toLowerCase() === weatherType;
//   });

//   function getWeatherType() {
//     if (tempObj?.temp?.main >= 86) {
//       return "hot";
//     } else if (tempObj?.temp?.main >= 66 && tempObj?.temp?.main <= 85) {
//       return "warm";
//     } else if (tempObj?.temp?.main <= 65) {
//       return "cold";
//     }
//   }

// const weatherTempString = String(weatherData[currentTemperatureUnit]).split("°", 2);
// const weatherTempNumber = weatherTempString[0] || 999;
// const weatherTempUnit = weatherTempString[1] || "F";

// const getWeatherTypeFareneheit = () => {
//   if (weatherTempNumber >= 86) {
//     return "hot";
//   } else if (weatherTempNumber >= 66 && weatherTempNumber <= 85) {
//     return "warm";
//   } else if (weatherTempNumber <= 65) {
//     return "cold";
//   }
// };

// const getWeatherTypeCelsius = () => {
//   if (weatherTempNumber >= 30) {
//     return "hot";
//   } else if (weatherTempNumber >= 18 && weatherTempNumber <= 29) {
//     return "warm";
//   } else if (weatherTempNumber <= 17) {
//     return "cold";
//   }
// };

// const getWeatherType = () => {
//   if (currentTemperatureUnit === "F") {
//     return getWeatherTypeFareneheit();
//   }
//   if (currentTemperatureUnit === "C") {
//     return getWeatherTypeCelsius();
//   }
// };

// const weatherType = getWeatherType();

// const filteredCards = cards.filter((item) => {
//   return item.weather.toLowerCase() === weatherType;
// });

//   return (
//     <main>
//       <WeatherCard
//         day={true}
//         type="clear"
//         weatherTemp={weatherTempNumber}
//         weatherUnit={weatherTempUnit}
//       />
//       <section className="card-section">
//         Today is {weatherTempNumber}°{weatherTempUnit} / You may want to wear:
//         <div className="card-section__items">
//           {filteredCards.map((card) => {
//             return (
//               <ItemCard
//                 key={card.id}
//                 card={card}
//                 onCardClick={onCardClick}
//                 onCardLike={onCardLike}
//               />
//             );
//           })}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Main;
