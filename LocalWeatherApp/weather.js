function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateWeather);
    $("h1").text("success");
  } else {
    $("h1").text("failure");
  }
}

function updateWeather(location) {
  $("h1").html("updateWeather");
  var coords = location.coords;
  var lat = coords.latitude;
  var lon = coords.longitude;
  var alt = coords.altitude;
  var time = location.timestamp;
  $("h1").html("latitude: " + lat + "<br>longitude: " + lon + "<br>altitude: " + alt + "<br>timestamp: " + time);
  getWeather("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon);
}

function getWeather(url) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": url,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    parseWeather(response);
  });
}

function parseWeather(response) {
  var weather = response.weather[0].main;
  var icon = response.weather[0].icon;
  var temp = response.main.temp;
  var humidity = response.main.humidity;
  var windSpeed = response.wind.speed;
  var country = response.sys.country;
  var city = response.name;
  setWeather(weather, icon, temp, humidity, windSpeed, country, city);
}

function setWeather(w, i, t, h, ws, co, ci) {
  $("h1").html(ci + ", " + co);
  $("#weather-type").html(w);
  $("#weather-icon").html("<img src=\"" + i + "\">");
  $("#temp-type").html("Temperature:");
  $("#temp-number").html(t + " C");
  $("#wind-icon").html("Wind Speed:");
  $("#wind-number").html(ws + " mph");
  $("#humidity-type").html("Humidity:");
  $("#humidity-number").html(h + "%");
}
