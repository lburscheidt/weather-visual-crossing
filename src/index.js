import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderWeekly,
	renderTomorrowWeather,
} from "./renderWeather";


const hourlyBtn = document.querySelector("#hourlyBtn");
const windBtn = document.querySelector("#windBtn");
const precipBtn = document.querySelector("#precipBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const weeklyBtn = document.querySelector("#weeklyBtn");
const searchBtn = document.querySelector("#searchBtn");
const locationSearch = document.querySelector("#location");

window.onload = () => {
	assignVariables();
	renderCurrentWeather("Berlin", "metric");
	renderTomorrowWeather("Berlin", "metric");
};
//getTomorrowData("Berlin", "metric");
//getCurrentData("Berlin", "metric")
//renderWeekly("Berlin", "metric");
//render

weeklyBtn.addEventListener("click", () => {
	renderWeekly("Berlin", "metric");
});

tomorrowBtn.addEventListener("click", () => {
	renderTomorrowWeather("Berlin", "metric");
});

//getWeeklyForecast();

// getCurrentWeather("Berlin", "metric");
// getHourlyWeather("Berlin", "metric");
// getTomorrowWeather("Berlin", "metric");
//
// searchBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	await renderPage(city, units);
// });
//
// windBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	const weather = await getWeatherData(city, units);
// 	renderWindMax(weather);
// 	renderWindData(weather.hourlyData);
// });
//
// precipBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	const weather = await getWeatherData(city, units);
// 	renderPrecipMax(weather);
// 	renderPrecipData(weather.hourlyData);
// });
//
// hourlyBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	const weather = await getWeatherData(city, units);
// 	renderHourlyMax(weather);
// 	renderHourlyData(weather.hourlyData);
// });
//
// weeklyBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	const weather = await getWeatherData(city, units);
// 	renderWeekly(weather);
// });
//
// tomorrowBtn.addEventListener("click", async () => {
// 	let city;
// 	let units;
// 	if (locationSearch.value.length === 0) {
// 		city = "Berlin";
// 		units = "metric";
// 	} else {
// 		city = locationSearch.value;
// 		units = unitGroup.value;
// 	}
// 	const weather = await getWeatherData(city, units);
// 	renderForecast(weather);
// });
//
