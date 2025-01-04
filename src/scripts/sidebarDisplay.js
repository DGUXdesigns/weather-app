export class DisplaySidebar {
	constructor(container, data) {
		this.container = document.querySelector(container);
		this.data = data;
	}

	renderContent() {
		this.container.innerHTML = '';

		const address = this.createAddress();
		const weatherIcon = this.createWeatherIcon();

		this.container.appendChild(address);
		this.container.appendChild(weatherIcon);
	}

	createAddress() {
		const addressWrapper = createElement('div', 'wrapper');
		const address = createElement('h2', 'address');
		address.innerText = this.data.resolvedAddress;

		addressWrapper.appendChild(address);

		return addressWrapper;
	}

	createWeatherIcon() {
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
		const iconClass = iconMap[this.data.currentConditions.icon] || 'wi-na';

		const iconWrapper = createElement('div', 'wrapper');
		const icon = document.createElement('i');
		icon.classList.add('wi', iconClass);

		iconWrapper.appendChild(icon);

		return iconWrapper;
	}
}

// Helper functions
function createElement(element, className) {
	const el = document.createElement(element);
	el.classList.add(className);

	return el;
}
