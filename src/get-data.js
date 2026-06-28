

async function getWeather(location, units) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=AGKTW5FXBMRCVQGNEYTHZ83JR`);
        const weatherData = await response.json();
        return weatherData
    } catch (error) {
        console.error(error);
    }
    
}


export { getWeather };