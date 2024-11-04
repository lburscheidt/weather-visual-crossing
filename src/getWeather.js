import { format } from "date-fns";
import { renderStaticData } from "./renderWeather";
let tempData;
export const hourlyData = await getHourlyData();
console.log(hourlyData);
let baseData;

const weather = await getWeatherData();
const current = weather.currentConditions;
console.log(current);
renderStaticData(current);

export async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  return tempData;
  console.log(tempData);
  console.log(tempData.days[0].hours);
  let current = tempData.currentConditions;
  console.log(current);

  console.log("Current precip type", current.preciptype);
  console.log("Current snow depth", current.snowdepth);
  console.log("Current snowfall", current.snow);

  //return tempData;
  renderHourlyData(tempData.days[0].hours);
}

export async function getHourlyData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  console.log(tempData);
  return tempData.days[0].hours;
}
getHourlyData("Berlin");
