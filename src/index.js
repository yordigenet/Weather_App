//current date and time showcase
function timeUpdate(){
    let dateTime = new Date();
    let hours = String(dateTime.getHours()).padStart(2, "0");
    let minutes = String(dateTime.getMinutes()).padStart(2, "0");
    let currentDate = document.querySelector("#dateUpdate");
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    
    let day = days[dateTime.getDay()];
    currentDate.innerHTML = `${day} ${hours}:${minutes}`;
  }
    
timeUpdate();

function arangeDate(days){
  let newDate = new Date(days * 1000);
  let day = newDate.getDay();
  let dayys = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  return dayys[day];
}

function diplayForcast(response){
  
  let forcastElement = document.querySelector("#forcast");
  let forcastContent = `<div class="row">`;
  let forcastDay = response.data.daily

  forcastDay.forEach(function(day, index){
    if (index < 6){
      forcastContent = forcastContent + `
      <div class="col-2">
      <div class="weather-forcast-day">${arangeDate(day.time)}</div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png" alt="" width="40px">
      <div class="weather-forcast-temprature">
        <span class="weather-forcast-temprature-max">${Math.round(day.temperature.maximum)}°</span>
        <span class="weather-forcast-temprature-min">${Math.round(day.temperature.minimum)}°</span>
        </div>
      </div>`;
    }
  });
  forcastContent = forcastContent + `</div>`;
  forcastElement.innerHTML = forcastContent
}

//search engine
//weather display based on city searched

function forcastWeather(coordinates){
 
  let apiKey = "9e83f4b20abcaf3tc8ob7e37014fe983";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(diplayForcast);
}

function showWeather(response) {

  let temprature = document.querySelector("#new-temprature");
  let newCity = document.querySelector("#city-name");
  let currentHimudity = document.querySelector("#humud");
  let currentWind = document.querySelector("#win");
  let detailinfo = document.querySelector("#moreInfo")
  let icon = document.querySelector("#icon")
  
  celciusData = Math.round(response.data.temperature.current);

  temprature.innerHTML = Math.round(response.data.temperature.current);
  newCity.innerHTML = response.data.city;
  currentHimudity.innerHTML = Math.round(response.data.temperature.humidity);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  detailinfo.innerHTML = response.data.condition.description;
  icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
forcastWeather(response.data.coordinates);
}

function weatherNew(city){

let apiKey = "9e83f4b20abcaf3tc8ob7e37014fe983";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric`;
axios.get(`${apiUrl}&key=${apiKey}`).then(showWeather);
}

function search(event){
event.preventDefault();

let city = document.querySelector("#city-input").value;
weatherNew(city);
}

function tempratureInFahrenite(event){
  event.preventDefault();

  //handle the active class
  celcius.classList.remove("active");
  fahrenite.classList.add("active");

  let fahreniteTemprature = (celciusData * 9)/5 + 32;
  let temprature = document.querySelector("#new-temprature");
  temprature.innerHTML = Math.round(fahreniteTemprature);
}

function tempratureInCelcius(event){
  event.preventDefault();
  
  //handle the active class
  fahrenite.classList.remove("active");
  celcius.classList.add("active");
  

  let temprature = document.querySelector("#new-temprature");
  temprature.innerHTML = celciusData;
}

let celciusData = null;

let weatherUpdate = document.querySelector("#city-form");
weatherUpdate.addEventListener("submit", search);

let fahrenite = document.querySelector("#to-fahrenite");
fahrenite.addEventListener("click", tempratureInFahrenite);

let celcius = document.querySelector("#to-celcius");
celcius.addEventListener("click", tempratureInCelcius);

weatherNew("Addis Ababa");
diplayForcast();