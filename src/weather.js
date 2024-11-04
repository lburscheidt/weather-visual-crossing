let tempData;
// eslint-disable-next-line no-unused-vars
export async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bergen?unitGroup=us&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json&elements=%2Baqius`,
    { mode: "cors" },
  );
  tempData = await response.json();
  console.log(tempData.days[0].hours);
  console.log(tempData.currentConditions);
  return tempData;
}
