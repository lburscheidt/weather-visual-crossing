import "./style.css";
import {
	assignVariables,
	renderWeather,
	renderUnits,
	renderHourlyWeather,
} from "./renderWeather";
import { getWeatherData } from "./getWeather";

window.onload = () => {
	assignVariables();
	renderWeather();
	renderUnits();
	tomorrowBtn.classList.add("active");
	hourlyBtn.classList.add("active");
};

//getWeatherData()
//renderHourlyWeather();
const forecastBtns = document.querySelector("#forecastBtns");
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
//const hourlyBtn = document.querySelector("#hourlyBtn");
//const precipBtn = document.querySelector("#precipBtn");
//const windBtn = document.querySelector("windBtn");

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
