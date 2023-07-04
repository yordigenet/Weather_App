//current date and time showcase
function timeUpdate(){
    let dateTime = new Date();
    let hours = String(dateTime.getHours()).padStart(2, "0");
    let minutes = String(dateTime.getMinutes()).padStart(2, "0");
    let currentDate = document.querySelector(".dateUpdate");
    
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
    
    //search engine
    //weather display based on city searched
    function showWeather(response) {
      console.log(response);
    
      let temprature = document.querySelector("#new-temprature");
      temprature.innerHTML = Math.round(response.data.main.temp);
      let newCity = document.querySelector("#city-name");
      newCity.innerHTML = response.data.name;
      let currentHimudity = document.querySelector("#humud");
      currentHimudity.innerHTML = Math.round(response.data.main.humidity);
      let currentWind = document.querySelector("#win");
      currentWind.innerHTML = Math.round(response.data.wind.speed);
    }
    
    function weatherNew(event){
      event.preventDefault(); 
    let city = document.querySelector("#city-input").value;
    
    let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
    }
    
    let weatherUpdate = document.querySelector("#city-form");
    weatherUpdate.addEventListener("submit", weatherNew);
    
    //weather display based on current location
    function showLocation(position) {
      let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
      
      axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
      }
    
      function getGeoLocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(showLocation);
        
      }  
      
      let locationButton = document.querySelector("#current-loction");
      locationButton.addEventListener("click", getGeoLocation);
      