let dateDisplay = document.querySelector("#current-date");

let currentTime = new Date();

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

dateDisplay.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input").value;
  cityElement.innerHTML = cityInput;
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${temp}°C`;
}

function retrievePosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=cd173a006b0e51dac58c6d8064c94178&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
