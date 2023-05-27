import { weatherOptions } from "../utils/constants";
function WeatherCard({ day, type, weatherTemp = "" }) {
  const findWeather = (weatherOption) => {
    return weatherOption.day === day && weatherOption.type === type;
  };

  const weatherOption = weatherOptions.find(findWeather);
  const weatherPath = weatherOption.url || "";
  console.log("WeatherCard");
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}</div>
      <img alt="weather-app" src={weatherPath} className="weather__image" />
    </section>
  );
}

export default WeatherCard;
