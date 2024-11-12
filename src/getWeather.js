import { format } from "date-fns";

async function getWeatherData(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/today/next7days/?unitGroup=${unitgroup}&elements=aqius%2CdatetimeEpoch%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslikemax%2Cfeelslikemin%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeed%2Cwindspeedmax%2Cwindspeedmin%2Cwinddir%2Cpressure%2Cvisibility%2Cuvindex%2CsunriseEpoch%2CsunsetEpoch%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&include=aqius%2Chours%2Calerts%2Ccurrent&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const weeklyData = tempData.days;
	const dailyData = tempData.days[0];
	const tomorrowData = tempData.days[1].hours;
	const hourlyData = dailyData.hours;
	const hourlyArray = [];
	const tomorrowArray = [];
	const weeklyArray = [];

	for (const hour of hourlyData) {
		const { icon, temp, datetimeEpoch, windspeed, winddir, precip } = hour;
		hourlyArray.push({ icon, temp, datetimeEpoch, windspeed, winddir, precip });
	}
	for (const hour of tomorrowData) {
		const { icon, temp, datetimeEpoch } = hour;
		tomorrowArray.push({ icon, temp, datetimeEpoch });
	}
	for (const day of weeklyData) {
		const { icon, datetimeEpoch, tempmax, tempmin } = day;
		weeklyArray.push({ icon, datetimeEpoch, tempmax, tempmin });
	}

	const {
		resolvedAddress: currentLocation,
		alerts,
		currentConditions: {
			datetimeEpoch: timestamp,
			sunriseEpoch: sunrise,
			sunsetEpoch: sunset,
			...others
		},
	} = tempData;

	//sunsetEpoch = format(new Date(sunsetEpoch * 1000), "HH:mm");
	const currentWeather = {
		timestamp,
		currentLocation,
		alerts,
		sunrise,
		sunset,
		...others,
	};
	currentWeather.sunrise = format(
		new Date(currentWeather.sunrise * 1000),
		"HH:mm",
	);
	currentWeather.sunset = format(
		new Date(currentWeather.sunset * 1000),
		"HH:mm",
	);
	const {
		icon: dailyIcon,
		tempmax,
		windspeedmax,
		precip: precipmax,
	} = dailyData;

	const dailyWeather = {
		dailyIcon,
		precipmax,
		tempmax,
		windspeedmax,
	};

	const weatherObject = [
		currentWeather,
		dailyWeather,
		hourlyArray,
		tomorrowArray,
		weeklyArray,
	];
	console.log(weatherObject);
	return weatherObject;
}

export { getWeatherData };

/*async function getCurrentData(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	const response = await fetch(



		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/today?unitGroup=${unitgroup}&include=alerts%2Ccurrent&elements=aqius%2CdatetimeEpoch%2Cdescription%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslikemax%2Cfeelslikemin%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cwindspeedmax%2Cwindspeedmean%2Cwindspeedmin%2Cwindspeed%2Cwinddir%2Cpressure%2Cvisibility%2Cuvindex%2CsunriseEpoch%2CsunsetEpoch%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	console.log(tempData);
	const currentData = tempData.currentConditions;
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
		uvindex,
		visibility,
		winddir,
		windspeed,
	} = currentData;
	const { description, tempmax, windspeedmax, precip: precipmax } = dailyData;
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
		uvindex,
		visibility,
		winddir,
		windspeed,
		windspeedmax,
	};
	return currentWeather;
}
async function getHourlyData(weatherLocation = "Berlin", unitgroup = "metric") {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/today?unitGroup=${unitgroup}&elements=datetimeEpoch%2Ctemp%2Cprecip%2Cwindspeed%2Cwinddir%2Cicon&include=hours&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
	);
	const tempData = await response.json();
	const hourlyData = tempData.days[0].hours;

	const hourlyWeather = [];
	for (const hour of hourlyData) {
		const { datetimeEpoch, icon, precip, temp, winddir, windspeed } = hour;
		const hourly = { datetimeEpoch, icon, precip, temp, winddir, windspeed };
		hourlyWeather.push(hourly);
	}
	return hourlyWeather;
}

async function getTomorrowData(
	weatherLocation = "Berlin",
	unitgroup = "metric",
) {
	const response = await fetch(`
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/tomorrow?unitGroup=${unitgroup}&include=hours%2Ccurrent&elements=datetimeEpoch%2Ctemp%2Cicon&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`);
	const tempData = await response.json();
	const tomorrowHourlyData = tempData.days[0].hours;
	const tomorrowHourlyWeather = [];
	for (const hour of tomorrowHourlyData) {
		const { datetimeEpoch, icon, temp } = hour;
		const hours = { datetimeEpoch, icon, temp };
		tomorrowHourlyWeather.push(hours);
	}
	return tomorrowHourlyWeather;
}

async function getWeeklyData(weatherLocation = "Berlin", unitgroup = "metric") {
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherLocation}/today/next7days/?unitGroup=${unitgroup}&elements=datetimeEpoch%2Ctempmax%2Ctempmin%2Cicon&include=days&key=DXK7PXKP245PHEUSW4KD2JYPD&contentType=json`,
		{ mode: "cors" },
	);
	const tempData = await response.json();
	const weeklyData = tempData.days;

	const week = [];
	for (const day of weeklyData) {
		const { datetimeEpoch, icon, tempmax, tempmin } = day;
		const weeklyWeather = { datetimeEpoch, icon, tempmax, tempmin };
		week.push(weeklyWeather);
	}
	return week;
}

export { getCurrentData, getHourlyData, getTomorrowData, getWeeklyData };*/
