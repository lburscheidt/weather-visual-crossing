import "./style.css";
console.log("hello");
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
import { getWeatherData } from "./getWeather";
import { renderWeather } from "./renderWeather";

// import { weather } from "./renderWeather";
// console.log(weather);

const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");
