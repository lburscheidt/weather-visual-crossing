/* eslint-disable no-undef */
import { getWeatherData } from "./getWeather";
import { tempData } from "./getWeather";
import { weatherData } from "./getWeather";
import { beaufortWindScale } from "./getWeather";
import { uvScale } from "./getWeather";
import { airQualityScale } from "./getWeather";
import { visibilityScale } from "./getWeather";
import { rainIntensityScale } from "./getWeather";
import { windDirConversion } from "./getWeather";
import { pressureScaleWinter } from "./getWeather";
import { moonPhaseConversion } from "./getWeather";
import { getUnits } from "./getWeather";
import { format } from "date-fns";
import { isToday } from "date-fns";
import { isTomorrow } from "date-fns";
import { isThisHour } from "date-fns";

const currentIcon = document.querySelector("#current-icon");
const currentConditions = document.querySelector("#current-conditions");
const currentTemp = document.querySelector("#current-temp");
const currentAlerts = document.querySelector("#current-alerts");
const currentLocation = document.querySelector("#current-location");
const currentDescription = document.querySelector("#current-description");
const currentFeelsLike = document.querySelector("#current-feelslike");
const dayMax = document.querySelector("#day-max");
const dayMaxUnit = document.querySelector("#dayMaxUnit");
const dayMaxDegree = document.querySelector("#dayMaxDegree");
const currentHumidity = document.querySelector("#current-humidity");
const currentDewpoint = document.querySelector("#current-dewpoint");
const currentDewpointUnit = document.querySelector("#current-dewpoint-unit");
const currentWindSpeed = document.querySelector("#current-wind-speed");
const currentWindDir = document.querySelector("#current-wind-dir");
const currentWindScale = document.querySelector("#current-wind-scale");
const currentWindSpeedUnit = document.querySelector("#current-wind-speed-unit");
const currentAirQuality = document.querySelector("#current-air-quality");
const currentAirQualityScale = document.querySelector(
  "#current-air-quality-scale",
);
const currentPrecip = document.querySelector("#current-precipitation");
const currentPrecipIntensity = document.querySelector(
  "#current-precip-intensity",
);
const currentPrecipProb = document.querySelector("#current-precip-prob");
const currentPrecipUnit = document.querySelector("#current-precipitation-unit");
const currentPressure = document.querySelector("#current-pressure");
const currentPressureDesc = document.querySelector("#current-pressure-desc");
const currentUvIndex = document.querySelector("#current-uv-index");
const currentUvScale = document.querySelector("#current-uv-scale");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const moonPhase = document.querySelector("#current-moon-phase");
const currentVisibility = document.querySelector("#current-visibility");
const currentVisibilityScale = document.querySelector(
  "#current-visibility-scale",
);
const currentVisibilityUnit = document.querySelector(
  "#current-visibility-unit",
);
const hourlyCardsContainer = document.querySelector("#hourly-cards-container");
const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");
const tomorrowBtn = document.querySelector("#tomorrow-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const forecastContainer = document.querySelector("#forecast");

const searchBtn = document.querySelector("#search-btn");
const locationSearch = document.querySelector("#location");
export const unitGroup = document.querySelector("#unit-group");

export function renderWeather(weather) {
  let speedUnit = getUnits(unitGroup.value).speedUnit;
  let tempUnit = getUnits(unitGroup.value).tempUnit;
  let distUnit = getUnits(unitGroup.value).distUnit;
  let precipUnit = getUnits(unitGroup.value).precipUnit;
  console.log(speedUnit);
  currentAlerts.textContent = "";
  if (weather.alerts.length == 0) {
    currentAlerts.textContent = "No weather alerts for this location";
  } else {
    weather.alerts.forEach((alert) => {
      let alertDoc = document.createElement("span");
      alertDoc.innerHTML = `<strong><a href=${alert.link}>${alert.headline}</a></strong><br>${alert.description}`;
      alertDoc.href = alert.link;
      currentAlerts.appendChild(alertDoc);
    });
  }
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
  (currentWindScale.textContent = beaufortWindScale(
    Math.round(weather.currentWindspeed),
  )),
    (currentWindSpeedUnit.textContent = speedUnit);
  currentAirQuality.textContent = weather.currentAirQuality;
  currentAirQualityScale.textContent = airQualityScale(
    weather.currentAirQuality,
  );
  currentPrecip.textContent = weather.currPrecip;
  currentPrecipIntensity.textContent = rainIntensityScale(weather.currPrecip);
  currentPrecipProb.textContent = weather.currPrecipProb;
  currentPrecipUnit.textContent = precipUnit;
  currentPressure.textContent = weather.currPressure;
  currentPressureDesc.textContent = pressureScaleWinter(weather.currPressure);
  currentUvIndex.textContent = weather.currUv;
  currentUvScale.textContent = uvScale(weather.currUv);
  sunrise.textContent = format(new Date(weather.sunrise * 1000), "HH:mm");
  sunset.textContent = format(new Date(weather.sunset * 1000), "HH:mm");
  moonPhase.textContent = moonPhaseConversion(weather.currMoonphase);
  currentVisibility.textContent = weather.currVisibility;
  currentVisibilityScale.textContent = visibilityScale(
    weather.currVisibility,
    distUnit,
  );
  currentVisibilityUnit.textContent = distUnit;
}

export function renderHourlyMax(weather) {
  dayMaxDegree.textContent = "°";
  dayMax.textContent = weather.dailyData.tempmax;
  dayMaxUnit.textContent = "";
}

export function renderHourlyData(arr) {
  hourlyCardsContainer.innerHTML = "";
  for (let i = 0; i <= 23; i++) {
    let card = document.createElement("div");
    card.id = `card-${i}`;
    card.classList.add("card");
    card.classList.add("borders");
    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.id = `card-title-${i}`;
    cardTitle.classList.add("bold-1");
    cardTitle.textContent = format(
      new Date(arr[i].datetimeEpoch * 1000),
      "HH:mm",
    );
    let cardIcon = document.createElement("img");
    cardIcon.src = `/images/${arr[i].icon}.svg`;
    let cardTemp = document.createElement("div");
    cardTemp.textContent = arr[i].temp + "°";
    let now = isThisHour(cardTitle.textContent);
    if (now) {
      card.scrollIntoView();
    }
    card.appendChild(cardTitle);
    card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
}

export function renderWeekly(weather) {
  forecastContainer.innerHTML = "";
  for (let i = 0; i <= 7; i++) {
    let weeklyCard = document.createElement("div");
    weeklyCard.classList.add("weekly-card");
    let weeklyDate = document.createElement("div");
    if (isToday(weather.weeklyData[i].datetimeEpoch * 1000)) {
      weeklyDate.textContent = "Today";
    } else if (isTomorrow(weather.weeklyData[i].datetimeEpoch * 1000)) {
      weeklyDate.textContent = "Tomorrow";
    } else {
      weeklyDate.textContent = format(
        new Date(weather.weeklyData[i].datetimeEpoch * 1000),
        "	eeee",
      );
    }
    weeklyDate.classList.add("weekly-card-title");
    let weeklyIcon = document.createElement("img");
    weeklyIcon.src = `images/${weather.weeklyData[i].icon}.svg`;
    weeklyIcon.classList.add("weekly-card-icon");
    let weeklyCardTemps = document.createElement("div");
    let weeklyMaxTemp = document.createElement("div");
    let weeklyMinTemp = document.createElement("div");
    weeklyMaxTemp.textContent = weather.weeklyData[i].tempmax + "°";

    weeklyMinTemp.textContent = weather.weeklyData[i].tempmin + "°";

    weeklyCard.appendChild(weeklyDate);
    weeklyCard.appendChild(weeklyIcon);
    weeklyCard.appendChild(weeklyCardTemps);
    weeklyCardTemps.appendChild(weeklyMaxTemp);
    weeklyCardTemps.appendChild(weeklyMinTemp);
    forecastContainer.appendChild(weeklyCard);
  }
}

export function renderForecast(weather) {
  forecastContainer.innerHTML = "";
  let data = weather.weeklyData[1].hours;
  for (let i = 0; i <= 23; i++) {
    let forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    let forecastCardDate = document.createElement("div");
    forecastCardDate.textContent = format(
      new Date(data[i].datetimeEpoch * 1000),
      "HH:mm",
    );
    forecastCardDate.classList.add("forecast-card-title");
    let forecastIcon = document.createElement("img");
    forecastIcon.classList.add("forecast-card-icon");
    forecastIcon.src = `images/${data[i].icon}.svg`;
    let forecastTemp = document.createElement("div");
    forecastTemp.textContent = data[i].temp + "°";
    forecastTemp.classList.add("forecast-card-temp");

    forecastCard.appendChild(forecastCardDate);
    forecastCard.appendChild(forecastIcon);
    forecastCard.appendChild(forecastTemp);
    forecastContainer.appendChild(forecastCard);
  }
}

export function renderWindMax(weather) {
  dayMaxDegree.textContent = "";
  dayMax.textContent = weather.dailyData.windspeedmax;
  dayMaxUnit.textContent = "mph";
}

export function renderWindData(arr) {
  hourlyCardsContainer.innerHTML = "";
  for (let i = 0; i <= 23; i++) {
    let card = document.createElement("div");
    card.id = `card-${i}`;
    card.classList.add("card");
    card.classList.add("borders");
    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("bold-1");
    cardTitle.textContent = format(
      new Date(arr[i].datetimeEpoch * 1000),
      "HH:mm",
    );
    // let cardIcon = document.createElement("img");
    //cardIcon.src = `/images/${arr[i].icon}.svg`;
    let cardTemp = document.createElement("div");
    cardTemp.textContent = arr[i].windspeed;

    card.appendChild(cardTitle);
    //card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
}

export function renderPrecipMax(weather) {
  dayMaxDegree.textContent = "";
  dayMax.textContent = weather.precipmax;
  dayMaxUnit.textContent = "in";
}

export function renderPrecipData(arr) {
  hourlyCardsContainer.innerHTML = "";
  for (let i = 0; i <= 23; i++) {
    let card = document.createElement("div");
    card.id = `card-${i}`;
    card.classList.add("card");
    card.classList.add("borders");
    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("bold-1");
    cardTitle.textContent = format(
      new Date(arr[i].datetimeEpoch * 1000),
      "HH:mm",
    );

    // let cardIcon = document.createElement("img");
    // cardIcon.src = `/images/${arr[i].icon}.svg`;
    let cardTemp = document.createElement("div");
    cardTemp.textContent = arr[i].precip;

    card.appendChild(cardTitle);
    //card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  let city = "Berlin";
  let units = "metric";
  let weather = await getWeatherData(city, units);
  renderWeather(weather);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
  renderForecast(weather);
});

searchBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWeather(weather);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
  renderForecast(weather);
});

windBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWindMax(weather);
  renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderPrecipMax(weather);
  renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
});

weeklyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWeekly(weather);
});

tomorrowBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderForecast(weather);
});

export async function renderPage(city, units) {
  let weather = await getWeatherData(city, units);
  renderWeather(weather);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
  renderForecast(weather);
}

searchBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  await renderPage(city, units);
});

windBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWindMax(weather);
  renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderPrecipMax(weather);
  renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderHourlyMax(weather);
  renderHourlyData(weather.hourlyData);
});

weeklyBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderWeekly(weather);
});

tomorrowBtn.addEventListener("click", async function () {
  let city;
  let units;
  if (locationSearch.value.length == 0) {
    city = "Berlin";
    units = "metric";
  } else {
    city = locationSearch.value;
    units = unitGroup.value;
  }
  let weather = await getWeatherData(city, units);
  renderForecast(weather);
});

document.addEventListener("DOMContentLoaded", async function () {
  await renderPage("Berlin", "metric");
});
