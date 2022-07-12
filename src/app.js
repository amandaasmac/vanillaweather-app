function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let MaxTempElement = document.querySelector("#today-max-temp");
  MaxTempElement.innerHTML = Math.round(response.data.main.temp_max);

  let MinTempElement = document.querySelector("#today-min-temp");
  MinTempElement.innerHTML = Math.round(response.data.main.temp_min);

  let descriptionElement = document.querySelector("#today-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let feelsLikeElement = document.querySelector("#feelslike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f2a962d48c46d7fc23aca5910b2db6af";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
