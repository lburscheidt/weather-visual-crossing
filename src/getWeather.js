import { format } from "date-fns";

export let tempData;
export let weatherData;

export async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Bwindspeedmax%2C%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  //console.log(tempData);
  let curr = tempData.currentConditions;
  //console.log(curr);

  let precipData = [];
  for (let i = 0; i <= 23; i++) {
    precipData.push(tempData.days[0].hours[i].precip);
  }
  let precipmax = precipData.reduce((a, b) => Math.max(a, b), -Infinity);
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

  // console.log(weatherData);

  //return tempData;
  return weatherData;
}

//getWeatherData("Berlin");
// document.addEventListener("load", async function () {
//   let city = "Berlin";
//   await getWeatherData(city);
//   await getHourlyData(city);
//   renderHourlyData(hourlyData);
//   renderStaticData(current);
//   renderBaseData(weather);
// });
//

//
// hourlyBtn.addEventListener("click", () => {
//   renderHourlyData(hourlyData);
// });
//
// windBtn.addEventListener("click", () => {
//   renderWindData(hourlyData);
// });
//
// precipBtn.addEventListener("click", () => {
//   renderPrecipData(hourlyData);
// });
//
// export function renderStaticData(current) {
//   currentIcon.src = `/images/${current.icon}.svg `;
//   currentConditions.textContent = current.conditions;
//   currentTemp.textContent = current.temp + "°";
//   //currentDescription.textContent = tempData.description;
//   currentHumidity.textContent = current.humidity;
//   currentDewpoint.textContent = current.dew + "°";
//
//   currentFeelsLike.textContent = current.feelslike + "°";
//   currentWindSpeed.textContent = current.windspeed;
//   currentWindDir.textContent = windDirConversion(current.winddir);
//   currentWindScale.textContent = beaufortWindScale(current.windspeed);
//
//   currentPrecip.textContent = current.precip;
//   currentPrecipProb.textContent = current.precipprob + "%";
//   currentPressure.textContent = current.pressure;
//   currentUvIndex.textContent = current.uvindex;
//   currentUvScale.textContent = uvScale(current.uvindex);
//   sunrise.textContent = format(new Date(current.sunriseEpoch * 1000), "HH:mm");
//   sunset.textContent = format(new Date(current.sunsetEpoch * 1000), "HH:mm");
//   moonPhase.textContent = current.moonphase;
//   currentVisibility.textContent = current.visibility;
//   currentVisibilityScale.textContent = visibilityScaleMiles(current.visibility);
// }
//

export function windDirConversion(dir) {
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
export function beaufortWindScale(speed) {
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

export function airQualityScale(num) {
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

export function rainIntensityScale(num) {
  if (num == 0) {
    return "No rain";
  } else if (num > 0 && num <= 0.1) {
    return "Light";
  } else if (num >= 0.11 && num <= 0.3) {
    return "Moderate";
  } else if (num >= 0.31 && num <= 0) {
    return "Heavy";
  }
}

export function uvScale(num) {
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

// function visibilityScaleKm(num) {
//   if (num <= 1.0) {
//     return "Very poor";
//   } else if (num >= 1.001 && num <= 4.0) {
//     return "Poor";
//   } else if (num >= 4.001 && num <= 10.0) {
//     return "Moderate";
//   } else if (num >= 10.001 && num <= 20.0) {
//     return "Good";
//   } else if (num >= 20.001 && num <= 40.0) {
//     return "Very good";
//   } else if (num > 40.0) {
//     return "Excellent";
//   }
// }
export function visibilityScaleMiles(num) {
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

export function renderBaseData(weather) {
  console.log(weather);
  dayMax.textContent = weather.days[0].tempmax;
  currentDescription.textContent = weather.description;

  currentAirQuality.textContent = weather.aqius;
  currentAirQualityScale.textContent = airQualityScale(weather.aqius);
}

export function pressureScale(num) {
  if (num >= 1023) {
    return "High";
  } else {
    return "Low";
  }
}

export function pressureScaleWinter(num) {
  if (num >= 1034) {
    return "High";
  } else {
    returnLow;
  }
}
