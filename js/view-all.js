var name = queryStringReader("name");
var viewAll = $("#view-all");
var appName = $(".app-name");
var loaderView = $(".loader-view");

$(document).ready(function() {
	$("#main").show();
	
	if(name == "rcp"){
		appName.text("Recent Posts");
		recentPost(3, "view-all"); // main.js
	}
});