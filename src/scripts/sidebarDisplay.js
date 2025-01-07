import { format } from 'date-fns';

export class DisplaySidebar {
	constructor(container, data) {
		this.container = document.querySelector(container);
		this.data = data;
	}

	renderContent() {
		this.container.innerHTML = '';

		const address = this.createAddress();
		const currentConditions = this.createCurrentConditions();
		const timeStamp = this.createTimeAndDate();

		this.container.appendChild(address);
		this.container.appendChild(currentConditions);
		this.container.appendChild(timeStamp);
	}

	createAddress() {
		const addressWrapper = createElement('div', 'wrapper');
		const address = createElement('h2', 'address');
		address.innerText = this.data.resolvedAddress;

		addressWrapper.appendChild(address);

		return addressWrapper;
	}

	createCurrentConditions() {
		const currentConditionsWrapper = createElement('div', 'info-wrapper');
		const currentTemp = this.createTemp();
		const lineBreak = createElement('hr', 'linebreak');
		const weatherInfo = this.createWeatherInfo();

		currentConditionsWrapper.appendChild(currentTemp);
		currentConditionsWrapper.appendChild(lineBreak);
		currentConditionsWrapper.appendChild(weatherInfo);

		return currentConditionsWrapper;
	}

	createTemp() {
		const container = createElement('div', 'temperature');
		const icon = createWeatherIcon(this.data.currentConditions.icon);
		const temp = createElement('h2', 'temp');
		temp.innerText = `${Math.round(this.data.currentConditions.temp)}°C`;

		container.append(icon, temp);

		return container;
	}

	createWeatherInfo() {
		const container = createElement('div', 'weather-info');

		// Display current condition
		const conditionsDiv = createElement('div', 'info-container');
		const conditionsIcon = createWeatherIcon(
			this.data.currentConditions.icon,
		);
		const conditionText = createElement('p', 'condition');
		conditionText.innerText = this.data.currentConditions.conditions;

		conditionsDiv.append(conditionsIcon, conditionText);

		// Precipitation
		const precipitationDiv = createElement('div', 'info-container');
		const iconMap = {
			snow: 'wi-snow',
			rain: 'wi-rain',
			'freezing rain': 'wi-rain-mix',
			ice: 'wi-sleet',
			hail: 'wi-hail',
			mixed: 'wi-rain-mix',
		};

		// Fall back incase precitype = null
		const iconClass =
			iconMap[this.data.currentConditions.precitype] || 'wi-rain';

		const preciIcon = document.createElement('i');
		preciIcon.classList.add('wi', iconClass);

		const precipitation = createElement('p', 'precipitation');
		precipitation.innerText = `${this.data.currentConditions.precitype || ''} ${this.data.currentConditions.preciprob || '0'}%`;

		precipitationDiv.append(preciIcon, precipitation);

		// Feels like info
		const feelsLikeDiv = createElement('div', 'info-container');
		const feelsIcon = createElement('i', 'material-icons');
		this.data.currentConditions.feelslike < 0
			? (feelsIcon.innerText = 'ac_unit')
			: (feelsIcon.innerText = 'wb_sunny');
		const feelsLike = createElement('p', 'feels');
		feelsLike.innerText = `Feels like ${Math.round(this.data.currentConditions.feelslike)}°C`;

		feelsLikeDiv.append(feelsIcon, feelsLike);

		container.appendChild(conditionsDiv);
		container.appendChild(precipitationDiv);
		container.appendChild(feelsLikeDiv);

		return container;
	}

	createTimeAndDate() {
		const container = createElement('div', 'time-stamp');

		const timeDiv = createElement('div', 'time');
		const icon = this.createDayNightIcon();

		const timeValue = this.data.currentConditions.datetime;

		const todayDate = format(new Date(), 'yyyy-MM-dd'); // E.g., "2025-01-05"
		const fullDateTimeString = `${todayDate}T${timeValue}`; // E.g., "2025-01-05T21:51:00"
		const localDateTime = new Date(fullDateTimeString);

		const time = createElement('p', 'current-time');
		time.innerText = format(localDateTime, 'hh:mm a');

		const date = createElement('p', 'date');
		date.innerText = format(localDateTime, 'EEEE, MMMM do, yyyy');

		timeDiv.append(icon, time);
		container.appendChild(timeDiv);
		container.appendChild(date);

		return container;
	}

	createDayNightIcon() {
		const iconMap = {
			day: 'wb_sunny',
			night: 'nights_stay',
		};

		// Get the current time and sunset time
		const currentTime = new Date();
		const sunsetTime = new Date(
			`${this.data.currentConditions.sunset} ${this.data.timezone}`,
		);

		// Determine if it's day or night
		const timeOfDay = currentTime < sunsetTime ? 'day' : 'night';

		// Choose the icon based on time of day
		const iconClass = iconMap[timeOfDay];

		const icon = document.createElement('i');
		icon.classList.add('material-icons');
		icon.innerText = iconClass;

		return icon;
	}
}

// Helper functions
export function createElement(element, className) {
	const el = document.createElement(element);
	el.classList.add(className);

	return el;
}

export function createWeatherIcon(iconData) {
	const iconMap = {
		snow: 'wi-snow',
		'snow-showers-day': 'wi-day-snow',
		'snow-showers-night': 'wi-night-alt-snow',
		'thunder-rain': 'wi-thunderstorm',
		'thunder-showers-day': 'wi-day-thunderstorm',
		'thunder-showers-night': 'wi-night-alt-thunderstorm',
		rain: 'wi-rain',
		'showers-day': 'wi-day-rain',
		'showers-night': 'wi-night-alt-rain',
		fog: 'wi-fog',
		wind: 'wi-windy',
		cloudy: 'wi-cloudy',
		'partly-cloudy-day': 'wi-day-cloudy',
		'partly-cloudy-night': 'wi-night-cloudy',
		'clear-day': 'wi-day-sunny',
		'clear-night': 'wi-night-clear',
	};

	// Default fallback icon
	const iconClass = iconMap[iconData] || 'wi-na';
	const icon = document.createElement('i');
	icon.classList.add('wi', iconClass);

	return icon;
}
