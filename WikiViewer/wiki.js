function searchWiki() {
  var str = $("#search").val();
  $("#search-bar").css("margin-top", "5vw");
  search(str);
  $("#search-results").html("<div class=\"loader\"></div><div style=\"\"class=\"text-center\">Loading..</div>");
}

//var url = "https://en.wikipedia.org/w/api.php";
var randomUrl = "https://en.wikipedia.org/wiki/Special:Random";
var linkUrl = "https://en.wikipedia.org/wiki/";

function random() {
  window.open(randomUrl);
}

function search(word) {
  var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=search&formatversion=2&inprop=displaytitle&gsrsearch=" + word + "&gsrlimit=10&callback=?";

  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      parseSearch(data);
    },
    error: function (errorMessage) {
      $("#search-results").text(JSON.stringify(errorMessage));
    }
  });
}

function parseSearch(search) {
  var pages = "";
  for(var i = 0; i < 10; i++){
    var str = search.query.pages[i].title;
    pages += ("<div class=\"emphasize-inset\"><a style=\"color: ghostwhite;font-family: Ubuntu;\"href=\"" + linkUrl + str + "\" class=\"button button-default\">"+ str + "</a></div>");
  }
  $("#search-bar").css("margin-bottom", "3%");
  $("#search-results").html(pages);
}
