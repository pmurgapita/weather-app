import "./styles.css";
import { weatherTodayMadrid } from "./today.js";
import { weatherWeekMadrid } from "./week.js";
import { getWeatherToday } from "./today.js";
import { getWeatherWeek } from "./week.js";
import { currentWeatherMadrid, getCurrentWeather } from "./current.js";
import { getDynamicImage } from "./imagemodule.js";
import { toDate, parse, format, subDays } from "date-fns";


// Current weather in Madrid in first Load

const currentWeatherInMadrid = await getCurrentWeather("Madrid, Spain", "metric");

console.log(format(parse(currentWeatherInMadrid.datetime, 'HH:mm:ss', new Date()),'HH:mm'));

const mainData = document.querySelector(".mainData");
const sideData = document.querySelector(".sideData");

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
headWeather.textContent = `The weather in Madrid right now (${format(parse(currentWeatherInMadrid.datetime, 'HH:mm:ss', new Date()),'HH:mm')}) is:`;


const bigTemp = document.createElement("h2");
bigTemp.textContent = `${currentWeatherInMadrid.temp}º`;
bigTemp.classList = "bigTemp";
mainData.appendChild(bigTemp);

const conditions = document.createElement("p");
conditions.textContent = `${currentWeatherInMadrid.conditions}`;
sideData.appendChild(conditions);

const temperature = document.createElement("p");
temperature.textContent = `Temperature: ${currentWeatherInMadrid.temp}º but it feels like ${currentWeatherInMadrid.feelslike}º`;
sideData.appendChild(temperature);

const precipitation = document.createElement("p");
precipitation.textContent = `Precipitation: ${currentWeatherInMadrid.precip} mm`;
sideData.appendChild(precipitation);

const humidity = document.createElement("p");
humidity.textContent = `Humidity: ${currentWeatherInMadrid.humidity}%`;
sideData.appendChild(humidity);






// Current weather in the location selected

const hours = document.querySelector(".hours");

const buttons = document.querySelectorAll("button");

const submit = document.querySelector(".submit");
const location = document.querySelector("#location");
const units = document.querySelector("#unit");



submit.addEventListener("click", async () => {
    if (location.value === ""){
    } else {
        while (mainData.firstChild) {
            mainData.removeChild(mainData.firstChild);
        }
        while (hours.firstChild) {
            hours.removeChild(hours.firstChild);
        }
        while (sideData.firstChild) {
            sideData.removeChild(sideData.firstChild);
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

        headWeather.textContent = `The weather in ${currentWeather.address} right now (${format(parse(currentWeather.datetime, 'HH:mm:ss', new Date()),'HH:mm')}) is:`;

        const bigTemp = document.createElement("h2");
        bigTemp.textContent = `${currentWeather.temp}º`;
        bigTemp.classList = "bigTemp";
        mainData.appendChild(bigTemp);  
        
        const conditions = document.createElement("p");
        conditions.textContent = `The weather today is: ${currentWeather.conditions}`;
        sideData.appendChild(conditions);

        const temperature = document.createElement("p");
        temperature.textContent = `The temperature is ${currentWeather.temp}º but it feels like ${currentWeather.feelslike}º`;
        sideData.appendChild(temperature);

        const precipitation = document.createElement("p");
        precipitation.textContent = `Precipitation is: ${currentWeather.precip} mm`;
        sideData.appendChild(precipitation);

        const humidity = document.createElement("p");
        humidity.textContent = `There is a humidity of ${currentWeatherInMadrid.humidity}`;
        sideData.appendChild(humidity);
    }

})



// Todays weather in the location selected

const today = document.querySelector(".today");

today.addEventListener("click", async () => {
    if (location.value === "") {
    } else {
        while (mainData.firstChild) {
            mainData.removeChild(mainData.firstChild);
        }
        while (hours.firstChild) {
            hours.removeChild(hours.firstChild);
        }
        while (sideData.firstChild) {
            sideData.removeChild(sideData.firstChild);
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

        headWeather.textContent = `The weather in ${todaysWeather.address} today (${format(toDate(todaysWeather.date), "dd 'of' MMMM")}) is:`;

        const bigTemp = document.createElement("h2");
        bigTemp.textContent = `${todaysWeather.temp}º`;
        bigTemp.classList = "bigTemp";
        mainData.appendChild(bigTemp);      
        
        const description = document.createElement("p");
        description.textContent = `${todaysWeather.description}`;
        sideData.appendChild(description);

        const temperature = document.createElement("p");
        temperature.textContent = `Temperature will be ${todaysWeather.temp}º with a min of ${todaysWeather.tempmin}º and a max of ${todaysWeather.tempmax}º`;
        sideData.appendChild(temperature);

        const precipitation = document.createElement("p");
        precipitation.textContent = `Precipitation will be: ${todaysWeather.precip} mm`;
        sideData.appendChild(precipitation);

        const sunRiseSet = document.createElement("p");
        sunRiseSet.textContent = `The sunrise will be at ${format(parse(todaysWeather.sunrise, 'HH:mm:ss', new Date()),'HH:mm')} and the sunset at ${format(parse(todaysWeather.sunset, 'HH:mm:ss', new Date()),'HH:mm')}`;
        sideData.appendChild(sunRiseSet);


        todaysWeather.hours.forEach( async element => {
            const hourDiv = document.createElement("div");
            hourDiv.classList = "hour";
            const datetime = document.createElement("p");
            datetime.textContent = format(parse(element.datetime, 'HH:mm:ss', new Date()),'HH:mm');
            datetime.classList = "time";
            hourDiv.appendChild(datetime);
            const bigTemp = document.createElement("p");
            bigTemp.textContent = `${element.temp}º`;
            bigTemp.classList = "bigTempHour";
            hourDiv.appendChild(bigTemp);
            const icon = document.createElement("img");
            icon.src = await getDynamicImage(`${element.icon}.png`);
            icon.classList = "hourIcon";
            hourDiv.appendChild(icon);
            const conditions = document.createElement("p");
            conditions.textContent = element.conditions;
            conditions.classList = "conditionsHour";
            hourDiv.appendChild(conditions);
            const feels = document.createElement("p");
            feels.textContent = `Feels like: ${element.feelslike}º`
            hourDiv.appendChild(feels);
            const precip = document.createElement("p");
            precip.textContent = `Precip: ${element.precip}`
            hourDiv.appendChild(precip);

            hours.appendChild(hourDiv);
        });
    }
})


// Following week´s weather in the location selected

const week = document.querySelector(".week");

week.addEventListener("click", async () => {
    if (location.value === "") {
    } else {
        while (mainData.firstChild) {
            mainData.removeChild(mainData.firstChild);
        }
        while (hours.firstChild) {
            hours.removeChild(hours.firstChild);
        }
        while (sideData.firstChild) {
            sideData.removeChild(sideData.firstChild);
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
            date.classList = "date";
            dayData.appendChild(date);

            const bigTemp = document.createElement("h2");
            bigTemp.textContent = `${day.temp}º`;
            bigTemp.classList = "bigTempWeek";
            dayData.appendChild(bigTemp);

            const img = document.createElement("img");
            img.src = await getDynamicImage(`${day.icon}.png`);
            img.classList = "icon";
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
    }
})




console.log(weatherTodayMadrid);

console.log(weatherWeekMadrid);

console.log(currentWeatherMadrid);