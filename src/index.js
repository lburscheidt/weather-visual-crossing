import "./style.css";
console.log("hello");
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
import { getWeatherData } from "./getWeather";
import { renderWeather } from "./renderWeather";
import { renderHourlyData } from "./renderWeather";
import { renderHourlyMax } from "./renderWeather";
import { renderPrecipData } from "./renderWeather";
import { renderPrecipMax } from "./renderWeather";
import { renderWindData } from "./renderWeather";
import { renderWindMax } from "./renderWeather";
import { renderForecast } from "./renderWeather";
import { renderWeekly } from "./renderWeather";

const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");
const tomorrowBtn = document.querySelector("#tomorrow-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");

document.addEventListener("DOMContentLoaded", async function () {
  let city = "Berlin";
  let units = "metric";
  let weather = await getWeatherData(city, units);
  renderWeather(weather);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
  renderForecast(weather);
});

searchBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWeather(weather);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
  renderForecast(weather);
});

windBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWindMax(weather);
  renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderPrecipMax(weather);
  renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
});

weeklyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWeekly(weather);
});

tomorrowBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderForecast(weather);
});
