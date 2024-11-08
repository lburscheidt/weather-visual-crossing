import "./style.css";

import { getWeatherData } from "./getWeather";
//import { renderWeather } from "./renderWeather";
import { renderHourlyData } from "./renderWeather";
import { renderHourlyMax } from "./renderWeather";
import { renderPrecipData } from "./renderWeather";
import { renderPrecipMax } from "./renderWeather";
import { renderWindData } from "./renderWeather";
import { renderWindMax } from "./renderWeather";
import { renderForecast } from "./renderWeather";
import { renderWeekly } from "./renderWeather";
import { renderPage } from "./renderWeather";
import { unitGroup } from "./renderWeather";

const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");
const tomorrowBtn = document.querySelector("#tomorrow-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");

searchBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	await renderPage(city, units);
});

windBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderWindMax(weather);
	renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderPrecipMax(weather);
	renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderHourlyMax(weather);
	renderHourlyData(weather.hourlyData);
});

weeklyBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderWeekly(weather);
});

tomorrowBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderForecast(weather);
});
