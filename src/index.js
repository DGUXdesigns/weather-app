import './style.css';
import 'weather-icons/css/weather-icons.min.css';
import { getWeatherData } from './scripts/fetchWeather';
import { DisplaySidebar } from './scripts/sidebarDisplay';
import { DisplayMain } from './scripts/mainDisplay';

// Initialize components
const form = document.querySelector('form');
const search = document.getElementById('search');
const defaultLocation = 'Toronto, ON';

// Event Listeners
search.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		form.dispatchEvent(new Event('submit'));
		search.value = '';
	}
});

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const location = search.value.trim();

	// Collect weather data from API
	let data = await getWeatherData(location);

	const sidebar = new DisplaySidebar('.content', data);
	const main = new DisplayMain('main', data);

	sidebar.renderContent();
	main.renderMain();
});

// Fetch default location weather
async function fetchWeatherForDefaultLocation() {
	const data = await getWeatherData(defaultLocation);

	const sidebar = new DisplaySidebar('.content', data);
	const main = new DisplayMain('main', data);

	sidebar.renderContent();
	main.renderMain();
}

// Render the default location
fetchWeatherForDefaultLocation();
