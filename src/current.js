import { getWeather } from "./get-data.js";

class Weather {
    constructor(address, datetime, conditions, precip, humidity, temp, feelslike, icon)
    {
        this.address = address;
        this.datetime = datetime;
        this.conditions = conditions;
        this.precip = precip;
        this.humidity = humidity;
        this.temp = temp;
        this.feelslike = feelslike;
        this.icon = icon;
    }    
}

const currentWeatherInfoMadrid = await getWeather("Madrid", "metric");
console.log(currentWeatherInfoMadrid)
const currentWeatherMadrid = new Weather(currentWeatherInfoMadrid.address, currentWeatherInfoMadrid.currentConditions.datetime, currentWeatherInfoMadrid.currentConditions.conditions, currentWeatherInfoMadrid.currentConditions.precip, currentWeatherInfoMadrid.currentConditions.humidity, currentWeatherInfoMadrid.currentConditions.temp, currentWeatherInfoMadrid.currentConditions.feelslike, currentWeatherInfoMadrid.currentConditions.icon);

async function getCurrentWeather(location, units) {
    const weatherInfo = await getWeather(location, units);
    const currentWeather = new Weather(weatherInfo.address, weatherInfo.currentConditions.datetime, weatherInfo.currentConditions.conditions, weatherInfo.currentConditions.precip, weatherInfo.currentConditions.humidity, weatherInfo.currentConditions.temp, weatherInfo.currentConditions.feelslike, weatherInfo.currentConditions.icon);
    return currentWeather;
}

export { currentWeatherMadrid, getCurrentWeather}