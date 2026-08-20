import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ currentTemp, skyCondition }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{currentTemp && currentTemp.temp[currentTemperatureUnit]}</div>
      <img
        alt={`Sky condition: ${currentTemp?.temp?.weather}`}
        className="weather__image"
        src={skyCondition}
      />
    </section>
  );
}

export default WeatherCard;
