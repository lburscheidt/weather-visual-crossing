let tempData;
// eslint-disable-next-line no-unused-vars
export async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bergen?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  console.log(tempData.days[0].hours);
  let current = tempData.currentConditions;
  console.log(current);
  console.log("Alerts", tempData.alerts);
  console.log("Current temperature:", current.temp);
  console.log("Current Feels Like", current.feelslike);
  console.log("Current conditions", current.conditions);
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
  return tempData;
}
