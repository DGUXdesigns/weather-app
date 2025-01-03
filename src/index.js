import './style.css';
import { format, addDays } from 'date-fns';

// Initialize components
const form = document.querySelector('form');
const search = document.getElementById('search');

// Initialize components
const API_KEY = '4SLZTCLFVD8DARFJJXAYQHB48';
let unitSystem = 'metric';

// Calculating dates for weather data
const currentDate = new Date();
const futureDate = addDays(currentDate, 7);

const startDate = format(currentDate, 'yyyy-MM-dd');
const endDate = format(futureDate, 'yyyy-MM-dd');

// Event Listeners
search.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		form.dispatchEvent(new Event('submit'));
		search.value = '';
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	let location = search.value.trim();

	console.log(`Searching for weather in ${search.value.trim()}`);

	// Collect weather data from API
	async function getWeatherData() {
		try {
			const response = await fetch(
				`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=${unitSystem}&key=${API_KEY}`,
				{ mode: 'cors' },
			);
			const data = await response.json();

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	getWeatherData();
});
