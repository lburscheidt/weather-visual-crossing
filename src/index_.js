import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderHourlyWeather,
	renderTomorrowWeather,
	renderUnits,
	renderWeeklyWeather,
} from "./renderWeather";

const forecastBtns = document.querySelector("#forecastBtns");
const hourlyBtn = document.querySelector("#hourlyBtn");
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
const locationSearch = document.querySelector("#current-location");
const maxPrecip = document.querySelector("#maxPrecip");
const maxPrecipUnit = document.querySelector("#maxPrecipUnit");
const maxtemp = document.querySelector("#maxtemp");
const maxWindspeed = document.querySelector("#maxWindspeed");
const maxWindspeedUnit = document.querySelector("#maxWindspeedUnit");
const searchBtn = document.querySelector("#searchBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const unitInput = document.querySelector("#unitInput");

window.onload = () => {
	assignVariables();
	renderCurrentWeather();
	renderHourlyWeather();
	renderTomorrowWeather();
	renderWeeklyWeather();
	renderUnits();
	tomorrowBtn.classList.add("active");
	hourlyBtn.classList.add("active");
};

forecastBtns.addEventListener("click", (e) => {
	const weeklyCards = document.querySelectorAll(".weekly-card");
	const forecastCards = document.querySelectorAll(".forecast-card");
	const target = e.target;
	switch (target.id) {
		case "tomorrowBtn":
			for (const card of weeklyCards) {
				card.classList.add("hidden");
			}
			for (const card of forecastCards) {
				card.classList.remove("hidden");
			}
			break;
		case "weeklyBtn":
			tomorrowBtn.classList.remove("active");
			for (const card of forecastCards) {
				card.classList.add("hidden");
			}
			for (const card of weeklyCards) {
				card.classList.remove("hidden");
			}
			break;
	}
});

hourlyWeatherBtns.addEventListener("click", (e) => {
	const tempData = document.querySelectorAll(".tempdata");
	const windData = document.querySelectorAll(".winddata");
	const precipData = document.querySelectorAll(".precipdata");
	const target = e.target;
	switch (target.id) {
		case "windBtn":
			hourlyBtn.classList.remove("active");
			maxWindspeed.classList.remove("hidden");
			maxWindspeedUnit.classList.remove("hidden");
			maxtemp.classList.add("hidden");
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
			hourlyBtn.classList.remove("active");
			maxWindspeed.classList.add("hidden");
			maxWindspeedUnit.classList.add("hidden");
			maxtemp.classList.add("hidden");
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
			maxtemp.classList.remove("hidden");
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
	renderWeeklyWeather(weatherLocation, unitgroup);
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
	renderWeeklyWeather(weatherLocation, unitgroup);
	renderUnits(unitgroup);
});
