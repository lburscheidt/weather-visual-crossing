import { format } from "date-fns";
export async function getCurrentData(location, unitgroup) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today/next7days?unitGroup=${unitgroup}&include=alerts%2Ccurrent&elements=aqius%2CdatetimeEpoch%2Cdescription%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslikemax%2Cfeelslikemin%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeedmax%2Cwindspeedmean%2Cwindspeedmin%2Cwindspeed%2Cwinddir%2Cpressure%2Cvisibility%2Cuvindex%2CsunriseEpoch%2CsunsetEpoch%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const currentData = tempData.currentConditions;
	const weeklyData = tempData.days;
	const dailyData = tempData.days[0];

	const { alerts, resolvedAddress } = tempData;
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
	const { description, tempmax, windspeedmax, precip: precipmax } = dailyData;
	const week = [];
	for (const day of weeklyData) {
		const { datetimeEpoch, icon, tempmax, tempmin } = day;
		const weeklyWeather = { datetimeEpoch, icon, tempmax, tempmin };
		week.push(weeklyWeather);
	}
	console.log(week);
	const currentWeather = {
		alerts,
		aqius,
		conditions,
		datetimeEpoch,
		description,
		dew,
		feelslike,
		humidity,
		icon,
		moonphase,
		precip,
		precipmax,
		precipprob,
		pressure,
		resolvedAddress,
		sunriseEpoch,
		sunsetEpoch,
		temp,
		tempmax,
		visibility,
		week,
		winddir,
		windspeed,
		windspeedmax,
	};
	return currentWeather;
}
