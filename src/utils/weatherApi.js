import { latitude, longitude, APIKey, dayWeatherCards, nightWeatherCards } from "./constants";
import { checkStatus } from "./api";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  ).then(checkStatus);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const weather = { temp: {} };
  weather.temp.main = Math.ceil(data.main.temp);
  weather.temp.F = `${Math.round(data.main.temp)}°F`;
  weather.temp.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.temp.weather = data.weather[0].main;
  return weather;
};

export const getWeatherCard = (data) => {
  if (Date.now() / 1000 > data.sys.sunrise) {
    if (data.weather[0].id >= 800 && data.weather[0].id <= 801) {
      return dayWeatherCards.clear;
    } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
      return dayWeatherCards.cloudy;
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
      return dayWeatherCards.foggy;
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      return dayWeatherCards.snowy;
    } else if (
      (data.weather[0].id >= 500 && data.weather[0].id <= 531) ||
      (data.weather[0].id >= 300 && data.weather[0].id <= 321)
    ) {
      return dayWeatherCards.rainy;
    } else if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      return dayWeatherCards.stormy;
    }
  } else if (Date.now() / 1000 > data.sys.sunset || Date.now() / 1000 < data.sys.sunrise) {
    if (data.weather[0].id >= 800 && data.weather[0].id <= 801) {
      return nightWeatherCards.clear;
    } else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
      return nightWeatherCards.cloudy;
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
      return nightWeatherCards.foggy;
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
      return nightWeatherCards.snowy;
    } else if (
      (data.weather[0].id >= 500 && data.weather[0].id <= 531) ||
      (data.weather[0].id >= 300 && data.weather[0].id <= 321)
    ) {
      return nightWeatherCards.rainy;
    } else if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
      return nightWeatherCards.stormy;
    }
  }
};

//TODO Submission: remove code below
// export const parseWeatherData = (data) => {
//   const main = data.main;
//   const temperature = main && main.temp;

//   return Math.ceil(temperature);
// };
// export const parseWeatherLocation = (data) => {
//   const city = data.name;
//   return city;
// };

// export const filterDataFromWeatherApi = (data) => {
//   if (!data) {
//     return null;
//   }

//   const weather = {};

//   weather.city = data.name;
//   weather.temperature = data.main.temp;
//   weather.condition = () => {
//     if (data.main.temp >= 86) {
//       return "hot";
//     } else if (data.main.temp >= 66 && data.main.temp < 85) {
//       return "warm";
//     } else if (data.main.temp <= 65) {
//       return "cold";
//     }
//   };
//   return weather;
// };
