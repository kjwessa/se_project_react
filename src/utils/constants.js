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

//TODO Submission: remove code below
// export const baseUrl = "https://my-json-server.typicode.com/kjwessa/se_project_react";

// export const weatherOptions = [
//   {
//     url: require("../images/weatherConditions/day/clear.svg").default,
//     day: true,
//     type: "clear",
//   },
//   {
//     url: require("../images/weatherConditions/day/cloudy.svg").default,
//     day: true,
//     type: "cloud",
//   },
//   {
//     url: require("../images/weatherConditions/day/foggy.svg").default,
//     day: true,
//     type: "fog",
//   },
//   {
//     url: require("../images/weatherConditions/day/rainy.svg").default,
//     day: true,
//     type: "rain",
//   },
//   {
//     url: require("../images/weatherConditions/day/snowy.svg").default,
//     day: true,
//     type: "snow",
//   },
//   {
//     url: require("../images/weatherConditions/day/stormy.svg").default,
//     day: true,
//     type: "storm",
//   },
//   {
//     url: require("../images/weatherConditions/night/clear.svg").default,
//     day: false,
//     type: "clear",
//   },
//   {
//     url: require("../images/weatherConditions/night/cloudy.svg").default,
//     day: false,
//     type: "cloudy",
//   },
//   {
//     url: require("../images/weatherConditions/night/foggy.svg").default,
//     day: false,
//     type: "fog",
//   },
//   {
//     url: require("../images/weatherConditions/night/rainy.svg").default,
//     day: false,
//     type: "rain",
//   },
//   {
//     url: require("../images/weatherConditions/night/snowy.svg").default,
//     day: false,
//     type: "snow",
//   },
//   {
//     url: require("../images/weatherConditions/night/stormy.svg").default,
//     day: false,
//     type: "storm",
//   },
// ];
