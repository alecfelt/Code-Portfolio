var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var urlStream = 'https://api.twitch.tv/kraken/streams/';
var urlProfile = 'https://api.twitch.tv/kraken/channels/';

function parseOnline(response, i) {
  $("#streamers").append("<div class=\"entry container-fluid\"><div class=\"row\"><div class=\"pic" + i + " col-sm-5 col-xs-5 col-md-5 col-lg-5\"></div><div class=\"text" + i + " col-sm-7 col-xs-7 col-md-7 col-lg-7 text-left\"></div></div></div>");
  $(".pic"+i).append("<img src=\"" + response.stream.channel.logo + "\"></img><div class=\"title\" style=\"text-decoration:none;\"><a href=\"" + response.stream.channel.url + "\">" + response.stream.channel.display_name + "</a></div>");
  $(".text"+i).append("<div class=\"title\">Game: </div>" + response.stream.game + "<br><div class=\"title\">Status: </div>" + response.stream.channel.status + "<br><div class=\"title\">Viewers: </div>" + response.stream.viewers);
}

function parseOffline(i, user) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": (urlProfile + user),
    "method": "GET",
    "headers": {
      "client-id": "3wzg1xr1kqzeh8kpq8miqefy66crby"
    }
  }
  $.ajax(settings).done(function (response) {
    $("#streamers").append("<div class=\"entry container-fluid\"><div class=\"row\"><div class=\"pic" + i + " col-sm-5 col-xs-5 col-md-5 col-lg-5\"></div><div class=\"text" + i + " col-sm-7 col-xs-7 col-md-7 col-lg-7 text-left\"></div></div></div>");
    $(".pic"+i).append("<img src=\"" + response.logo + "\"></img><div class=\"title\" style=\"text-decoration:none;\"><a href=\"" + response.url + "\">" + response.display_name + "</a></div>");
    $(".text"+i).append("<div class=\"title\">Game: </div>" + response.game);
  });
}

function getStream(type, user, i) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": (urlStream + user),
    "method": "GET",
    "headers": {
      "client-id": "3wzg1xr1kqzeh8kpq8miqefy66crby"
    }
  }
  $.ajax(settings).done(function (response) {
    if(response.stream != null && type == "online"){
      parseOnline(response, i);
    }else if(type == "offline" && response.stream == null){
      parseOffline(i, user);
    }else if(type == "all"){
      if(response.stream != null){
        parseOnline(response, i);
      }else{
        parseOffline(i, user);
      }
    }
  });
}

function online() {
  $("#streamers").empty();
  for(var i = 0; i < users.length; i++){
    getStream("online", users[i], i);
  }
}

function offline() {
  $("#streamers").empty();
  for(var i = 0; i < users.length; i++){
    getStream("offline", users[i], i);
  }
}

function yall() {
  $("#streamers").empty();
  for(var i = 0; i < users.length; i++){
    getStream("all", users[i], i);
  }
}
