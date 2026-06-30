
const load = document.querySelector(".load");

async function getWeather(location, units) {
    load.removeAttribute('hidden');
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=AGKTW5FXBMRCVQGNEYTHZ83JR`);
        const weatherData = await response.json();
        load.setAttribute('hidden', 'true');
        return weatherData
    } catch (error) {
        console.error(error);
        load.setAttribute('hidden', 'true');
    }
    
}


export { getWeather };