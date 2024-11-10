import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderWeekly,
	renderTomorrowWeather,
	renderHourlyWeather,
} from "./renderWeather";
import { formatNames } from "ajv-formats/dist/formats";

const hourlyBtn = document.querySelector("#hourlyBtn");
const windBtn = document.querySelector("#windBtn");
const precipBtn = document.querySelector("#precipBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const weeklyBtn = document.querySelector("#weeklyBtn");
const searchBtn = document.querySelector("#searchBtn");
const locationSearch = document.querySelector("#location");

//window.onload = () => {
//	assignVariables();
//renderCurrentWeather("Berlin", "metric");
//	renderTomorrowWeather("Berlin", "metric");
//	tomorrowBtn.classList.add("active");
//	hourlyBtn.classList.add("active");
//};
//getTomorrowData("Berlin", "metric");
//getCurrentData("Berlin", "metric")
//renderWeekly("Berlin", "metric");
//render

renderHourlyWeather("Berlin", "metric");

windBtn.addEventListener("click", () => {
	const cardTemp = document.querySelectorAll(".hourlyTemp");
	const cardWindspeed = document.querySelectorAll(".hourlyWindspeed");
	const cardIcon = document.querySelectorAll(".hourlyTempIcon");
	const windIcon = document.querySelectorAll(".windIcon");
	const cardPrecip = document.querySelectorAll(".hourlyPrecip");

	for (const wind of cardWindspeed) {
		wind.classList.remove("hidden");
		wind.classList.add("visible");
	}
	for (const icon of windIcon) {
			icon.classList.remove("hidden");
			icon.classList.add("visible");
		}
	
	for (const card of cardPrecip) {
		if (card.classList.contains("visible")) {
			card.classList.remove("visible");
			card.classList.add("hidden");
		}
	}
	for (const temp of cardTemp) {
		if (temp.classList.contains("visible")) {
			temp.classList.remove("visible");
			temp.classList.add("hidden");
		}
	}
	for (const icon of cardIcon) {
		if (icon.classList.contains("visible")) {
			icon.classList.remove("visible");
			icon.classList.add("hidden");
		}
	}
});

weeklyBtn.addEventListener("click", () => {
	renderWeekly("Berlin", "metric");
	weeklyBtn.classList.add("active");
	tomorrowBtn.classList.remove("active");
});

tomorrowBtn.addEventListener("click", () => {
	renderTomorrowWeather("Berlin", "metric");
	weeklyBtn.classList.remove("active");
	tomorrowBtn.classList.add("active");
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
const hourlyTemps = document.querySelectorAll("hourlyTemp");
const hourlyWindspeed = document.querySelectorAll("hourlyWindspeed");
const hourlyPrecip = document.querySelectorAll("hourlyPrecip");

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
	renderHourlyWeather(location, unitgroup);
});
//
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
