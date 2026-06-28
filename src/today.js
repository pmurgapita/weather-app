import { getWeather } from "./get-data.js";

class Weather {
    constructor(address, date, conditions, description, hours, precip, sunrise, sunset, temp, tempmax, tempmin, icon)
    {
        this.address = address;
        this.date = date;
        this.conditions = conditions;
        this.description = description;
        this.hours = hours;
        this.precip = precip;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.temp = temp;
        this.tempmax = tempmax;
        this.tempmin = tempmin;
        this.icon = icon;
    }    
}



const weatherInfoMadrid = await getWeather("Madrid, España", "metric");

const todWeatherMadrid = new Weather(weatherInfoMadrid.address, weatherInfoMadrid.days[0].datetime, weatherInfoMadrid.days[0].conditions, weatherInfoMadrid.days[0].description, weatherInfoMadrid.days[0].hours, weatherInfoMadrid.days[0].precip, weatherInfoMadrid.days[0].sunrise, weatherInfoMadrid.days[0].sunset, weatherInfoMadrid.days[0].temp, weatherInfoMadrid.days[0].tempmax, weatherInfoMadrid.days[0].tempmin, weatherInfoMadrid.days[0].icon);

const weatherTodayMadrid = todWeatherMadrid;

let weatherInfo;
let todaysWeather;

async function getWeatherToday(location, units) {
    const weatherInfo = await getWeather(location, units);
    const todaysWeather = new Weather(weatherInfo.address, weatherInfo.days[0].datetime, weatherInfo.days[0].conditions, weatherInfo.days[0].description, weatherInfo.days[0].hours, weatherInfo.days[0].precip, weatherInfo.days[0].sunrise, weatherInfo.days[0].sunset, weatherInfo.days[0].temp, weatherInfo.days[0].tempmax, weatherInfo.days[0].tempmin, weatherInfo.days[0].icon);
    return todaysWeather;
}


export { weatherTodayMadrid , Weather, getWeatherToday };
