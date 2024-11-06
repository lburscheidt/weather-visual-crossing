import "./style.css";
console.log("hello");

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
import { renderPage } from "./renderWeather";

const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");
const tomorrowBtn = document.querySelector("#tomorrow-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");
