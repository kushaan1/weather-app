const apiKey = "88c9cb4a299b6aef78aa54e786cd520f";
const searchBar = document.getElementById('search-bar');

const weatherSearch = document.getElementById('search-button');
weatherSearch.addEventListener('click', search);
searchBar.addEventListener('keydown', search);
function search(event){
    if(event.type == 'click' || event.type == 'keydown' && event.key === 'Enter'){
        const city = searchBar.value;
        if(city){
            getWeather(city);
        }
        else{
            alert('Please enter a city name');
        }
    }
}
    

async function getWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;   
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){   
            searchBar.value = '';
            document.getElementById('weather-info').innerHTML = '';
            throw new Error ('City not found');
        }
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    }
    catch(error){
        alert(error.message);
    }
}

function displayWeather(data){
    const weatherResult = document.getElementById('weather-info');
    weatherResult.innerHTML = `
    <div class = "weather-card">
    <h3 class = "weather-data">${data.name}, ${data.sys.country}</h3>
    <p class = "weather-data"><strong>Temperature: ${data.main.temp} &#8451;</strong></p>
    <p class = "weather-data"><strong>Weather: ${data.weather[0].description}</strong></p>
    <p class = "weather-data"><strong>Feels like: ${data.main.feels_like} &#8451;</strong></p>
    <p class = "weather-data"><strong>Humidity: ${data.main.humidity}%</strong></p>
    </div>`;
    
}

