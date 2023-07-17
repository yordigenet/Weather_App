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
function diplayForcast(){
  let forcastElement = document.querySelector("#forcast");
  let forcastContent = `<div class="row">`;
  let forcastDay = ["mon", "thu", "fri", "thu"]

  forcastDay.forEach(function(day){
    forcastContent = forcastContent + `
    <div class="col-2">
    <div class="weather-forcast-day">${day}</div>
    <img src="src/havyrain.png" alt="" width="40px">
    <div class="weather-forcast-temprature">
      <span class="weather-forcast-temprature-max"> 12°</span>
      <span class="weather-forcast-temprature-min"> 14°</span>
      </div>
    
  </div>`;
  });
  forcastContent = forcastContent + `</div>`;
  forcastElement.innerHTML = forcastContent
  console.log(forcastContent);
}

//search engine
//weather display based on city searched

function showWeather(response) {

  let temprature = document.querySelector("#new-temprature");
  let newCity = document.querySelector("#city-name");
  let currentHimudity = document.querySelector("#humud");
  let currentWind = document.querySelector("#win");
  let detailinfo = document.querySelector("#moreInfo")
  let icon = document.querySelector("#icon")
  
  celciusData = Math.round(response.data.main.temp);

  temprature.innerHTML = Math.round(response.data.main.temp);
  newCity.innerHTML = response.data.name;
  currentHimudity.innerHTML = Math.round(response.data.main.humidity);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  detailinfo.innerHTML = response.data.weather[0].description;
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


function weatherNew(city){

let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
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