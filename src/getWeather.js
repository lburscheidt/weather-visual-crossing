import { format } from "date-fns";
export async function getCurrentData(location, unitgroup) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=${unitgroup}&include=current&elements=aqius%2CdatetimeEpoch%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslikemax%2Cfeelslikemin%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeedmax%2Cwindspeedmean%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cvisibility%2Cuvindex%2CsunriseEpoch%2CsunsetEpoch%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&key=MHCZZCZV659TEYDGDM27YGH9S&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const currentData = tempData.currentConditions;
	const {

		aqius,
		conditions,
		datetimeEpoch,
		dew,
		feelslike,
		humidity,
		icon,
		moonphase,
		precip,
		precipprob,
		pressure,
		sunriseEpoch,
		sunsetEpoch,
		temp,
		visibility,
		winddir,
		windspeed,
	} = currentData;
	const currentWeather = {
		
		aqius,
		conditions,
		datetimeEpoch,
		dew,
		feelslike,
		humidity,
		icon,
		moonphase,
		precip,
		precipprob,
		pressure,
		sunriseEpoch,
		sunsetEpoch,
		temp,
		visibility,
		winddir,
		windspeed,
	};
	return currentWeather;
}
