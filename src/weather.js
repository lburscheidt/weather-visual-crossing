// eslint-disable-next-line no-unused-vars
let tempData;
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
export async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  console.log(tempData);
  console.log(tempData.days[0].hours);
  let current = tempData.currentConditions;
  console.log(current);

  console.log("Current precipitation", current.precip);
  console.log("Current precipitation probability", current.precipprob);
  console.log("Current precip type", current.preciptype);
  console.log("Current snow depth", current.snowdepth);
  console.log("Current snowfall", current.snow);
  console.log("Current pressure", current.pressure);
  console.log("Current UV Index", current.uvindex);
  console.log("Current visibility", current.visibility);
  console.log("Sunrise", current.sunrise);
  console.log("Sunset", current.sunset);
  console.log("Moonphase", current.moonphase);

  currentIcon.src = `/images/${current.icon}.svg `;
  currentConditions.textContent = current.conditions;
  currentTemp.textContent = current.temp + "°";
  currentDescription.textContent = tempData.description;
  currentHumidity.textContent = current.humidity;
  currentDewpoint.textContent = current.dew + "°";
  dayMax.textContent = tempData.days[0].tempmax;

  if (tempData.alerts.length == 0) {
    currentAlerts.textContent = "No weather alerts for this location";
  } else {
    tempData.alerts.forEach((alert) => {
      let alertDoc = document.createElement("span");
      alertDoc.innerHTML = `<strong><a href=${alert.link}>${alert.headline}</a></strong><br>${alert.description}`;
      alertDoc.href = alert.link;
      currentAlerts.appendChild(alertDoc);
    });
  }
  currentFeelsLike.textContent = current.feelslike + "°";
  currentWindSpeed.textContent = current.windspeed;
  currentWindDir.textContent = windDirConversion(current.winddir);
  currentWindScale.textContent = beaufortWindScale(current.windspeed);
  currentAirQuality.textContent = current.aqius;
  currentAirQualityScale.textContent = airQualityScale(current.aqius);
  currentPrecip.textContent = current.precip;
  currentPrecipProb.textContent = current.precipprob;
  //return tempData;
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
