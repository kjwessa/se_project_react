import { latitude, longitude, APIkey } from "./constants";
import { processServerResponse } from "./api";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;

  return Math.ceil(temperature);
};

export const parseWeatherLocation = (data) => {
  const city = data.name;
  return city;
};
