import { createElement, createWeatherIcon } from './sidebarDisplay';
import { format } from 'date-fns';

export class DisplayMain {
	constructor(container, data) {
		this.container = document.querySelector(container);
		this.data = data;
	}

	renderMain() {
		this.container.innerHTML = '';

		const highlights = this.createHighlightsSection();
		const thisWeek = this.createThisWeekSection();

		this.container.appendChild(highlights);
		this.container.appendChild(thisWeek);
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

		const windSpeed = `${Math.round(this.data.currentConditions.windspeed) || 0} km/h`;
		const humidity = `${Math.round(this.data.currentConditions.humidity) || 0}%`;
		const visibility = `${Math.round(this.data.currentConditions.visibility) || 0} km`;
		const feelsLike = `${Math.round(this.data.currentConditions.feelslike) || 0}°C`;

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

	createThisWeekSection() {
		const container = createElement('div', 'this-week');
		const header = createElement('h2', 'this-week-heeder');
		header.innerText = 'This Week';

		const cardContainer = createElement('div', 'card-container');

		const forecast = this.data.days.slice(1, 7);

		forecast.forEach((day) => {
			const dateTime = day.datetime;
			const iconData = day.icon;
			const temperature = `${Math.round(day.temp)}°C`;
			const feelsLikeTemp = `${Math.round(day.feelslike)}°C`;

			// Create the weekday card
			const card = this.createWeekDayCard(
				dateTime,
				iconData,
				temperature,
				feelsLikeTemp,
			);

			// Append the card to the card container
			cardContainer.appendChild(card);
		});

		container.append(header, cardContainer);

		return container;
	}

	createWeekDayCard(dateTime, iconData, temperature, actualtemp) {
		const card = createElement('div', 'weekday-card');
		const date = createElement('p', 'weekday');
		date.innerText = format(new Date(dateTime), 'EEE');

		const icon = createWeatherIcon(iconData);

		const tempDiv = createElement('div', 'weekday-temp');
		const temp = createElement('p', 'actual-temp');
		temp.innerText = temperature;
		const feelsLike = createElement('p', 'feelsLike-temp');
		feelsLike.innerText = actualtemp;

		tempDiv.append(temp, feelsLike);

		card.append(date, icon, tempDiv);

		return card;
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
