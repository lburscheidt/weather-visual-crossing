import "./style.css";

console.log("hello");
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

import { getWeatherData } from "./weather";
//getWeatherData("Berlin");

//console.log(weatherData);

//async function getWeatherData(location, unitGroup) {
//  const res = await fetch(
//    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
//  );
//  const response = await res.json();
//  return (weatherData = Object.fromEntries(response));
//}
// weatherData = {
//   all: response,
//   alerts: response.alerts,
//   conditions: response.currentConditions.conditions,
//   description: response.description,
//   temp: response.currentConditions.temp,
//   feelslike: response.currentConditions.feelslike,
//   windspeed: response.currentConditions.windspeed,
//   winddir: response.currentConditions.winddir,
//   hourlyData: response.days[0].hours,
//   humidity: response.currentConditions.humidity,
//   icon: response.currentConditions.icon,
//   dewpoint: response.currentConditions.dew,
//   pressure: response.currentConditions.pressure,
//   uvindex: response.currentConditions.uvindex,
//   sunrise: response.currentConditions.sunrise,
//   sunset: response.currentConditions.sunset,
// };
// console.log(weatherData);
// return weatherData;
//

//const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lodon?&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`;
//
//const responseg = await fetch(url, requestOptions)
//  .then((response) => response.text())
//
//  .then(function (result) {
//    console.log(result); //here goes the capture//
//    runtime.globalVars.json1 = result;
//  })
//
//  .catch((error) => console.log("error", error));
//
//console.log(result);
//
