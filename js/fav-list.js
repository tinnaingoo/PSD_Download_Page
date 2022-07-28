var favData = dataStorage.getFavData();
var favListView = $("#fav-list");
var delAllFavBtn = $("#delete-all-fav");
var noFavDataMsg = $(".no-fav-data");
var alertView = document.querySelector("#alertView");
var alertOverlay = document.querySelector("#alertOverlay");

$(document).ready(function() {
	$("#main").show();
	favDataRetriever();
});

function favDataRetriever() {
	noFavDataMsg.show();
	delAllFavBtn.hide();
	
	if(favData != null) {
		favData.forEach(function(val, index) {
			var id = val.id;
			var title = val.title;
			var iconLink = val.iconLink;
			var postUrl = val.postUrl;
			var date = timeSince(val.date);
			
			favListView.append(favView(id, title, iconLink, date, index))
		});
	} else {
		delAllFavBtn.hide();
	}
}

function favView(id, title, icon, date, index) {
	noFavDataMsg.hide();
	delAllFavBtn.show();
	
	return `<div class="fav-post row" >
			<div class="col-1" >
			<div class="icon material-icons">cloud_download</div>
			</div>
			<div class="col-2" >
			<div class="title unicode" data-id="${id}" onclick="callPostViewerFromTem(this)">${title}</div>
			<div class="row" >
			<div class="material-icons" style="font-size: 11pt; color: #888;" >public</div>
			<div class="date unicode" >${date}</div>
			</div>
			</div>
			<div class="col-3" >
			<div class="material-icons" data-id="${id}" data-index="${index}" onclick="removeFavDataByOne(this)">delete</div>
			</div>
		</div>`;
}

function removeFavDataByOne(objElement) {
	var index = objElement.getAttribute("data-index");
	
	favData.splice(index, 1);
	dataStorage.updateFavData(favData);
	favListView.html("");
	favDataRetriever();
}

delAllFavBtn.on("click", function() {
	showMAlert("Alert", "Are you want to delete all favorite?");
});

// mAlert
function showMAlert(title, content){
	mAlert.title = title;
	mAlert.content = content;
	
	mAlert.show(alertView, alertOverlay);
}

function mAlertCancel() {
	alertView.innerHTML = "";
	alertOverlay.innerHTML = "";
}

function mAlertOk(){
	mAlertCancel();
    dataStorage.removeFavData();
    favListView.html("");
    $(this).fadeOut();
    Client.Toast("Deleted!", 0);
}