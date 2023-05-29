const latitude = 30.4213;
const longitude = 87.2169;
const APIkey = "8f8faa090162b60e560bccce20cff5b2";
export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  console.log(data);
  const main = data.main;
  console.log(main);
  const temperature = main && main.temp;
  console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
};
