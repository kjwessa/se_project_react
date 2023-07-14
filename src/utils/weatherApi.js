import { latitude, longitude, APIkey } from "./constants";
import { checkStatus } from "./api";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkStatus);
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
