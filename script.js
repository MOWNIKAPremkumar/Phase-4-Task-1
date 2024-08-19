async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = 'ea80c862201b8b3905878f38c1f7b28f'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherElement = document.getElementById('weather');
    const descriptionElement = document.getElementById('description');
    const tempElement = document.getElementById('temp');
    const errorElement = document.getElementById('error');

    
    weatherElement.innerText = '';
    descriptionElement.innerText = '';
    tempElement.innerText = '';
    errorElement.innerText = '';

    if (!city) {
        errorElement.innerText = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the name and try again.');
            } else {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
        }

        const data = await response.json();
        weatherElement.innerText = `Weather in ${data.name}`;
        descriptionElement.innerText = `Description: ${data.weather[0].description}`;
        tempElement.innerText = `Temperature: ${data.main.temp} °C`;
    } catch (error) {
        errorElement.innerText = error.message;
    }
}
