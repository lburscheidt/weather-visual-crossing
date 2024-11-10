import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderWeeklyWeather,
	renderTomorrowWeather,
	renderHourlyWeather,
	dayMax,
	maxPrecip,
	maxWindspeed,
	renderUnits,
} from "./renderWeather";
import { formatNames } from "ajv-formats/dist/formats";
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
const hourlyBtn = document.querySelector("#hourlyBtn");
const windBtn = document.querySelector("#windBtn");
const precipBtn = document.querySelector("#precipBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const weeklyBtn = document.querySelector("#weeklyBtn");
const searchBtn = document.querySelector("#searchBtn");
const locationSearch = document.querySelector("#current-location");
const forecastBtns = document.querySelector("#forecastBtns");
const inputSection = document.querySelector("#inputSection");
const unitInput = document.querySelector("#unitInput");
//renderHourlyWeather("Berlin", "metric");
const maxWindspeedUnit = document.querySelector("#maxWindspeedUnit");
const maxPrecipUnit = document.querySelector("#maxPrecipUnit");

hourlyWeatherBtns.addEventListener("click", (e) => {
	const tempData = document.querySelectorAll(".tempdata");
	const windData = document.querySelectorAll(".winddata");
	const precipData = document.querySelectorAll(".precipdata");
	const target = e.target;
	switch (target.id) {
		case "windBtn":
			maxWindspeed.classList.remove("hidden");
			maxWindspeedUnit.classList.remove("hidden");
			dayMax.classList.add("hidden");
			maxPrecip.classList.add("hidden");
			maxPrecipUnit.classList.add("hidden");
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
			maxWindspeed.classList.add("hidden");
			maxWindspeedUnit.classList.add("hidden");
			dayMax.classList.add("hidden");
			maxPrecip.classList.remove("hidden");
			maxPrecipUnit.classList.remove("hidden");
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
			maxWindspeed.classList.add("hidden");
			maxWindspeedUnit.classList.add("hidden");
			dayMax.classList.remove("hidden");
			maxPrecip.classList.add("hidden");
			maxPrecipUnit.classList.add("hidden");
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
		case "tomorrowBtn":
			renderTomorrowWeather(weatherLocation, unitgroup);
			break;
		case "weeklyBtn":
			renderWeeklyWeather(weatherLocation, unitgroup);
			break;
	}
});

searchBtn.addEventListener("click", () => {
	localStorage.removeItem("weatherLocation");
	let weatherLocation = "";
	if (locationSearch.value.length > 0) {
		weatherLocation = locationSearch.value;
	} else {
		weatherLocation = "Berlin";
	}
	localStorage.setItem("weatherLocation", weatherLocation);
	const unitgroup = unitInput.value;
	renderCurrentWeather(weatherLocation, unitgroup);
	renderHourlyWeather(weatherLocation, unitgroup);
	renderTomorrowWeather(weatherLocation, unitgroup);
	renderUnits(unitgroup);
});

unitInput.addEventListener("click", () => {
	const unitgroup = unitInput.value;
	let weatherLocation = "";
	if (localStorage.getItem("weatherLocation")) {
		weatherLocation = localStorage.getItem("weatherLocation");
	} else {
		weatherLocation = "Berlin";
	}
	renderCurrentWeather(weatherLocation, unitgroup);
	renderHourlyWeather(weatherLocation, unitgroup);
	renderTomorrowWeather(weatherLocation, unitgroup);
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
