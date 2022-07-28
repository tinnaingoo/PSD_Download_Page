var errorView = $(".fail-view");
var loaderView = $(".loader-view");
var main = $("#main");
var refreshBtn = $(".refresh-icon");

$(document).ready(function() {
	var dataEntry = dataStorage.getEntryData();
	var postView = $("#post-view");
	var postId = atob(queryStringReader("id"));
	
	loaderView.show();
	
//	if(dataEntry != null) {
//		dataParser(2, postId, postViewLayout, dataEntry);
//	} else {
		$.get(Client.viewPostById(postId)).done(function(data) {
			var id = data.id;
			var title = data.title;
			var content = data.content;
			var iconLink = "";
			var modifiedDate = dateFormat(data.updated);
			var postUrl = data.url;
			postView.append(postViewLayout(id, title, content, iconLink, modifiedDate, postUrl));
		}).fail(function() {
			refreshBtn.show();
			errorView.show();
			Client.Toast("failed", 0)
		});
//	}
});

function postViewLayout(id, title, content, iconLink, modifiedDate, postUrl){
	var appName = $(".app-name");
	appName.html(title.substr(0, 25) + " ...");
	loaderView.hide();
	refreshBtn.hide();
	errorView.hide();
	main.show();
	
	return `
		<div class="header row">
			<div class="date-row row">
				<div class="material-icons">public</div>
				<div class="main-font">${modifiedDate}</div>
			</div>
			
			<div class="menu-icon row">
				<div class="material-icons" onclick="saveToFav(this)" data-id="${id}">${checkFavState(id)}</div>
			</div>
		</div>
		
		<div class="content">
			${content}
		</div>
	`;
}