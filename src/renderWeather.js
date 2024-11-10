import { format, isToday, isTomorrow, isThisHour } from "date-fns";

import {
	getCurrentData,
	getHourlyData,
	getTomorrowData,
	getWeeklyData,
} from "./getWeather";

import {
	airQualityScale,
	beaufortWindScale,
	moonPhaseConversion,
	pressureScale,
	rainIntensityScale,
	uvScale,
	visibilityScale,
	windDirConversion,
} from "./scales";

const currentLocation = document.querySelector("#location");
const forecastContainer = document.querySelector("#forecast");
const maxtemp = document.querySelector("#maxtemp");

function assignVariables() {
	const currentFields = document.querySelectorAll(".current");
	for (const field of currentFields) {
		let fieldId = `${field.id}`;
		fieldId = document.getElementById(`${fieldId}`);
	}
}

 async function renderCurrentWeather(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	const currentData = await getCurrentData(weatherLocation, unitgroup);
	alerts.innerHTML = "";
	if (currentData.alerts.length > 0) {
		for (const alert of currentData.alerts) {
			alerts.innerHTML += `<p>${format(
				new Date(alert.onsetEpoch * 1000),
				"eeee, HH:mm",
			)} - ${format(
				new Date(alert.endsEpoch * 1000),
				"eeee, HH:mm",
			)}</p><a href="${alert.link}">${alert.headline}</a>`;
		}
	} else {
		alerts.textContent = "No current weather alerts";
	}
	airqualityscale.textContent = airQualityScale(currentData.aqius);
	aqius.textContent = currentData.aqius;
	conditions.textContent = currentData.conditions;
	dew.textContent = `${currentData.dew}`;
	feelslike.textContent = currentData.feelslike;
	humidity.textContent = currentData.humidity;
	icon.src = `images/${currentData.icon}.svg`;
	currentLocation.textContent = currentData.resolvedAddress;
	moonphase.textContent = moonPhaseConversion(currentData.moonphase);
	precip.textContent = currentData.precip;
	precipintensity.textContent = rainIntensityScale(currentData.precip);
	precipprob.textContent = currentData.precipprob;
	pressure.textContent = currentData.pressure;
	pressurescale.textContent = pressureScale(currentData.pressure);
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
	uvscale.textContent = uvScale(currentData.uvindex);
	visibility.textContent = currentData.visibility;
	visibilityscale.textContent = visibilityScale(currentData.visibility);
	winddir.textContent = windDirConversion(currentData.winddir);
	windscale.textContent = beaufortWindScale(currentData.windspeed);
	windspeed.textContent = currentData.windspeed;
	description.textContent = currentData.description;
	maxtemp.textContent = `${currentData.tempmax}°`;
	maxWindspeed.textContent = currentData.windspeedmax;
	windIcon.src = "/images/pointer.svg";
	windIcon.classList.add("pointer");
	windIcon.setAttribute(
		"style",
		`transform: rotate(${currentData.winddir}deg);`,
	);
	maxPrecip.textContent = currentData.precipmax;
}

 async function renderHourlyWeather(
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

 async function renderTomorrowWeather(
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

 function renderUnits(unitgroup = "metric") {
	const tempUnits = document.querySelectorAll(".tempUnit");
	const precipUnits = document.querySelectorAll(".precipUnit");
	const speedUnits = document.querySelectorAll(".speedUnit");
	const distUnits = document.querySelectorAll(".distUnit");
	const units = getUnits(unitgroup);
	for (const item of tempUnits) {
		item.textContent = units.tempUnit;
	}
	for (const item of precipUnits) {
		item.textContent = units.precipUnit;
	}
	for (const item of speedUnits) {
		item.textContent = units.speedUnit;
	}
	for (const item of distUnits) {
		item.textContent = units.distUnit;
	}
}

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

function getUnits(unitgroup) {
	if (unitgroup === "metric") {
		return {
			speedUnit: "km/h",
			distUnit: "km",
			tempUnit: "°C",
			precipUnit: "mm",
		};
	}
	if (unitgroup === "uk") {
		return {
			speedUnit: "mph",
			distUnit: "mi",
			tempUnit: "°C",
			precipUnit: "mm",
		};
	}
	if (unitgroup === "us") {
		return {
			speedUnit: "mph",
			distUnit: "mi",
			tempUnit: "°F",
			precipUnit: "in",
		};
	}
	if (unitgroup === "base") {
		return {
			speedUnit: "m/s",
			distUnit: "km",
			tempUnit: "°K",
			precipUnit: "mm",
		};
	}
}

export {assignVariables, renderCurrentWeather, renderHourlyWeather, renderTomorrowWeather, renderUnits, renderWeeklyWeather}