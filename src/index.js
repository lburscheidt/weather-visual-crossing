import "./style.css";

import {
	assignVariables,
	renderCurrentWeather,
	renderHourlyWeather,
	renderTomorrowWeather,
	renderUnits,
	//renderWeeklyWeather,
} from "./renderWeather";

const airqualityscale = document.querySelector("#airqualityscale");
const alerts = document.querySelector("#alerts");
const forecastBtns = document.querySelector("#forecastBtns");
const forecastContainer = document.querySelector("#forecast");
const hourlyBtn = document.querySelector("#hourlyBtn");
const hourlyCardsContainer = document.querySelector("#hourlyCardsContainer");
const hourlyWeatherBtns = document.querySelector(".hourlyWeatherBtns");
const locationSearch = document.querySelector("#current-location");
const maxPrecip = document.querySelector("#maxPrecip");
const maxPrecipUnit = document.querySelector("#maxPrecipUnit");
const maxtemp = document.querySelector("#maxtemp");
const maxWindspeed = document.querySelector("#maxWindspeed");
const maxWindspeedUnit = document.querySelector("#maxWindspeedUnit");
const precipBtn = document.querySelector("#precipBtn");
const precipintensity = document.querySelector("#precipintensity");
const pressurescale = document.querySelector("#pressurescale");
const searchBtn = document.querySelector("#searchBtn");
const tomorrowBtn = document.querySelector("#tomorrowBtn");
const unitInput = document.querySelector("#unitInput");
const uvscale = document.querySelector("#uvscale");
const visibilityscale = document.querySelector("#visibilityscale");
const weeklyBtn = document.querySelector("#weeklyBtn");
const windBtn = document.querySelector("#windBtn");
const windscale = document.querySelector("#windscale");

hourlyWeatherBtns.addEventListener("click", (e) => {
	const tempData = document.querySelectorAll(".tempdata");
	const windData = document.querySelectorAll(".winddata");
	const precipData = document.querySelectorAll(".precipdata");
	const target = e.target;
	switch (target.id) {
		case "windBtn":
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
	renderUnits(unitgroup);
});

window.onload = () => {
	assignVariables();
	renderCurrentWeather("Berlin", "metric");
	renderHourlyWeather("Berlin", "metric");
	renderTomorrowWeather("Berlin", "metric");
	renderWeeklyWeather("Berlin", "metric");
	tomorrowBtn.classList.add("active");
	hourlyBtn.classList.add("active");
};
async function renderWeeklyWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	console.log(weatherLocation);
	forecastContainer.innerHTML = "";
	const weeklyData = await getWeeklyData(weatherLocation, unitgroup);
	for (const day of weeklyData) {
		const weeklyCard = document.createElement("div");
		weeklyCard.classList.add("weekly-card");
		const weeklyDate = document.createElement("div");
		if (isToday(day.datetimeEpoch * 1000)) {
			weeklyDate.textContent = "Today";
		} else if (isTomorrow(day.datetimeEpoch * 1000)) {
			weeklyDate.textContent = "Tomorrow";
		} else {
			weeklyDate.textContent = format(
				new Date(day.datetimeEpoch * 1000),
				"	eeee",
			);
		}
		weeklyDate.classList.add("weekly-card-title");
		const weeklyIcon = document.createElement("img");
		weeklyIcon.src = `images/${day.icon}.svg`;
		weeklyIcon.classList.add("weekly-card-icon");
		const weeklyCardTemps = document.createElement("div");
		const weeklyMaxTemp = document.createElement("div");
		const weeklyMinTemp = document.createElement("div");
		weeklyMaxTemp.textContent = `${day.tempmax}°`;
		weeklyMinTemp.textContent = `${day.tempmin}°`;
		weeklyCard.appendChild(weeklyDate);
		weeklyCard.appendChild(weeklyIcon);
		weeklyCard.appendChild(weeklyCardTemps);
		weeklyCardTemps.appendChild(weeklyMaxTemp);
		weeklyCardTemps.appendChild(weeklyMinTemp);
		forecastContainer.appendChild(weeklyCard);
	}
}

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
