import { format, isToday, isTomorrow, isThisHour } from "date-fns";
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
// const location = document.querySelector("#location");
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
// const dayMax = document.querySelector("#day-max");
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

//const currentWeatherDisplay = [
//	currentAirQuality,
//	currentConditions,
//	currentDewpoint,
//	currentFeelsLike,
//	currentHumidity,
//	currentIcon,
//	moonPhase,
//	currentPrecip,
//	currentPrecipProb,
//	currentPressure,
//	sunrise,
//	sunset,
//	currentTemp,
//	currentUvIndex,
//	currentVisibility,
//	currentWindDir,
//	currentWindSpeed,
//];

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
	console.log(currentData);
	aqius.textContent = currentData.aqius;
	conditions.textContent = currentData.conditions;
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
}
