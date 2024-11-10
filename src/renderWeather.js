import { format, isToday, isTomorrow, isThisHour } from "date-fns";

import { getWeeklyData, getTomorrowData, getHourlyData } from "./getWeather";
//import {
//	getWeatherData,
//	beaufortWindScale,
//	uvScale,
//	airQualityScale,
//	visibilityScale,
//	rainIntensityScale,
//	windDirConversion,
//	pressureScaleWinter,
//	moonPhaseConversion,
//	getUnits,
//} from "./getWeather";

const currentAlerts = document.querySelector("#current-alerts");
const currentLocation = document.querySelector("#location");
const forecastContainer = document.querySelector("#forecast");
// const precipintensity = document.querySelector("#precipintensity");
// const currentPrecipUnit = document.querySelector("#current-precipitation-unit");
// const currentPressureDesc = document.querySelector("#current-pressure-desc");
// const currentUvScale = document.querySelector("#current-uv-scale");
// const currentVisibilityScale = document.querySelector(
// 	"#current-visibility-scale",
// );
// const visibilityunit = document.querySelector("#visibilityUnit");
// const windscale = document.querySelector("#windscale");
// const windspeedunit = document.querySelector("#windspeedUnit");
export const dayMax = document.querySelector("#day-max");
export const maxPrecip = document.querySelector("#maxPrecip");
export const maxWindspeed = document.querySelector("#maxWindspeed");
// const dayMaxDegree = document.querySelector("#dayMaxDegree");
// const dayMaxUnit = document.querySelector("#dayMaxUnit");
// const forecastContainer = document.querySelector("#forecast");
// const hourlyBtn = document.querySelector("#hourlyBtn");
const hourlyCardsContainer = document.querySelector("#hourlyCardsContainer");
// const locationSearch = document.querySelector("#location");
// const precipBtn = document.querySelector("#precipBtn");
// const searchBtn = document.querySelector("#searchBtn");
// const tomorrowBtn = document.querySelector("#tomorrowBtn");
// const weeklyBtn = document.querySelector("#weeklyBtn");
// const windBtn = document.querySelector("#windBtn");
// export const unitGroup = document.querySelector("#unit-group");
//

import { getCurrentData } from "./getWeather";

export function assignVariables() {
	const currentFields = document.querySelectorAll(".current");
	for (const field of currentFields) {
		let fieldId = `${field.id}`;
		fieldId = document.getElementById(`${fieldId}`);
	}
}

export async function renderCurrentWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	const currentData = await getCurrentData(weatherLocation, unitgroup);
	console.log(currentData);
	if (currentData.alerts.length > 0) {
		for (const alert of currentData.alerts) {
			const alertDiv = document.createElement("div");
			alertDiv.textContent = alert;
		}
	}
	void 0;

	aqius.textContent = currentData.aqius;
	conditions.textContent = currentData.conditions;
	currentLocation.textContent = currentData.resolvedAddress;
	dew.textContent = `${currentData.dew}°`;
	feelslike.textContent = currentData.feelslike;
	humidity.textContent = currentData.humidity;
	icon.src = `images/${currentData.icon}.svg`;
	moonphase.textContent = currentData.moonphase;
	precip.textContent = currentData.precip;
	precipprob.textContent = currentData.precipprob;
	pressure.textContent = currentData.pressure;
	sunrise.textContent = format(
		new Date(currentData.sunriseEpoch * 1000),
		"HH:mm",
	);
	sunset.textContent = format(
		new Date(currentData.sunsetEpoch * 1000),
		"HH:mm",
	);
	temp.textContent = currentData.temp;
	uvindex.textContent = currentData.uvindex;
	visibility.textContent = currentData.visibility;
	winddir.textContent = currentData.winddir;
	windspeed.textContent = currentData.windspeed;
	description.textContent = currentData.description;
	dayMax.textContent = `${currentData.tempmax}°`;
	maxWindspeed.textContent = currentData.windspeedmax;
	windIcon.src = "/images/pointer.svg";
	windIcon.classList.add("pointer");
	const rotation = `transform: rotate(${currentData.winddir}deg);`;
	windIcon.setAttribute("style", rotation);
	maxPrecip.textContent = currentData.precipmax;
}

export async function renderWeeklyWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
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

export async function renderTomorrowWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	forecastContainer.innerHTML = "";
	const hourlyData = await getTomorrowData(weatherLocation, unitgroup);
	for (const hour of hourlyData) {
		const forecastCard = document.createElement("div");
		forecastCard.classList.add("forecast-card");
		const forecastCardDate = document.createElement("div");
		forecastCardDate.textContent = format(
			new Date(hour.datetimeEpoch * 1000),
			"HH:mm",
		);
		forecastCardDate.classList.add("forecast-card-title");
		const forecastIcon = document.createElement("img");
		forecastIcon.classList.add("forecast-card-icon");
		forecastIcon.src = `images/${hour.icon}.svg`;
		const forecastTemp = document.createElement("div");
		forecastTemp.textContent = `${hour.temp}°`;
		forecastTemp.classList.add("forecast-card-temp");
		forecastCard.appendChild(forecastCardDate);
		forecastCard.appendChild(forecastIcon);
		forecastCard.appendChild(forecastTemp);
		forecastContainer.appendChild(forecastCard);
	}
}

export async function renderHourlyWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	hourlyCardsContainer.innerHTML = "";
	const hourlyData = await getHourlyData(weatherLocation, unitgroup);
	for (const hour of hourlyData) {
		const card = document.createElement("div");
		card.classList.add("card", "borders", "visible");
		const cardTime = document.createElement("div");
		cardTime.classList.add("card-title", "bold-1");
		cardTime.textContent = format(new Date(hour.datetimeEpoch * 1000), "HH:mm");

		const tempData = document.createElement("div");
		tempData.classList.add("visible", "tempdata");
		const windData = document.createElement("div");
		windData.classList.add("hidden", "winddata");
		const precipData = document.createElement("div");
		precipData.classList.add("hidden", "precipdata");

		const tempIcon = document.createElement("img");
		tempIcon.src = `images/${hour.icon}.svg`;
		tempIcon.classList.add("hourlyTempIcon");
		const windIcon = document.createElement("img");
		windIcon.src = "images/pointer.svg";
		windIcon.classList.add("windIcon");
		const rotation = `transform: rotate(${hour.winddir}deg);`;
		windIcon.setAttribute("style", rotation);

		const cardTemp = document.createElement("div");
		cardTemp.textContent = `${hour.temp}°`;
		cardTemp.classList.add("hourlyTemp", "visible");

		const cardWindspeed = document.createElement("div");
		cardWindspeed.textContent = `${hour.windspeed}`;
		cardWindspeed.classList.add("hourlyWindspeed");

		const cardPrecip = document.createElement("div");
		cardPrecip.textContent = `${hour.precip}`;
		cardPrecip.classList.add("hourlyPrecip");

		//const now = isThisHour(cardTitle.textContent);
		//if (now) {
		//	card.scrollIntoView();
		//}
		card.appendChild(cardTime);
		card.appendChild(tempIcon);
		card.appendChild(tempData);
		card.appendChild(windData);
		card.appendChild(precipData);
		tempData.appendChild(tempIcon);
		tempData.appendChild(cardTemp);
		windData.appendChild(windIcon);
		windData.appendChild(cardWindspeed);
		precipData.appendChild(cardPrecip);
		hourlyCardsContainer.appendChild(card);
	}
}
