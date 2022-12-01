// Declaring variables

var inputField = $("#input-field");
var searchButton = $("#search-button");
var ApiKey = 'df1f95abf86a9ba36be3296f75c98d93';
var cityName = $("#current-city");
var weatherDisplay = $(".current-weather-display");
var fivedayDisplay = $(".five-day-display");
var now = dayjs().format("MMMM D, YYYY");
var searchHistory = $(".list-group")
var cities = [];
function displayWeather(event) {
    event.preventDefault();
    var city = inputField.val().trim();
    if (city == "") {
        alert("Please enter a city name");
        return;
    }
    if (city !== "") {
        fetchCityDetails(city);
        
      
    }

}

// function to fetch current day weather

function fetchCityDetails(city) {
    weatherDisplay.show();
    weatherDisplay.empty();
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + ApiKey;
    fetch(apiUrl)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
             console.log(data);
if (data.cod !== 200){
alert("Please enter a valid city name");
return;
}else{
    cities.unshift(city);
    // if (cities.indexOf(city)==-1)
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(cities);
    addCityToSearchHistory(city);
}

            // cityName.innerText= data.name;
            var weatherIcon = data.weather[0].icon;
            var weatherDesc = data.weather[0].description;
            var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            weatherDisplay.append("<h3>" + data.name + " <span>" + now + "<img src=" + iconURL + " alt=" + weatherDesc + "></span></h3>");
            weatherDisplay.append("<p>Temperature: " + data.main.temp + "°C</p>");
            weatherDisplay.append("<p>Humidity: " + data.main.humidity + "%</p>");
            weatherDisplay.append("<p>Wind Speed: " + data.wind.speed + "MPH</p>");
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            display5DayForecast(lat, lon);

            
        }



        )


}

// function to display 5-day weather forecast
function display5DayForecast(lat, lon) {
    fivedayDisplay.show();
    fivedayDisplay.css("display", "flex");
    fivedayDisplay.empty();

    var futureWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + ApiKey;
    fetch(futureWeatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            var result5 = new Array();
            for (var i = 0; i < 5; i++) {
                result5.push(data.list[i * 8]);

                console.log(result5);
            }

            for (var i = 0; i < result5.length; i++) {

                var date = result5[i].dt;
             
                var newDate = dayjs(date * 1000).format("MM/DD/YYYY");
            

                // variables for the weather parameters
                var icon = result5[i].weather[0].icon;
                var iconDesc = result5[i].weather[0].description;
                var URLforIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
                var temp = result5[i].main.temp;
                var wind = result5[i].wind.speed;
                var humidity = result5[i].main.humidity;
                var singleCard =
                    $('<div class="weather-stats"><p>' + newDate + '</p><p><img src=' + URLforIcon + ' alt=' + iconDesc + '></p><p>' + temp + '°C</p><p>' + wind + 'MPH</p><p>' + humidity + '%</p></div>');
                fivedayDisplay.append(singleCard);

            }
        })

}
// function SearchCityButton(event) {
//     event.preventDefault();

// }
function addCityToSearchHistory(city) {
    var c = city.charAt(0).toUpperCase() + city.slice(1);
    var citySearched = $("<button>" + c + "</button>");
    citySearched.addClass("d-flex w-100 btn-light border p-2 searched-city");
    citySearched.attr("data-value", c);
    citySearched.attr("type", "submit");
    searchHistory.prepend(citySearched);
    console.log(searchHistory);
    var cityList = searchHistory[0].innerText.length;
    console.log(cityList);
    // if(cityList.includes("c")){

    // }
}
searchHistory.on("click", function(e){
    if($(e.target).hasClass("searched-city")){
    //    console.log(e.target.innerText);
    var citySelected = e.target.innerText;
   fetchCityDetails(citySelected);
    }
})
searchButton.on("click", displayWeather);