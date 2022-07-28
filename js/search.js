var searchClearBtn = $(".clear-btn");
var searchInput = $("#search-input");
var searchForm = $("#search-form");
var noSearchResult = $(".no-search-result");
var loaderView = $(".loader-view");
var errorView = $(".fail-view");
var searchView = $("#search-view");
var searchData = dataStorage.getSearchData();

$(document).ready(function() {
	main.show();
	
	if(searchData != null) {
		parsingSearchData();
	}
	
	$("#main").scrollTop(sessionStorage.getItem("searchMainPos"));
});

$("#main").on("scroll", function() {
    sessionStorage.setItem("searchMainPos", $(this).scrollTop());
});

function uTyping(val) {
	if(val.length > 0) {
		searchClearBtn.fadeIn("fast");
	} else {
		searchClearBtn.fadeOut("fast");
	}
}

searchClearBtn.on("click", function() {
	searchInput.val("");
	$(this).hide();
});

searchForm.on("submit", function() {
	noSearchResult.hide();
	loaderView.show();
	searchView.html("");
	parsingSearchData();
	
	// Prevent default from submitting
	return false;
});
// Call this func when submitting
function parsingSearchData() {
	var searchDataArray = [];
	
	if(searchData == null) {
		$.get(Client.searchBy(searchInput.val())).done(function(data) {
			searchDataArray.push(data);
			dataStorage.updateSearchData(searchDataArray);
			
			workIngWithSearchData(JSON.parse(JSON.stringify([data])));
		}).fail(function() {
			errorView.show();
		});
	} else {
		noSearchResult.hide();
		workIngWithSearchData(searchData);
	}
}

// Working this function when the data loading is success
function workIngWithSearchData(data) {
	// dataParser(viewIndex, label, callback, data);
	loaderView.hide();
	errorView.hide();
	
	dataParser(1, "all", recentPostV, data);
}

function recentPostV(id, title, content, iconLink, modifiedDate, postUrl) {
	return `<div class="search-post row" >
			<div>
				<div class="icon material-icons">search</div>
			</div>
			
			<div>
				<div class="title main-font" onclick="callPostViewerFromTem(this)" data-id="${id}">${title}</div>
				<div class="row" style="margin-top:10px;">
					<div class="date-row row" >
						<div class="material-icons" >public</div>
						<div style="margin-left: 5px" class="main-font">${modifiedDate}</div>
					</div>
					<!--<div class="menu-icon" >
						<div class="fav-icon material-icons" data-id="${id}" onclick="saveToFav(this)">${checkFavState(id)}</div>
					</div>-->
				</div>
			</div>
			
		</div>`;
}