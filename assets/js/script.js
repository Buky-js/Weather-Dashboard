var inputField = $("#input-field");
var searchButton = $("#search-button");
var ApiKey = 'df1f95abf86a9ba36be3296f75c98d93';





function displayWeather(){
var city = inputField.val();
if(city == ""){
    alert("Please enter a city name");
    return;
}
fetchCityDetails(city);
console.log(city);
}

function fetchCityDetails(city){
   var apiUrl = ''
}
searchButton.on("click", displayWeather);