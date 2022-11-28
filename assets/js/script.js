var inputField = $("#input-field");
var searchButton = $("#search-button");
var ApiKey = 'df1f95abf86a9ba36be3296f75c98d93';
var cityName = $("#current-city");
// var temperature = $("#temperature");
// var humidity = $("#humidity");
// var windspeed = $("#wind-speed");
var weatherDisplay = $(".current-weather-display");
var fivedayDisplay = $(".five-day-display");
var now = dayjs().format("MMMM D, YYYY");
// var lat;
// var lon;


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

    // console.log(city);
}

function fetchCityDetails(city) {
    weatherDisplay.show();
    weatherDisplay.empty();
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + ApiKey;
    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            // cityName.innerText= data.name;
            var weatherIcon = data.weather[0].icon;
            var weatherDesc = data.weather[0].description;
            var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            weatherDisplay.append("<h3>" + data.name + " <span>" + now + "<img src=" + iconURL + " alt=" + weatherDesc + "></span></h3>");
            weatherDisplay.append("<p>Temperature: " + data.main.temp + "°F</p>");
            weatherDisplay.append("<p>Humidity: " + data.main.humidity + "%</p>");
            weatherDisplay.append("<p>Wind Speed: " + data.wind.speed + "MPH</p>");
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
            display5DayForecast(lat, lon);
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
function display5DayForecast(lat, lon) {
    var futureWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + ApiKey;
    fetch(futureWeatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);


            // console.log(output[i]);
            // var result = output[i];
            var result5 = new Array();
            for (var i = 0; i < 5; i++) {
                result5.push(data.list[i * 8]);
                // var temperature = result5[0].main.temp;
                // console.log(typeof(result5));
                // }


            }
            console.log(result5);
            for (var i = 0; i < result5.length; i++) {
                var icon = result5[i].weather[0].icon;
                var iconDesc = result5[i].weather[0].description;
                var URLforIcon = "http://openweathermap.org/img/wn/" + icon + ".png";
                var temp = result5[i].main.temp;
                var wind = result5[i].wind.speed;
                var humidity = result5[i].main.humidity;
                var singleCard = 
                $('<div class="weather-stats"><p><img src='+URLforIcon+'></p><p>'+temp+'°F</p><p>'+wind+'MPH</p><p>'+humidity+'%</p></div>');
                fivedayDisplay.append(singleCard);
                fivedayDisplay.show();
                fivedayDisplay.css("display", "flex")
                // card.append("<p>"+temp+"°F</p>");

                // console.log(icon);
                // console.log(iconDesc);
                // console.log(temperature);
                // console.log(wind);
                // console.log(humidity);

            }

            // console.log(icon);
            // var iconDesc = result5[i].weather[0].description;
            //     var temperature = result5[i].main.temp;
            //     var wind = result5[i].wind.speed;
            //     var humidity = result5[i].main.humidity;


            // for(var i=0; i<5; i++){
            //     var temperature = result5[i].main.temp;
            //     var date = dayjs.unix(result5[i].dt).$d.format("MM/DD/YYYY");
            //     console.log(temperature);
            //     console.log(date);
            // }

        })
    // console.log(futureWeatherApi);
}



searchButton.on("click", displayWeather);