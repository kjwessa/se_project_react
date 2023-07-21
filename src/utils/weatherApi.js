import { latitude, longitude, APIKey, dayWeatherCards, nightWeatherCards } from "./constants";
import { checkStatus } from "./api";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
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

export const filterDataFromWeatherApi = (data) => {
  if (!data) {
    return null;
  }

  const weather = {};

  weather.city = data.name;
  weather.temperature = data.main.temp;
  weather.condition = () => {
    if (data.main.temp >= 86) {
      return "hot";
    } else if (data.main.temp >= 66 && data.main.temp < 85) {
      return "warm";
    } else if (data.main.temp <= 65) {
      return "cold";
    }
  };
  return weather;
};
