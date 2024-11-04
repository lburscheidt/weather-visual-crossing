// eslint-disable-next-line no-unused-vars
let tempData;
const currentIcon = document.querySelector("#current-icon");
const currentConditions = document.querySelector("#current-conditions");
const currentTemp = document.querySelector("#current-temp");
const currentAlerts = document.querySelector("#current-alerts");
const currentDescription = document.querySelector("#current-description");

const dayMax = document.querySelector("#day-max");
const currentHumidity = document.querySelector("#current-humidity");
const currentDewpoint = document.querySelector("#current-dewpoint");

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
  console.log("Alerts", tempData.alerts);

  console.log("Current Feels Like", current.feelslike);

  console.log("Current description", tempData.description);
  console.log("Current icon", current.icon);
  console.log("Current wind speed", current.windspeed);
  console.log("Current wind direction", current.winddir);
  console.log("Current humidity", current.humidity);
  console.log("Current dewpoint", current.dew);
  console.log("Current precipitation", current.precip);
  console.log("Current precipitation probability", current.precipprob);
  console.log("Current precip type", current.preciptype);
  console.log("Current snow depth", current.snowdepth);
  console.log("Current snowfall", current.snow);
  console.log("Current air quality", current.aqius);
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
      alertDoc.innerHTML = `<a href=${alert.link}>${alert.headline}</a><br>${alert.description}`;
      alertDoc.href = alert.link;
      currentAlerts.appendChild(alertDoc);
    });
  }

  //return tempData;
}
