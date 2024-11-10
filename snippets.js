//export function renderWeather(weather) {
const speedUnit = getUnits(unitGroup.value).speedUnit;
const tempUnit = getUnits(unitGroup.value).tempUnit;
const distUnit = getUnits(unitGroup.value).distUnit;
const precipUnit = getUnits(unitGroup.value).precipUnit;
currentAlerts.textContent = "";

currentLocation.textContent = weather.address;
currentIcon.src = `images/${weather.currentIcon}.svg`;
currentConditions.textContent = weather.currentConditions;
currentTemp.textContent = weather.currentTemp + tempUnit;

currentDescription.textContent = weather.description;
currentFeelsLike.textContent = weather.currentFeelsLike + tempUnit;
dayMax.textContent = weather.dailyData.tempmax;
currentHumidity.textContent = weather.currentHumidity;
currentDewpoint.textContent = weather.currentDewpoint;
currentDewpointUnit.textContent = tempUnit;
currentWindSpeed.textContent = weather.currentWindspeed;
currentWindDir.textContent = windDirConversion(weather.currentWinddir);
currentWindScale.textContent = beaufortWindScale(
	Math.round(weather.currentWindspeed),
);
currentWindSpeedUnit.textContent = speedUnit;
currentAirQuality.textContent = weather.currentAirQuality;
currentAirQualityScale.textContent = airQualityScale(weather.currentAirQuality);
currentPrecip.textContent = weather.currPrecip;
currentPrecipIntensity.textContent = rainIntensityScale(weather.currPrecip);
currentPrecipProb.textContent = weather.currPrecipProb;
currentPrecipUnit.textContent = precipUnit;
currentPressure.textContent = weather.currPressure;
currentPressureDesc.textContent = pressureScaleWinter(weather.currPressure);
currentUvIndex.textContent = weather.currUv;
currentUvScale.textContent = uvScale(weather.currUv);
currentSunrise.textContent = format(new Date(weather.sunrise * 1000), "HH:mm");
currentSunset.textContent = format(new Date(weather.sunset * 1000), "HH:mm");
moonPhase.textContent = moonPhaseConversion(weather.currMoonphase);
currentVisibility.textContent = weather.currVisibility;
currentVisibilityScale.textContent = visibilityScale(
	weather.currVisibility,
	distUnit,
);
currentVisibilityUnit.textContent = distUnit;
//}

//export function renderHourlyMax(weather) {
dayMaxDegree.textContent = "°";
dayMax.textContent = weather.dailyData.tempmax;
dayMaxUnit.textContent = "";
//}




export function renderWindMax(weather) {
	const windSpeedUnit = getUnits(unitGroup.value).speedUnit;
	dayMaxDegree.textContent = "";
	dayMax.textContent = weather.dailyData.windspeedmax;
	dayMaxUnit.textContent = windSpeedUnit;
}

export function renderWindData(arr) {
	hourlyCardsContainer.innerHTML = "";
	for (let i = 0; i <= 23; i++) {
		const card = document.createElement("div");
		card.id = `card-${i}`;
		card.classList.add("card");
		card.classList.add("borders");
		const cardTitle = document.createElement("div");
		cardTitle.classList.add("card-title");
		cardTitle.classList.add("bold-1");
		cardTitle.textContent = format(
			new Date(arr[i].datetimeEpoch * 1000),
			"HH:mm",
		);
		// let cardIcon = document.createElement("img");
		//cardIcon.src = `images/${arr[i].icon}.svg`;
		const cardTemp = document.createElement("div");
		cardTemp.textContent = arr[i].windspeed;

		card.appendChild(cardTitle);
		//card.appendChild(cardIcon);
		card.appendChild(cardTemp);
		hourlyCardsContainer.appendChild(card);
	}
}

export function renderPrecipMax(weather) {
	const precipitationUnit = getUnits(unitGroup.value).precipUnit;
	dayMaxDegree.textContent = "";
	dayMax.textContent = weather.precipmax;
	dayMaxUnit.textContent = precipitationUnit;
}

export function renderPrecipData(arr) {
	hourlyCardsContainer.innerHTML = "";
	for (let i = 0; i <= 23; i++) {
		const card = document.createElement("div");
		card.id = `card-${i}`;
		card.classList.add("card");
		card.classList.add("borders");
		const cardTitle = document.createElement("div");
		cardTitle.classList.add("card-title");
		cardTitle.classList.add("bold-1");
		cardTitle.textContent = format(
			new Date(arr[i].datetimeEpoch * 1000),
			"HH:mm",
		);

		// let cardIcon = document.createElement("img");
		// cardIcon.src = `images/${arr[i].icon}.svg`;
		const cardTemp = document.createElement("div");
		cardTemp.textContent = arr[i].precip;

		card.appendChild(cardTitle);
		//card.appendChild(cardIcon);
		card.appendChild(cardTemp);
		hourlyCardsContainer.appendChild(card);
	}
}

//document.addEventListener("DOMContentLoaded", async () => {
//	const city = "Berlin";
//	const units = "metric";
//	const weather = await getWeatherData(city, units);
//	renderWeather(weather);
//	renderHourlyMax(weather);
//	renderHourlyData(weather.hourlyData);
//	renderForecast(weather);
//});

searchBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderWeather(weather);
	renderHourlyMax(weather);
	renderHourlyData(weather.hourlyData);
	renderForecast(weather);
});

windBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderWindMax(weather);
	renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderPrecipMax(weather);
	renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderHourlyMax(weather);
	renderHourlyData(weather.hourlyData);
});

weeklyBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderWeekly(weather);
});

tomorrowBtn.addEventListener("click", async () => {
	let city;
	let units;
	if (locationSearch.value.length === 0) {
		city = "Berlin";
		units = "metric";
	} else {
		city = locationSearch.value;
		units = unitGroup.value;
	}
	const weather = await getWeatherData(city, units);
	renderForecast(weather);
});

export async function renderPage(city, units) {
	const weather = await getWeatherData(city, units);
	renderWeather(weather);
	renderHourlyMax(weather);
	renderHourlyData(weather.hourlyData);
	renderForecast(weather);
}

//document.addEventListener("DOMContentLoaded", async () => {
// 	await renderPage("Berlin", "metric");
// });
//alt key: DXK7PXKP245PHEUSW4KD2JYPD

export let tempData;
export let weatherData;

export async function getWeeklyForecast() {
	const response = await fetch(
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?location=Berlin&aggregateHours=24&unitGroup=metric&shortColumnNames=false&forecastDays=7&contentType=json&key=MHCZZCZV659TEYDGDM27YGH9S",
		{ mode: "cors" },
	);
	const tempData = await response.json();
	console.log(tempData);
	const weeklyData = tempData.locations.Berlin.values;
	console.log(weeklyData);
}

export async function getHourlyWeather(location, units) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=MHCZZCZV659TEYDGDM27YGH9S&include=hours&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const hours = tempData.days[0].hours;
	const hourlyWeather = [];
	for (const hour of hours) {
		const {
			datetimeEpoch,
			icon,
			precip,
			precipprob,
			temp,
			winddir,
			windspeed,
		} = hour;
		const hourlyData = {
			datetimeEpoch,
			icon,
			precip,
			precipprob,
			temp,
			winddir,
			windspeed,
		};
		hourlyWeather.push(hourlyData);
	}
	return hourlyWeather;
}

export async function getCurrentWeather(location, units) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=MHCZZCZV659TEYDGDM27YGH9S&contentType=json&include=current`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const curr = tempData.currentConditions;
	const today = tempData.days[0];
	console.log(tempData);
	console.log(curr);
	const { alerts, description, resolvedAddress } = tempData;
	const {
		//aqius,
		conditions,
		dew,
		feelslike,
		humidity,
		icon,
		moonphase,
		precip,
		precipprob,
		pressure,
		sunriseEpoch,
		sunsetEpoch,
		temp,
		uvindex,
		visibility,
		winddir,
		windspeed,
	} = curr;
	const { tempmax, tempmin, windspeedmax } = today;
	const currentWeather = {
		alerts,
		//aqius,
		conditions,
		description,
		dew,
		feelslike,
		humidity,
		icon,
		moonphase,
		precip,
		precipprob,
		pressure,
		resolvedAddress,
		sunriseEpoch,
		sunsetEpoch,
		temp,
		tempmax,
		tempmin,
		uvindex,
		visibility,
		winddir,
		windspeed,
		windspeedmax,
	};

	return currentWeather;
}

export async function getTomorrowWeather(location, units) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=MHCZZCZV659TEYDGDM27YGH9S&contentType=json&elements=%2Bwindspeedmax%2C%2Baqius`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const tomorrowHours = tempData.days[1].hours;
	const tomorrowWeather = [];
	for (const hour of tomorrowHours) {
		const { datetimeEpoch, icon, temp } = hour;
		const tomorrowHourlyWeather = { datetimeEpoch, icon, temp };
		tomorrowWeather.push(tomorrowHourlyWeather);
	}
	return tomorrowWeather;
}

export async function getWeatherData(location, units) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=MHCZZCZV659TEYDGDM27YGH9S&contentType=json&elements=%2Bwindspeedmax%2C%2Baqius`,
		{ mode: "cors" },
	);
	tempData = await response.json();
	const curr = tempData.currentConditions;
	const precipData = [];
	for (let i = 0; i <= 23; i++) {
		precipData.push(tempData.days[0].hours[i].precip);
	}
	const precipmax = precipData.reduce(
		(a, b) => Math.max(a, b),
		Number.NEGATIVE_INFINITY,
	);

	weatherData = {
		alerts: tempData.alerts,
		address: tempData.resolvedAddress,
		description: tempData.description,
		currentAirQuality: curr.aqius,
		currentConditions: curr.conditions,
		currentIcon: curr.icon,
		currentDewpoint: curr.dew,
		currentHumidity: curr.humidity,
		currMoonphase: curr.moonphase,
		currPrecip: curr.precip,
		currPrecipProb: curr.precipprob,
		currPressure: curr.pressure,
		currentTemp: curr.temp,
		currentFeelsLike: curr.feelslike,
		sunrise: curr.sunriseEpoch,
		sunset: curr.sunsetEpoch,
		currUv: curr.uvindex,
		currVisibility: curr.visibility,
		currentWindspeed: curr.windspeed,
		currentWinddir: curr.winddir,
		windspeedmax: tempData.days[0].windspeedmax,
		precipmax: precipmax,
		hourlyData: tempData.days[0].hours,
		dailyData: tempData.days[0],
		weeklyData: tempData.days,
	};

	return weatherData;
}

export function windDirConversion(dir) {
	const dirTable = [
		"North",
		"North-Northeast",
		"Northeast",
		"East-Northeast",
		"East",
		"East-Southeast",
		"Southeast",
		"South-Southeast",
		"South",
		"South-Southwest",
		"Southwest",
		"West-Southwest",
		"West",
		"West-Northwest",
		"Northwest",
		"North-Northwest",
		"North",
	];

	return dirTable[Math.floor((dir + 11.25) / 22.5)];
}
export function beaufortWindScale(speed) {
	if (speed < 1) {
		return "Calm";
	}
	if (speed >= 1 && speed <= 3) {
		return "Light air";
	}
	if (speed >= 4 && speed <= 7) {
		return "Light breeze";
	}
	if (speed >= 8 && speed <= 12) {
		return "Gentle breeze";
	}
	if (speed >= 13 && speed <= 18) {
		return "Moderate breeze";
	}
	if (speed >= 19 && speed <= 24) {
		return "Fresh breeze";
	}
	if (speed >= 25 && speed <= 31) {
		return "Strong breeze";
	}
	if (speed >= 32 && speed <= 38) {
		return "Moderate gale";
	}
	if (speed >= 39 && speed <= 46) {
		return "Gale";
	}
	if (speed >= 47 && speed <= 54) {
		return "Strong gale";
	}
	if (speed >= 55 && speed <= 63) {
		return "Storm";
	}
	if (speed >= 64 && speed <= 72) {
		return "Violent storm";
	}
	if (speed >= 73) {
		return "Hurricane";
	}
}

export function airQualityScale(num) {
	if (num <= 50) {
		return "Good";
	}
	if (num >= 51 && num <= 100) {
		return "Moderate";
	}
	if (num >= 101 && num <= 150) {
		return "Unhealthy for Sensitive Groups";
	}
	if (num >= 151 && num <= 200) {
		return "Unhealthy";
	}
	if (num >= 201 && num <= 300) {
		return "Very unhealthy";
	}
	return "Hazardous";
}

export function rainIntensityScale(num) {
	if (num === 0) {
		return "No rain";
	}
	if (num > 0 && num <= 0.1) {
		return "Light";
	}
	if (num >= 0.11 && num <= 0.3) {
		return "Moderate";
	}
	if (num >= 0.31 && num <= 0) {
		return "Heavy";
	}
}

export function uvScale(num) {
	if (num <= 2) {
		return "Low";
	}
	if (num >= 3 && num <= 5) {
		return "Moderate";
	}
	if (num === 6 || num === 7) {
		return "High";
	}
	if (num >= 8 && num <= 10) {
		return "Very high";
	}
	return "Extreme";
}

export function visibilityScale(num, distUnit) {
	if (distUnit === "mi") {
		if (num <= 0.62) {
			return "Very poor";
		}
		if (num >= 0.63 && num <= 2.5) {
			return "Poor";
		}
		if (num >= 2.501 && num <= 6.2) {
			return "Moderate";
		}
		if (num >= 6.21 && num <= 12.43) {
			return "Good";
		}
		if (num >= 12.44 && num <= 25.0) {
			return "Very good";
		}
		if (num > 25.0) {
			return "Excellent";
		}
	}
	if (distUnit === "km") {
		if (num <= 1.0) {
			return "Very poor";
		}
		if (num >= 1.001 && num <= 4.0) {
			return "Poor";
		}
		if (num >= 4.001 && num <= 10.0) {
			return "Moderate";
		}
		if (num >= 10.001 && num <= 20.0) {
			return "Good";
		}
		if (num >= 20.001 && num <= 40.0) {
			return "Very good";
		}
		if (num > 40.0) {
			return "Excellent";
		}
	}
}

export function pressureScale(num) {
	if (num >= 1023) {
		return "High";
	}

	return "Low";
}

export function pressureScaleWinter(num) {
	if (num >= 1034) {
		return "High";
	}
	return "Low";
}

export function moonPhaseConversion(num) {
	if (num <= 0.06) {
		return "new";
	}
	if (num > 0.06 && num <= 0.19) {
		return "Waxing Crescent";
	}
	if (num > 0.19 && num <= 0.31) {
		return "Third Quarter";
	}
	if (num > 0.31 && num <= 0.44) {
		return "Waxing Gibbous";
	}
	if (num > 0.44 && num <= 0.56) {
		return "Full";
	}
	if (num > 0.56 && num <= 0.69) {
		return "Waning Gibbous";
	}
	if (num > 0.69 && num <= 0.81) {
		return "First Quarter";
	}
	if (num > 0.81 && num <= 0.94) {
		return "Waning Crescent";
	}
	if (num > 0.94) {
		return "New";
	}
}

export function getUnits(units) {
	if (units === "metric") {
		return {
			speedUnit: "km/h",
			distUnit: "km",
			tempUnit: "°C",
			precipUnit: "mm",
		};
	}
	if (units === "uk") {
		return {
			speedUnit: "mph",
			distUnit: "mi",
			tempUnit: "°C",
			precipUnit: "mm",
		};
	}
	if (units === "us") {
		return {
			speedUnit: "mph",
			distUnit: "mi",
			tempUnit: "°F",
			precipUnit: "in",
		};
	}
	if (units === "base") {
		return {
			speedUnit: "m/s",
			distUnit: "km",
			tempUnit: "°K",
			precipUnit: "mm",
		};
	}
}
