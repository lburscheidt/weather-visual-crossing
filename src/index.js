import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderWeekly,
	renderTomorrowWeather,
	renderHourlyWeather,
} from "./renderWeather";
import { formatNames } from "ajv-formats/dist/formats";
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
const hourlyBtn = document.querySelector("#hourlyBtn");
const windBtn = document.querySelector("#windBtn");
const precipBtn = document.querySelector("#precipBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const weeklyBtn = document.querySelector("#weeklyBtn");
const searchBtn = document.querySelector("#searchBtn");
const locationSearch = document.querySelector("#location");
const forecastBtns = document.querySelector("#forecastBtns");
renderHourlyWeather("Berlin", "metric");

hourlyWeatherBtns.addEventListener("click", (e) => {
	const tempData = document.querySelectorAll(".tempdata");
	const windData = document.querySelectorAll(".winddata");
	const precipData = document.querySelectorAll(".precipdata");
	const target = e.target;
	switch (target.id) {
		case "windBtn":
			for (const item of windData) {
				item.classList.remove("hidden");
			}
			for (const item of tempData) {
				item.classList.add("hidden");
			}
			for (const item of precipData) {
				item.classList.add("hidden");
			}
			break;
		case "precipBtn":
			for (const item of windData) {
				item.classList.add("hidden");
			}
			for (const item of tempData) {
				item.classList.add("hidden");
			}
			for (const item of precipData) {
				item.classList.remove("hidden");
			}
			break;
		case "hourlyBtn":
			for (const item of windData) {
				item.classList.add("hidden");
			}
			for (const item of tempData) {
				item.classList.remove("hidden");
			}
			for (const item of precipData) {
				item.classList.add("hidden");
			}
			break;
	}
});

forecastBtns.addEventListener("click", (e) => {
	const target = e.target;
	switch (target.id) {
		case "tomorrowBtn":renderTomorrowWeather("Berlin", "metric");
			break;
		case "weeklyBtn":renderWeekly("Berlin", "metric");
			break;
	}
});

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

//weeklyBtn.addEventListener("click", () => {
//
//	weeklyBtn.classList.add("active");
//	tomorrowBtn.classList.remove("active");
//});
//
//tomorrowBtn.addEventListener("click", () => {
//
//	weeklyBtn.classList.remove("active");
//	tomorrowBtn.classList.add("active");
//});


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


