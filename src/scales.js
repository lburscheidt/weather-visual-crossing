function airQualityScale(num) {
	if (num <= 50) {
		return "Good";
	}
	if (num >= 51 && num <= 100) {
		return "Moderate";
	}
	if (num >= 101 && num <= 150) {
		return "Unhealthy for Sensitive Groups";
	}
	if (num >= 151 && num <= 200) {
		return "Unhealthy";
	}
	if (num >= 201 && num <= 300) {
		return "Very unhealthy";
	}
	return "Hazardous";
}
function beaufortWindScale(speed) {
	if (speed < 1) {
		return "Calm";
	}
	if (speed >= 1 && speed <= 3) {
		return "Light air";
	}
	if (speed >= 4 && speed <= 7) {
		return "Light breeze";
	}
	if (speed >= 8 && speed <= 12) {
		return "Gentle breeze";
	}
	if (speed >= 13 && speed <= 18) {
		return "Moderate breeze";
	}
	if (speed >= 19 && speed <= 24) {
		return "Fresh breeze";
	}
	if (speed >= 25 && speed <= 31) {
		return "Strong breeze";
	}
	if (speed >= 32 && speed <= 38) {
		return "Moderate gale";
	}
	if (speed >= 39 && speed <= 46) {
		return "Gale";
	}
	if (speed >= 47 && speed <= 54) {
		return "Strong gale";
	}
	if (speed >= 55 && speed <= 63) {
		return "Storm";
	}
	if (speed >= 64 && speed <= 72) {
		return "Violent storm";
	}
	if (speed >= 73) {
		return "Hurricane";
	}
}
function moonPhaseConversion(num) {
	if (num <= 0.06) {
		return "new";
	}
	if (num > 0.06 && num <= 0.19) {
		return "Waxing Crescent";
	}
	if (num > 0.19 && num <= 0.31) {
		return "Third Quarter";
	}
	if (num > 0.31 && num <= 0.44) {
		return "Waxing Gibbous";
	}
	if (num > 0.44 && num <= 0.56) {
		return "Full";
	}
	if (num > 0.56 && num <= 0.69) {
		return "Waning Gibbous";
	}
	if (num > 0.69 && num <= 0.81) {
		return "First Quarter";
	}
	if (num > 0.81 && num <= 0.94) {
		return "Waning Crescent";
	}
	if (num > 0.94) {
		return "New";
	}
}
function pressureScale(num) {
	if (num >= 1023) {
		return "High";
	}

	return "Low";
}
function rainIntensityScale(num) {
	if (num === 0) {
		return "No rain";
	}
	if (num > 0 && num <= 0.1) {
		return "Light";
	}
	if (num >= 0.11 && num <= 0.3) {
		return "Moderate";
	}
	if (num >= 0.31 && num <= 0) {
		return "Heavy";
	}
}
function uvScale(num) {
	if (num <= 2) {
		return "Low";
	}
	if (num >= 3 && num <= 5) {
		return "Moderate";
	}
	if (num === 6 || num === 7) {
		return "High";
	}
	if (num >= 8 && num <= 10) {
		return "Very high";
	}
	return "Extreme";
}
function visibilityScale(num, distUnit) {
	if (distUnit === "mi") {
		if (num <= 0.62) {
			return "Very poor";
		}
		if (num >= 0.63 && num <= 2.5) {
			return "Poor";
		}
		if (num >= 2.501 && num <= 6.2) {
			return "Moderate";
		}
		if (num >= 6.21 && num <= 12.43) {
			return "Good";
		}
		if (num >= 12.44 && num <= 25.0) {
			return "Very good";
		}
		if (num > 25.0) {
			return "Excellent";
		}
	}
	if (distUnit === "km") {
		if (num <= 1.0) {
			return "Very poor";
		}
		if (num >= 1.001 && num <= 4.0) {
			return "Poor";
		}
		if (num >= 4.001 && num <= 10.0) {
			return "Moderate";
		}
		if (num >= 10.001 && num <= 20.0) {
			return "Good";
		}
		if (num >= 20.001 && num <= 40.0) {
			return "Very good";
		}
		if (num > 40.0) {
			return "Excellent";
		}
	}
}
function windDirConversion(dir) {
	const dirTable = [
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

function humidityLevels(humidity) {
	if (humidity < 50) {
		return "Low";
	}
	if (humidity > 50 && humidity <= 80) {
		return "Moderate";
	}
	return "High";
}

export {
	airQualityScale,
	beaufortWindScale,
	moonPhaseConversion,
	pressureScale,
	rainIntensityScale,
	uvScale,
	visibilityScale,
	windDirConversion,
	humidityLevels,
};
