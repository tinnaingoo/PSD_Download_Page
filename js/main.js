var appBar = $(".app-bar");
var main = $("#main");

var	mainLayoutSetUp = function() {
	main.css({
		"margin-top": appBar.height() + "px",
		"height": window.innerHeight - appBar.height() + "px"
	});
}
mainLayoutSetUp();

main.on("scroll", function() {
	var mainScrollTop = $(this).scrollTop();
	
	if(mainScrollTop > 5) {
		appBar.css({
			"box-shadow" : "0 0 4px 0 rgba(0,0,0,.3)"
		});
	} else {
		appBar.css({
			"box-shadow" : "0 0 0 0 rgba(0,0,0,.3)"
		});
	}
});

function timeSince(date) {
	if (typeof date !== 'object')
	{
		date = new Date(date);
	}

	var seconds = Math.floor((new Date() - date) / 1000);
	var intervalType;

	var interval = Math.floor(seconds / 31536000);
	if (interval >= 1)
	{
		intervalType = 'year';
	}
	else
	{
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1)
		{
			intervalType = 'month';
		}
		else
		{
			interval = Math.floor(seconds / 86400);
			if (interval >= 1)
			{
				intervalType = 'day';
			}
			else
			{
				interval = Math.floor(seconds / 3600);
				if (interval >= 1)
				{
					intervalType = "hour";
				}
				else
				{
					interval = Math.floor(seconds / 60);
					if (interval >= 1)
					{
						intervalType = "minute";
					}
					else
					{
						interval = seconds;
						intervalType = "second";
					}
				}
			}
		}
	}

	if (interval > 1 || interval === 0)
	{
		intervalType += 's';
	}

	return interval + ' ' + intervalType;
}

function dateToTimestamp(strDate) {
	return Date.parse(strDate);
}

function dateFormat(updatedTime) {
	let year = updatedTime.substring(0, 4);
	let month = updatedTime.substring(5, 7);
	let day = updatedTime.substring(8, 10);
	let hour = updatedTime.substring(11, 13);
	let min = updatedTime.substring(14, 16);
	let sec = updatedTime.substring(17, 19);
	let fullDate = year + " " + month + " " + day + " " + hour + ":" + min + ":" + sec;
	
	return timeSince(dateToTimestamp(fullDate)) + " ago";
}

function iconLinkGen(c) {
	let imgStartTag = c.indexOf('<img');
	let imgEndTag = c.indexOf('</a>');
	let icon = c.substring(imgStartTag, imgEndTag);
	let start = icon.indexOf('src');
    let end = icon.indexOf('.jpg') || icon.indexOf(".jpeg");
    let iconUrl = icon.substring(start+5, end+4);
      
	if (imgStartTag < imgEndTag) {
	    return iconUrl;
		//return c.substring(imgStartTag, imgEndTag);
	} else {
		return 'img/drawer-header.png';
	}
}

// Open post-view.html
function postViewer(objElement) {
	var id = objElement.getAttribute("data-id");
	window.location.href = "file:///android_asset/templates/post-view.html?id=" + btoa(id);
}

function callPostViewerFromTem(objElement) {
	var id = objElement.getAttribute("data-id");
	window.location.href = "../templates/post-view.html?id=" + btoa(id);
}

// Change the page
function pageChange(name, params) {
	window.location.href = "./templates/" + name + ".html?" + params;
}

// query string reader
function queryStringReader(name) {
	var queryStrings = window.location.search;
	var params = new URLSearchParams(queryStrings);
	return params.get(name);
	
}

// Refresh when button clicked
$(".refresh-icon").on("click", function() {
	window.location.reload(true);
});


function favDataFormat(postId) {
	var obj = dataStorage.getEntryData();
	
	for (let i = 0; i < obj.length; i++) {
        for (let r = 0; r < obj[i].items.length; r++) {
            var id = obj[i].items[r].id;
            var title = obj[i].items[r].title;
            var iconLink = iconLinkGen(obj[i].items[r].content);
            var postUrl = obj[i].items[r].url;   
            
            if(postId == id){
            	return {"id": id, "title": title, "iconLink": iconLink, "postUrl": postUrl, "date": new Date().getTime()}
            }
        }       
	}
}
// check fav state 
function checkFavState(id) {
	let favData = dataStorage.getFavData();
    let ans = "favorite_border";
    
    if(favData != null) {
       favData.forEach((val) => {
            if(id == val.id) {
                ans = "favorite";
            }
        });
    }
    
    return ans;
}

// Save to favorite
function saveToFav(objElement) {
	var favData = dataStorage.getFavData();
	var postId = objElement.getAttribute("data-id");
	var formattedData = favDataFormat(postId);
	var favDataArray = [];
	
	if(objElement.innerHTML == "favorite_border") {
		objElement.innerHTML = "favorite";
		
		favDataArray.push(formattedData);
		dataStorage.updateFavData(favDataArray);
		
		if(favData != null) {
			favData.push(formattedData);
			dataStorage.updateFavData(favData);
		}
		
		Client.Toast("Added to favorite.", 0);
	} else {
		objElement.innerHTML = "favorite_border";
		favData.forEach(function(val, index) {
			if(val.id == postId) {
				favData.splice(index, 1);
				dataStorage.updateFavData(favData);
			}
		});
		
		Client.Toast("Remove from favorite.", 0);
	}
}

// Random post
function randomPost(view, callbackFunc, dataObj) {
	let a, b, c, d, e;
        
    let obj = dataObj;
    
    var nums = [1 , 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var arr = [];
    var i = nums.length;
    var j = 0;
    
    while (i--) {
	    j = Math.floor(Math.random() * (i+1));
	    arr.push(nums[j]);
	    nums.splice(j, 1);
    }

    for (let i = 0; i < obj.length; i++) {
        for (let r = 0; r < obj[i].items.length; r++) {
            let id = obj[i].items[r].id;
            let title = obj[i].items[r].title;
            let content = obj[i].items[r].content;
            let date = dateFormat(obj[i].items[r].updated);
            let icon = iconLinkGen(content);
            let selfLink = obj[i].items[r].selfLink;
            
            for(let j = 0; j < 3; j++) {
                if(arr[j] == r) {
                       
                    view.append(callbackFunc(title, id));
                
                    $('.rand-bg-' + id + '').css({
                        "background-image": "url("+icon+")",
                        "background-size": "100%"
                        
                    });
                }
            }
        }
    }
}

var dataStorage = {
	entryDataKey : "entryData",
	
	favDataKey : "favData",
	
	searchDataKey : "searchDataKey",
	
	updateEntryData : function(data) {
		sessionStorage.setItem(this.entryDataKey, JSON.stringify(data));
	},
	
	getEntryData : function() {
		return JSON.parse(sessionStorage.getItem(this.entryDataKey));
	},
	
	updateFavData : function(data) {
		localStorage.setItem(this.favDataKey, JSON.stringify(data));
	},
	
	getFavData : function() {
		return JSON.parse(localStorage.getItem(this.favDataKey));
	},
	
	removeFavData : function() {
		localStorage.removeItem(this.favDataKey);
	},
	
	updateSearchData : function(data) {
		sessionStorage.setItem(this.searchDataKey, JSON.stringify(data));
	},
	
	getSearchData : function() {
		return JSON.parse(sessionStorage.getItem(this.searchDataKey));
	},
}
var view = [$("#recent-list"), $("#search-view"), $("#post-view"), $("#view-all")];

// Next page
function loadNextPage(objElement){
	var dataEntryArray = [];
	var entryData = dataStorage.getEntryData();
	var token = objElement.getAttribute("data-token");
	var viewIndex = objElement.getAttribute("data-vindex");
	var loadMore = $(".load-more");	
	
	loadMore.text("Loading ...");
	
	$.get(Client.nextPage(token)).done(function(data) {
		loadMore.hide();
		entryData.push(data);
		
		if(viewIndex == 0 || viewIndex == 3) {
    		dataStorage.updateEntryData(entryData);
		}
		
		if(viewIndex == 1) {
		    dataStorage.updateSearchData(entryData);
		}
		
		dataParser(viewIndex, "all", recentPostV, JSON.parse(JSON.stringify([data])));
	}).fail(function() {
		loadMore.text("Get more data");
	})
}

// data parser
var dataParser = function(viewIndex, labelName, callbackFunc, dataObj) {
	var obj = dataObj;
	
	for (let i = 0; i < obj.length; i++) {
        for (let r = 0; r < obj[i].items.length; r++) {
            var id = obj[i].items[r].id;
            var title = obj[i].items[r].title;
            var content = obj[i].items[r].content;
            var modifiedDate = dateFormat(obj[i].items[r].updated);
            var iconLink = iconLinkGen(content);
            var selfLink = obj[i].items[r].selfLink;
            var postUrl = obj[i].items[r].url;
            
            if(labelName == "all" || labelName == id) {
                view[viewIndex].append(callbackFunc(id, title, content, iconLink, modifiedDate, postUrl));
            }
                       
           $('.icon-'+id+'').css({
	           "background-image": "url("+iconLink+")",
	           "background-size": "100%"                
           });
        }       
	}
	
	if(labelName == "all") {
		if (obj[obj.length - 1].nextPageToken == undefined) {
			view[viewIndex].append("<div class='load-more'>No more result</div>");
		} else {
			let token = obj[obj.length - 1].nextPageToken;
			view[viewIndex].append('<div class="load-more main-font" data-token="'+ token +'" data-vindex="'+ viewIndex +'" onclick="loadNextPage(this)">Get more data</div>');
		}
	}
}

function recentPost(viewIndex, callPageName) {
	var dataEntryArray = [];
	var dataEntry = dataStorage.getEntryData();
	loaderView.show();
	
	if(dataEntry == null) {
		$.get(Client.host()).done(function(data) {
			dataEntryArray.push(data);
			if(callPageName == "index") {
				dataStorage.updateEntryData(dataEntryArray);
				randomPost(randRow, randomPostLayout, JSON.parse(JSON.stringify([data])));
			}
			dataParser(viewIndex, "all", recentPostV, JSON.parse(JSON.stringify([data])));
		}).fail(function() {
			loaderView.hide();
			refreshBtn.show();
			searchBtn.hide();
			errorView.show();
			Client.Toast("failed", 0);
		});
	} else {
		if(callPageName == "index"){
			randomPost(randRow, randomPostLayout, dataEntry);
		}
		dataParser(viewIndex, "all", recentPostV, dataEntry);
		pageYPos();
	}
}

// get pageY position of the id main
function pageYPos() {
    let yPos = sessionStorage.getItem("setPos");
    if(yPos != null) {
        $("#main").scrollTop(yPos);
    }
}

function randomPostLayout(title, id) {
	return `<td>
				<div class="rand-post rand-bg-${id}" data-id="${id}" onclick="postViewer(this)">
					<div class="title main-font">${title}</div>
				</div>
			</td>`;
} 

// Callback function
function recentPostV(id, title, content, iconLink, modifiedDate, postUrl) {
	loaderView.hide();
	main.show();
	
	return `<div class="recent-post row" >
			<div>
				<div class="icon icon-${id}"></div>
			</div>
			
			<div>
				<div class="title main-font" onclick="postViewer(this)" data-id="${id}">${title}</div>
				<div class="row" style="margin-top:10px;">
					<div class="date-row row" >
						<div class="material-icons" >public</div>
						<div style="margin-left: 5px" class="main-font">${modifiedDate}</div>
					</div>
					<div class="menu-icon" >
						<div class="fav-icon material-icons" data-id="${id}" onclick="saveToFav(this)">${checkFavState(id)}</div>
					</div>
				</div>
			</div>
			
		</div>`;
}