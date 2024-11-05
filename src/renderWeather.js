import { getWeatherData } from "./getWeather";
import { tempData } from "./getWeather";
import { weatherData } from "./getWeather";
import { format } from "date-fns";
import { beaufortWindScale } from "./getWeather";
import { uvScale } from "./getWeather";
import { airQualityScale } from "./getWeather";
import { visibilityScaleMiles } from "./getWeather";
import { windDirConversion } from "./getWeather";

const currentIcon = document.querySelector("#current-icon");
const currentConditions = document.querySelector("#current-conditions");
const currentTemp = document.querySelector("#current-temp");
const currentAlerts = document.querySelector("#current-alerts");
const currentDescription = document.querySelector("#current-description");
const currentFeelsLike = document.querySelector("#current-feelslike");
const dayMax = document.querySelector("#day-max");
const currentHumidity = document.querySelector("#current-humidity");
const currentDewpoint = document.querySelector("#current-dewpoint");
const currentWindSpeed = document.querySelector("#current-wind-speed");
const currentWindDir = document.querySelector("#current-wind-dir");
const currentWindScale = document.querySelector("#current-wind-scale");
const currentAirQuality = document.querySelector("#current-air-quality");
const currentAirQualityScale = document.querySelector(
  "#current-air-quality-scale",
);
const currentPrecip = document.querySelector("#current-precipitation");
const currentPrecipProb = document.querySelector("#current-precip-prob");
const currentPressure = document.querySelector("#current-pressure");
const currentUvIndex = document.querySelector("#current-uv-index");
const currentUvScale = document.querySelector("#current-uv-scale");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const moonPhase = document.querySelector("#current-moon-phase");
const currentVisibility = document.querySelector("#current-visibility");
const currentVisibilityScale = document.querySelector(
  "#current-visibility-scale",
);
const hourlyCardsContainer = document.querySelector("#hourly-cards-container");
const hourlyBtn = document.querySelector("#hourly-btn");
const windBtn = document.querySelector("#wind-btn");
const precipBtn = document.querySelector("#precip-btn");

let searchBtn = document.querySelector("#search-btn");

let city = "Berlin";
export let weather = await getWeatherData(city);
console.log(weather);

export async function renderWeather() {
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
  currentIcon.src = `images/${weather.currentIcon}.svg`;
  currentConditions.textContent = weather.currentConditions;
  currentTemp.textContent = weather.currentTemp + "°";

  currentDescription.textContent = weather.description;
  currentFeelsLike.textContent = weather.currentFeelsLike + "°";
  dayMax.textContent = weather.dailyData.tempmax;
  currentHumidity.textContent = weather.currentHumidity;
  currentDewpoint.textContent = weather.currentDewpoint + "°";
  currentWindSpeed.textContent = weather.currentWindspeed;
  currentWindDir.textContent = windDirConversion(weather.currentWinddir);
  currentWindScale.textContent = beaufortWindScale(weather.currentWindspeed);
  currentAirQuality.textContent = weather.currentAirQuality;
  currentAirQualityScale.textContent = airQualityScale(
    weather.currentAirQuality,
  );
  currentPrecip.textContent = weather.currPrecip;
  currentPrecipProb.textContent = weather.currPrecipProb + "%";
  currentPressure.textContent = weather.currPressure;
  currentUvIndex.textContent = weather.currUv;
  currentUvScale.textContent = uvScale(weather.currUv);
  sunrise.textContent = format(new Date(weather.sunrise * 1000), "HH:mm");
  sunset.textContent = format(new Date(weather.sunset * 1000), "HH:mm");
  moonPhase.textContent = weather.currMoonphase;
  currentVisibility.textContent = weather.currVisibility;
  currentVisibilityScale.textContent = visibilityScaleMiles(
    weather.currVisibility,
    renderHourlyData(weather.hourlyData),
  );
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
    cardTitle.classList.add("bold-1");
    cardTitle.textContent = format(
      new Date(arr[i].datetimeEpoch * 1000),
      "HH:mm",
    );
    let cardIcon = document.createElement("img");
    cardIcon.src = `/images/${arr[i].icon}.svg`;
    let cardTemp = document.createElement("div");
    cardTemp.textContent = arr[i].temp;

    card.appendChild(cardTitle);
    card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
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

searchBtn.addEventListener("click", async function () {
  let city = document.querySelector("#location").value;

  await getWeatherData(city).then(renderWeather());
});

windBtn.addEventListener("click", () => {
  renderWindData(weather.hourlyData);
});

precipBtn.addEventListener("click", () => {
  renderPrecipData(weather.hourlyData);
});

hourlyBtn.addEventListener("click", () => {
  renderHourlyData(weather.hourlyData);
});
