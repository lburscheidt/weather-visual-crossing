import "./style.css";
console.log("hello");
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
import { getWeatherData } from "./getWeather";
import { renderWeather } from "./renderWeather";

let weather = await getWeatherData("Berlin");
console.log(getWeatherData("Berlin"));
renderWeather();
