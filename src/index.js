import "./style.css";
import { assignVariables, renderUnits, renderWeather } from "./renderWeather";
import { getWeatherData } from "./getWeather";

const forecastBtns = document.querySelector("#forecastBtns");
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
const locationSearch = document.querySelector("#locationSearch");
const unitInput = document.querySelector("#unitInput");
const searchBtn = document.querySelector("#searchBtn");

window.onload = () => {
	assignVariables();
	renderWeather();
	renderUnits();
};

searchBtn.addEventListener("click", () => {
	const unitgroup = unitInput.value;
	let weatherLocation;
	localStorage.removeItem("weatherLocation");
	if (locationSearch.value.length < 0) {
		alert("Please enter a location");
	} else {
		weatherLocation = locationSearch.value;
		localStorage.setItem("weatherLocation", weatherLocation);
	}
	renderWeather(weatherLocation, unitgroup);
	renderUnits();
});

unitInput.addEventListener("click", () => {
	const unitgroup = unitInput.value;
	let weatherLocation = "";
	if (localStorage.getItem("weatherLocation")) {
		weatherLocation = localStorage.getItem("weatherLocation");
	} else {
		weatherLocation = "Berlin";
	}
	renderWeather(weatherLocation, unitgroup);
	renderUnits(unitgroup);
});

hourlyWeatherBtns.addEventListener("click", (e) => {
	const tempData = document.querySelectorAll(".tempdata");
	const windData = document.querySelectorAll(".winddata");
	const precipData = document.querySelectorAll(".precipdata");
	const target = e.target;
	switch (target.id) {
		case "windBtn":
			hourlyBtn.classList.remove("active");
			windspeedmax.classList.remove("hidden");
			maxWindspeedUnit.classList.remove("hidden");
			tempmax.classList.add("hidden");
			precipmax.classList.add("hidden");
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
			windspeedmax.classList.add("hidden");
			maxWindspeedUnit.classList.add("hidden");
			tempmax.classList.add("hidden");
			precipmax.classList.remove("hidden");
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
			windspeedmax.classList.add("hidden");
			maxWindspeedUnit.classList.add("hidden");
			tempmax.classList.remove("hidden");
			precipmax.classList.add("hidden");
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
