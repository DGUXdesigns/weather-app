import { createElement } from './sidebarDisplay';
import { format } from 'date-fns';

export class DisplayMain {
	constructor(container, data) {
		this.container = document.querySelector(container);
		this.data = data;
	}

	renderMain() {
		const highlights = this.createHighlightsSection();

		this.container.appendChild(highlights);
	}

	createHighlightsSection() {
		const highlightsContainer = createElement('div', 'highlights');

		const header = createElement('h2', 'highlights-header');
		header.innerText = `Today's Highlights`;

		const statGrid = this.createHighlightsGrid();

		highlightsContainer.appendChild(header);
		highlightsContainer.appendChild(statGrid);

		return highlightsContainer;
	}

	createHighlightsGrid() {
		const grid = createElement('div', 'highlight-grid');

		const windSpeed = `${this.data.currentConditions.windspeed || 0} km/h`;
		const humidity = `${this.data.currentConditions.humidity || 0}%`;
		const visibility = `${this.data.currentConditions.visibility || 0} km`;
		const feelsLike = `${this.data.currentConditions.feelslike || 0}°C`;

		const windSpeedCard = this.createStatCard(windSpeed, 'Wind Speed');
		const humidityCard = this.createStatCard(humidity, 'humidty');
		const visibilityCard = this.createStatCard(visibility, 'Visibility');
		const feelsLikeCard = this.createStatCard(feelsLike, 'Feels Like');

		const sunriseTime = `${this.data.currentConditions.sunrise}`;
		const sunsetTime = `${this.data.currentConditions.sunset}`;

		// Get today's date in the format YYYY-MM-DD
		const todayDate = format(new Date(), 'yyyy-MM-dd');

		// Create valid datetime strings
		const sunriseDateTime = new Date(`${todayDate}T${sunriseTime}`);
		const sunsetDateTime = new Date(`${todayDate}T${sunsetTime}`);

		// Format date time, e.g. 12:26 AM
		const formattedSunrise = format(sunriseDateTime, 'hh:mm a');
		const formattedSunset = format(sunsetDateTime, 'hh:mm a');

		const sunriseCard = this.createStatCard(formattedSunrise, 'Sunrise');
		const sunsetCard = this.createStatCard(formattedSunset, 'Sunset');

		grid.append(
			feelsLikeCard,
			humidityCard,
			windSpeedCard,
			visibilityCard,
			sunriseCard,
			sunsetCard,
		);

		return grid;
	}

	createStatCard(data, statName) {
		const div = createElement('div', 'card');
		const statistic = createElement('h3', 'stat');
		statistic.innerText = data;

		const name = createElement('p', 'stat-name');
		name.innerText = statName;

		div.append(statistic, name);

		return div;
	}
}
