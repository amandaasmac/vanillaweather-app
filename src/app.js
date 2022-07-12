function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#today-temp");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTemperature;

  let maxTempElement = document.querySelector("#today-max-temp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);

  let minTempElement = document.querySelector("#today-min-temp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);

  let descriptionElement = document.querySelector("#today-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let feelsLikeElement = document.querySelector("#feelslike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#current-dayandtime");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#today-icon");
  let iconId = response.data.weather[0].id;
  iconElement.setAttribute("src", `img/${iconId}d.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "f2a962d48c46d7fc23aca5910b2db6af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#search-input");
  searchCity(cityInputElement.value);
}

function switchUnit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#today-temp");
  let unitElement = document.querySelector("#temp-unit");

  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);

  switch (switchUnitElement.innerHTML) {
    case "˚F":
      temperatureElement.innerHTML = fahrenheitTemperature;
      switchUnitElement.innerHTML = "˚C";
      unitElement.innerHTML = "˚F";

      break;
    case "˚C":
      temperatureElement.innerHTML = celsiusTemperature;
      switchUnitElement.innerHTML = "˚F";
      unitElement.innerHTML = "˚C";

      break;
  }
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let switchUnitElement = document.querySelector("#unit-switch");
switchUnitElement.addEventListener("click", switchUnit);

searchCity("Rome");
