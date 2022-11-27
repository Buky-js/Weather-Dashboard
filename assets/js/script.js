var inputField = $("#input-field");
var searchButton = $("#search-button");
var ApiKey = 'df1f95abf86a9ba36be3296f75c98d93';
var cityName = $("#current-city");
var temperature = $("#temperature");
var humidity = $("#humidity");
var windspeed = $("#wind-speed");
var weatherDisplay = $(".current-weather-display");
var now = dayjs().format("MMMM D, YYYY");



function displayWeather(event){
    event.preventDefault();
var city = inputField.val().trim();
if(city == ""){
    alert("Please enter a city name");
    return;
}
if(city !== ""){
    fetchCityDetails(city);
}

console.log(city);
}

function fetchCityDetails(city){
   var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid='+ ApiKey;
   fetch(apiUrl)
   .then(function (response){
    console.log(response);
    return response.json();
   })
   .then(function (data){
    console.log(data);
    weatherDisplay.show();

    // cityName.innerText= data.name;
    var weatherIcon = data.weather[0].icon;
    var weatherDesc = data.weather[0].description;
    var iconURL =  "http://openweathermap.org/img/wn/"+weatherIcon+ ".png";
weatherDisplay.append("<h3>"+data.name + " <span>"+now+"<img src="+iconURL+" alt="+weatherDesc+"></span></h3>");
weatherDisplay.append("<p>Temperature: "+data.main.temp+"°F</p>");
weatherDisplay.append("<p>Humidity: "+data.main.humidity+"%</p>");
weatherDisplay.append("<p>Wind Speed: "+data.wind.speed+"MPH</p>");
    // cityName.innerText= data.name;
    // temperature.innerText = data.main.temp;
    // humidity.innerText = data.main.humidity;
    // windspeed.innerText = data.wind.speed;
    // console.log(cityName);
    // console.log(temperature);
    // console.log(humidity);
    // console.log(windspeed);
   
    
   }
    )
}



searchButton.on("click", displayWeather);