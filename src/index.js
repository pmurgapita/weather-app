import "./styles.css";
import { weatherTodayMadrid } from "./today.js";
import { weatherWeekMadrid } from "./week.js";
import { getWeatherToday } from "./today.js";
import { getWeatherWeek } from "./week.js";
import { currentWeatherMadrid, getCurrentWeather } from "./current.js";
import { getDynamicImage } from "./imagemodule.js";
import { toDate, parse, format, subDays } from "date-fns";



const currentWeatherInMadrid = await getCurrentWeather("Madrid, Spain", "metric");

console.log(format(parse(currentWeatherInMadrid.datetime, 'HH:mm:ss', new Date()),'HH:mm'));

const mainData = document.querySelector(".mainData");
const img = document.createElement("img");
async function loadImage() {
    img.src = await getDynamicImage(`${currentWeatherInMadrid.icon}.png`);
}
loadImage();
async function loadBackground() {
    const imgUrl = await getDynamicImage(`${currentWeatherInMadrid.icon}-img.jpg`);
    mainData.style.backgroundImage = `url(${imgUrl})`;
}
loadBackground();

mainData.appendChild(img);



const headWeather = document.querySelector(".headWeather");
headWeather.textContent = `The weather in Madrid right now (${currentWeatherInMadrid.datetime}) is:`;


const bigTemp = document.createElement("h2");
bigTemp.textContent = `${currentWeatherInMadrid.temp}º`;
bigTemp.classList = "bigTemp";
mainData.appendChild(bigTemp);

const conditions = document.createElement("p");
conditions.textContent = `The weather right now is: ${currentWeatherInMadrid.conditions}`;
mainData.appendChild(conditions);

const temperature = document.createElement("p");
temperature.textContent = `The temperature is ${currentWeatherInMadrid.temp}º but it feels like ${currentWeatherInMadrid.feelslike}º`;
mainData.appendChild(temperature);

const precipitation = document.createElement("p");
precipitation.textContent = `Precipitation is: ${currentWeatherInMadrid.precip} mm`;
mainData.appendChild(precipitation);

const humidity = document.createElement("p");
humidity.textContent = `There is a humidity of ${currentWeatherInMadrid.humidity}%`;
mainData.appendChild(humidity);

const hours = document.querySelector(".hours");





const buttons = document.querySelectorAll("button");


const submit = document.querySelector(".submit");
const location = document.querySelector("#location");
const units = document.querySelector("#unit");


submit.addEventListener("click", async () => {
    while (mainData.firstChild) {
        mainData.removeChild(mainData.firstChild);
    }
    while (hours.firstChild) {
        hours.removeChild(hours.firstChild);
    }

    buttons.forEach(one => one.classList.remove("active"))
    submit.classList.add("active");

    mainData.classList.remove("active");


    const currentWeather = await getCurrentWeather(location.value, units.value);

    const img = document.createElement("img");
    img.src = await getDynamicImage(`${currentWeather.icon}.png`);
    mainData.appendChild(img);


    const imgUrl = await getDynamicImage(`${currentWeather.icon}-img.jpg`);
    mainData.style.backgroundImage = `url(${imgUrl})`;

    headWeather.textContent = `The weather in ${currentWeather.address} right now (${currentWeather.datetime}) is:`;

    const bigTemp = document.createElement("h2");
    bigTemp.textContent = `${currentWeather.temp}º`;
    bigTemp.classList = "bigTemp";
    mainData.appendChild(bigTemp);  
    
    const conditions = document.createElement("p");
    conditions.textContent = `The weather today is: ${currentWeather.conditions}`;
    mainData.appendChild(conditions);

    const temperature = document.createElement("p");
    temperature.textContent = `The temperature is ${currentWeather.temp}º but it feels like ${currentWeather.feelslike}º`;
    mainData.appendChild(temperature);

    const precipitation = document.createElement("p");
    precipitation.textContent = `Precipitation is: ${currentWeather.precip} mm`;
    mainData.appendChild(precipitation);

    const humidity = document.createElement("p");
    humidity.textContent = `There is a humidity of ${currentWeatherInMadrid.humidity}`;
    mainData.appendChild(humidity);


})


const today = document.querySelector(".today");

today.addEventListener("click", async () => {
    while (mainData.firstChild) {
        mainData.removeChild(mainData.firstChild);
    }
    while (hours.firstChild) {
        hours.removeChild(hours.firstChild);
    }

    buttons.forEach(one => one.classList.remove("active"))
    today.classList.add("active");

    mainData.classList.remove("active");

    const todaysWeather = await getWeatherToday(location.value, units.value);
    console.log(todaysWeather);

    const img = document.createElement("img");
    img.src = await getDynamicImage(`${todaysWeather.icon}.png`);
    mainData.appendChild(img);

    const imgUrl = await getDynamicImage(`${todaysWeather.icon}-img.jpg`);
    mainData.style.backgroundImage = `url(${imgUrl})`;

    headWeather.textContent = `The weather in ${todaysWeather.address} today (${todaysWeather.date}) is:`;

    const bigTemp = document.createElement("h2");
    bigTemp.textContent = `${todaysWeather.temp}º`;
    bigTemp.classList = "bigTemp";
    mainData.appendChild(bigTemp);      
    
    const description = document.createElement("p");
    description.textContent = `The weather today is: ${todaysWeather.description}`;
    mainData.appendChild(description);

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature will be ${todaysWeather.temp}º with a min of ${todaysWeather.tempmin}º and a max of ${todaysWeather.tempmax}º`;
    mainData.appendChild(temperature);

    const precipitation = document.createElement("p");
    precipitation.textContent = `Precipitation will be: ${todaysWeather.precip} mm`;
    mainData.appendChild(precipitation);

    const sunRiseSet = document.createElement("p");
    sunRiseSet.textContent = `The sunrise will be at ${format(parse(todaysWeather.sunrise, 'HH:mm:ss', new Date()),'HH:mm')} and the sunset at ${format(parse(todaysWeather.sunset, 'HH:mm:ss', new Date()),'HH:mm')}`;
    mainData.appendChild(sunRiseSet);


    todaysWeather.hours.forEach( async element => {
        const hourDiv = document.createElement("div");
        hourDiv.classList = "hour";
        const datetime = document.createElement("h3");
        datetime.textContent = format(parse(element.datetime, 'HH:mm:ss', new Date()),'HH:mm');
        datetime.classList = "time";
        hourDiv.appendChild(datetime);
        const bigTemp = document.createElement("h2");
        bigTemp.textContent = `${element.temp}º`;
        hourDiv.appendChild(bigTemp);
        const icon = document.createElement("img");
        icon.src = await getDynamicImage(`${element.icon}.png`);
        hourDiv.appendChild(icon);
        const conditions = document.createElement("p");
        conditions.textContent = element.conditions;
        hourDiv.appendChild(conditions);
        const temp = document.createElement("p");
        temp.textContent = `Temp: ${element.temp}º. Feels like: ${element.feelslike}º`
        hourDiv.appendChild(temp);
        const precip = document.createElement("p");
        precip.textContent = `Precip: ${element.precip}`
        hourDiv.appendChild(precip);

        hours.appendChild(hourDiv);
    });

})


const week = document.querySelector(".week");

week.addEventListener("click", async () => {
    while (mainData.firstChild) {
        mainData.removeChild(mainData.firstChild);
    }
    while (hours.firstChild) {
        hours.removeChild(hours.firstChild);
    }

    mainData.style.backgroundImage = null;

    buttons.forEach(one => one.classList.remove("active"))
    week.classList.add("active");

    mainData.classList.add("active");

    const weeksWeather = await getWeatherWeek(location.value, units.value);

    headWeather.textContent = `The weather in ${location.value} in the next seven days will be:`;

    weeksWeather.forEach(async (day) => {
        const dayData = document.createElement("div");
        dayData.classList = "dayData";

        const date = document.createElement("h5");
        date.textContent = format(toDate(day.date), "dd 'of' MMMM");
        dayData.appendChild(date);

        const bigTemp = document.createElement("h2");
        bigTemp.textContent = `${day.temp}º`;
        dayData.appendChild(bigTemp);

        const img = document.createElement("img");
        img.src = await getDynamicImage(`${day.icon}.png`);
        dayData.appendChild(img);

        const imgUrl = await getDynamicImage(`${day.icon}-img.jpg`);
        dayData.style.backgroundImage = `url(${imgUrl})`;

        const description = document.createElement("p");
        description.textContent = `The weather today is: ${day.description}`;
        dayData.appendChild(description);

        const temperature = document.createElement("p");
        temperature.textContent = `Temperature will be ${day.temp}º with a min of ${day.tempmin}º and a max of ${day.tempmax}º`;
        dayData.appendChild(temperature);

        const precipitation = document.createElement("p");
        precipitation.textContent = `Precipitation will be: ${day.precip} mm`;
        dayData.appendChild(precipitation);

        const sunRiseSet = document.createElement("p");
        sunRiseSet.textContent = `The sunrise will be at ${day.sunrise} and the sunset at ${day.sunset}`;
        dayData.appendChild(sunRiseSet);

        mainData.appendChild(dayData);
    })

})

console.log(weatherTodayMadrid);

console.log(weatherWeekMadrid);

console.log(currentWeatherMadrid);