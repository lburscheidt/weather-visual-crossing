import { format } from "date-fns";
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

export function renderStaticData(current) {
  currentIcon.src = `/images/${current.icon}.svg `;
  currentConditions.textContent = current.conditions;
  currentTemp.textContent = current.temp + "°";
  //currentDescription.textContent = tempData.description;
  currentHumidity.textContent = current.humidity;
  currentDewpoint.textContent = current.dew + "°";
  // dayMax.textContent = tempData.days[0].tempmax;
  //
  // if (tempData.alerts.length == 0) {
  //   currentAlerts.textContent = "No weather alerts for this location";
  // } else {
  //   tempData.alerts.forEach((alert) => {
  //     let alertDoc = document.createElement("span");
  //     alertDoc.innerHTML = `<strong><a href=${alert.link}>${alert.headline}</a></strong><br>${alert.description}`;
  //     alertDoc.href = alert.link;
  //     currentAlerts.appendChild(alertDoc);
  //   });
  // }
  currentFeelsLike.textContent = current.feelslike + "°";
  currentWindSpeed.textContent = current.windspeed;
  currentWindDir.textContent = windDirConversion(current.winddir);
  currentWindScale.textContent = beaufortWindScale(current.windspeed);
  currentAirQuality.textContent = current.aqius;
  currentAirQualityScale.textContent = airQualityScale(current.aqius);
  currentPrecip.textContent = current.precip;
  currentPrecipProb.textContent = current.precipprob + "%";
  currentPressure.textContent = current.pressure;
  currentUvIndex.textContent = current.uvindex;
  currentUvScale.textContent = uvScale(current.uvindex);
  sunrise.textContent = current.sunrise;
  sunset.textContent = current.sunset;
  moonPhase.textContent = current.moonphase;
  currentVisibility.textContent = current.visibility;
  currentVisibilityScale.textContent = visibilityScaleMiles(current.visibility);
}

export function renderHourlyData(arr) {
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

function renderWindData(arr) {
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
    cardTemp.textContent = arr[i].windspeed;

    card.appendChild(cardTitle);
    card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
}

function renderPrecipData(arr) {
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
    cardTemp.textContent = arr[i].precip;

    card.appendChild(cardTitle);
    card.appendChild(cardIcon);
    card.appendChild(cardTemp);
    hourlyCardsContainer.appendChild(card);
  }
}

function windDirConversion(dir) {
  let dirTable = [
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
function beaufortWindScale(speed) {
  if (speed < 1) {
    return "Calm";
  } else if (speed >= 1 && speed <= 3) {
    return "Light air";
  } else if (speed >= 4 && speed <= 7) {
    return "Light breeze";
  } else if (speed >= 8 && speed <= 12) {
    return "Gentle breeze";
  } else if (speed >= 13 && speed <= 18) {
    return "Moderate breeze";
  } else if (speed >= 19 && speed <= 24) {
    return "Fresh breeze";
  } else if (speed >= 25 && speed <= 31) {
    return "Strong breeze";
  } else if (speed >= 32 && speed <= 38) {
    return "Moderate gale";
  } else if (speed >= 39 && speed <= 46) {
    return "Gale";
  } else if (speed >= 47 && speed <= 54) {
    return "Strong gale";
  } else if (speed >= 55 && speed <= 63) {
    return "Storm";
  } else if (speed >= 64 && speed <= 72) {
    return "Violent storm";
  } else if (speed >= 73) {
    return "Hurricane";
  }
}

function airQualityScale(num) {
  if (num <= 50) {
    return "Good";
  } else if (num >= 51 && num <= 100) {
    return "Moderate";
  } else if (num >= 101 && num <= 150) {
    return "Unhealthy for Sensitive Groups";
  } else if (num >= 151 && num <= 200) {
    return "Unhealthy";
  } else if (num >= 201 && num <= 300) {
    return "Very unhealthy";
  } else {
    return "Hazardous";
  }
}

function uvScale(num) {
  if (num <= 2) {
    return "Low";
  } else if (num >= 3 && num <= 5) {
    return "Moderate";
  } else if (num === 6 || num === 7) {
    return "High";
  } else if (num >= 8 && num <= 10) {
    return "Very high";
  } else {
    return "Extreme";
  }
}

function visibilityScaleKm(num) {
  if (num <= 1.0) {
    return "Very poor";
  } else if (num >= 1.001 && num <= 4.0) {
    return "Poor";
  } else if (num >= 4.001 && num <= 10.0) {
    return "Moderate";
  } else if (num >= 10.001 && num <= 20.0) {
    return "Good";
  } else if (num >= 20.001 && num <= 40.0) {
    return "Very good";
  } else if (num > 40.0) {
    return "Excellent";
  }
}
function visibilityScaleMiles(num) {
  if (num <= 0.62) {
    return "Very poor";
  } else if (num >= 0.63 && num <= 2.5) {
    return "Poor";
  } else if (num >= 2.501 && num <= 6.2) {
    return "Moderate";
  } else if (num >= 6.21 && num <= 12.43) {
    return "Good";
  } else if (num >= 12.44 && num <= 25.0) {
    return "Very good";
  } else if (num > 25.0) {
    return "Excellent";
  }
}
