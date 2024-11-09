import { format, isToday, isTomorrow, isThisHour } from "date-fns";

import { getWeeklyData } from "./getWeather";
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

// const description = document.querySelector("#description");
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
const dayMax = document.querySelector("#day-max");
const maxPrecip = document.querySelector("#maxPrecip");
const maxWindspeed = document.querySelector("#maxWindspeed");
// const dayMaxDegree = document.querySelector("#dayMaxDegree");
// const dayMaxUnit = document.querySelector("#dayMaxUnit");
// const forecastContainer = document.querySelector("#forecast");
// const hourlyBtn = document.querySelector("#hourlyBtn");
// const hourlyCardsContainer = document.querySelector("#hourlyCardsContainer");
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

export async function renderCurrentWeather(location, unitgroup) {
	location;
	unitgroup;
	const currentData = await getCurrentData(location, unitgroup);
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
	dew.textContent = currentData.dew;
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
	dayMax.textContent = currentData.tempmax;
	maxWindspeed.textContent = currentData.windspeedmax;
	maxPrecip.textContent = currentData.precipmax;
}

export async function renderWeekly(location, unitgroup) {
	location;
	unitgroup;
	forecastContainer.innerHTML = "";
	const weeklyData = await getWeeklyData(location, unitgroup);
	console.log(weeklyData);


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
//
//
//
//
//
//

//	for (let i = 0; i <= 7; i++) {
//		const weeklyCard = document.createElement("div");
//		weeklyCard.classList.add("weekly-card");
//		const weeklyDate = document.createElement("div");
//		if (isToday(weather.weeklyData[i].datetimeEpoch * 1000)) {
//			weeklyDate.textContent = "Today";
//		} else if (isTomorrow(weather.weeklyData[i].datetimeEpoch * 1000)) {
//			weeklyDate.textContent = "Tomorrow";
//		} else {
//			weeklyDate.textContent = format(
//				new Date(weather.weeklyData[i].datetimeEpoch * 1000),
//				"	eeee",
//			);
//		}
//		weeklyDate.classList.add("weekly-card-title");
//		const weeklyIcon = document.createElement("img");
//		weeklyIcon.src = `images/${weather.weeklyData[i].icon}.svg`;
//		weeklyIcon.classList.add("weekly-card-icon");
//		const weeklyCardTemps = document.createElement("div");
//		const weeklyMaxTemp = document.createElement("div");
//		const weeklyMinTemp = document.createElement("div");
//		weeklyMaxTemp.textContent = `${weather.weeklyData[i].tempmax}°`;
//		weeklyMinTemp.textContent = `${weather.weeklyData[i].tempmin}°`;
//
//		weeklyCard.appendChild(weeklyDate);
//		weeklyCard.appendChild(weeklyIcon);
//		weeklyCard.appendChild(weeklyCardTemps);
//		weeklyCardTemps.appendChild(weeklyMaxTemp);
//		weeklyCardTemps.appendChild(weeklyMinTemp);
//		forecastContainer.appendChild(weeklyCard);
//	}
//}
