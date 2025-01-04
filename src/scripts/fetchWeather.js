import { format, addDays } from 'date-fns';

export async function getWeatherData(location) {
	const API_KEY = '4SLZTCLFVD8DARFJJXAYQHB48';

	// Calculating dates for weather data
	const currentDate = new Date();
	const futureDate = addDays(currentDate, 7);
	const startDate = format(currentDate, 'yyyy-MM-dd');
	const endDate = format(futureDate, 'yyyy-MM-dd');
	let unitSystem = 'metric'; //TODO: Add togle for metric and imperial

	// Fetch data
	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=${unitSystem}&key=${API_KEY}`,
			{ mode: 'cors' },
		);
		const data = await response.json();

		return data;
	} catch (err) {
		alert(err);
	}
}
