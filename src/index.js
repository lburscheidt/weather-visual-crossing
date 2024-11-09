import "./style.css";
//import {
//	getCurrentWeather,
//	getHourlyWeather,
//	getTomorrowWeather,
//	getWeatherData,
//	getWeeklyForecast,
//} from "./getWeather";
//import {
//	renderForecast,
//	renderHourlyData,
//	renderHourlyMax,
//	renderPage,
//	renderPrecipData,
//	renderPrecipMax,
//	renderWeekly,
//	renderWindData,
//	renderWindMax,
//	unitGroup,
//} from "./renderWeather";

import { assignVariables, renderCurrentWeather } from "./renderWeather";

const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");
const tomorrowBtn = document.querySelector("#tomorrow-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");


//console.log(currentFields);

// export function assignVariables() {
// 	for (const field of currentFields) {
// 		let fieldId = `${field.id}`;
// 		fieldId = document.getElementById(`${fieldId}`);
// 	}
// }

assignVariables();
renderCurrentWeather("Berlin", "metric");

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
