//* UI Constants
import clearDay from "../images/weatherConditions/day/clearDay.svg";
import cloudyDay from "../images/weatherConditions/day/cloudyDay.svg";
import foggyDay from "../images/weatherConditions/day/foggyDay.svg";
import rainyDay from "../images/weatherConditions/day/rainyDay.svg";
import snowyDay from "../images/weatherConditions/day/snowyDay.svg";
import stormyDay from "../images/weatherConditions/day/stormyDay.svg";
import clearNight from "../images/weatherConditions/night/clearNight.svg";
import cloudyNight from "../images/weatherConditions/night/cloudyNight.svg";
import foggyNight from "../images/weatherConditions/night/foggyNight.svg";
import rainyNight from "../images/weatherConditions/night/rainyNight.svg";
import snowyNight from "../images/weatherConditions/night/snowyNight.svg";
import stormyNight from "../images/weatherConditions/night/stormyNight.svg";

//* Weather Constants
export const latitude = 30.4213;
export const longitude = -87.2169;
export const location = { latitude, longitude };
export const APIKey = "8f8faa090162b60e560bccce20cff5b2";

//* Server Constants
export const baseUrl = "http://localhost:3001";
// export const baseUrl = "https://my-json-server.typicode.com/kjwessa/se_project_react";

//* Weather Options
export const dayWeatherCards = {
  clear: clearDay,
  cloudy: cloudyDay,
  foggy: foggyDay,
  rainy: rainyDay,
  snowy: snowyDay,
  stormy: stormyDay,
};

export const nightWeatherCards = {
  clear: clearNight,
  cloudy: cloudyNight,
  foggy: foggyNight,
  rainy: rainyNight,
  snowy: snowyNight,
  stormy: stormyNight,
};
