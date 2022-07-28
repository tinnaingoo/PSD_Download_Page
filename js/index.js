var refreshBtn = $(".refresh-icon");
var searchBtn = $(".search-icon");
var errorView = $(".fail-view");
var loaderView = $(".loader-view");
var main = $("#main");
var randRow = $("#rand-post-cont");

$(window).on("load", function() {
	$(document).ready(function() {
		recentPost(0, "index");
	});
});

$("#main").on("scroll", function() {
	sessionStorage.setItem("setPos", $(this).scrollTop())
});

$(".recent-view-all").on("click", function() {
	pageChange("view-all", "name=rcp");
});
