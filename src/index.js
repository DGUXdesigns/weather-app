import './style.css';
import { format, addDays } from 'date-fns';

const API_KEY = '4SLZTCLFVD8DARFJJXAYQHB48';
let location = 'Toronto';

const currentDate = new Date();
const futureDate = addDays(currentDate, 7);

const startDate = format(currentDate, 'yyyy-MM-dd');
const endDate = format(futureDate, 'yyyy-MM-dd');

async function getWeatherData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${API_KEY}`,
      { mode: 'cors' },
    );
    const data = await response.json();

    console.table(data);
  } catch (err) {
    console.log(err);
  }
}

getWeatherData();
