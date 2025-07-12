const apiKey = '441647be300f99f2ffca8f17375a8151'; // Replace with your API key

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    displayWeather(data);
    document.getElementById('city').value = '';  // Clear input after search
  } catch (error) {
    document.getElementById('weatherInfo').innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherInfo').innerHTML = weatherHTML;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

