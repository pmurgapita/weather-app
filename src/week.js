import { Weather } from "./today.js";
import { getWeather } from "./get-data.js";

let weatherInfoArray = [];
let weatherFinalArray = [];

function WeekWeather(weatherInfo) {
    weatherInfoArray = [];
    weatherFinalArray = [];
    for (let i = 0; i < 7; i++) {
        weatherInfoArray.push(weatherInfo.days[i]);
    }
    weatherInfoArray.forEach((one) => {
        weatherFinalArray.push(new Weather(weatherInfo.address, one.datetime, one.conditions, one.description, one.hours, one.precip, one.sunrise, one.sunset, one.temp, one.tempmax, one.tempmin, one.icon));
    })
    return weatherFinalArray;
}

const weatherInfoMadrid = await getWeather("Madrid, España", "metric");

const weatherWeekMadrid = WeekWeather(weatherInfoMadrid);

async function getWeatherWeek(location, units) {
    const weatherWeekInfo = await getWeather(location, units);
    const weatherWeek = WeekWeather(weatherWeekInfo);
    return weatherWeek;
}

export { weatherWeekMadrid, getWeatherWeek }

