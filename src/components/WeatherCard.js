import { weatherOptions } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ day, type, weatherTemp, weatherUnit = "" }) {
  const findWeather = (weatherOption) => {
    return weatherOption.day === day && weatherOption.type === type;
  };

  const weatherOption = weatherOptions.find(findWeather);
  const weatherPath = weatherOption.url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{weatherUnit}
      </div>
      <img alt="weather-app" src={weatherPath} className="weather__image" />
    </section>
  );
}

export default WeatherCard;
