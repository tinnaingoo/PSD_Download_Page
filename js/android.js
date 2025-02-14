var Client = {
	blogId: "8069277289488798331",
	
	apiKey : "AIzaSyBzGmu6jEMZ6IuBeh_Od9cTJeijfT1gL24",
	
	isInBrowser: typeof Android === "undefined",
	
	host: function() {
		if(this.isInBrowser) {
			return "http://localhost:8000/posts.json";
		} else {
			return Android.host();
		}
	},
	
	nextPage: function(token) {
		if(this.isInBrowser) {
			return "https://www.googleapis.com/blogger/v3/blogs/" + this.blogId + "/posts?key=" + this.apiKey + "&pageToken="+ token +"";
		} else {
			return Android.nextPage(token);
		}
	},
	
	viewPostById: function(postId) {
		if(this.isInBrowser) {
			return "https://www.googleapis.com/blogger/v3/blogs/" + this.blogId + "/posts/" + postId + "?key=" + this.apiKey;
		} else {
			return Android.viewPostById(postId);
		}
	},
	
	searchBy: function(name) {
		if(this.isInBrowser) {
			return "https://www.googleapis.com/blogger/v3/blogs/" + this.blogId + "/posts/search?q=" + this.name + "&key=" + this.apiKey + "";
		} else {
			return Android.searchBy(name);
		}
	},
	
	Toast : function(m, d) {
		if(this.isInBrowser) {
			console.log("Toast: " + m);
		} else {
			Android.showToast(m, d);
		}
	},
	
	sharePost : function(objElement) {
		var url = objElement.getAttribute("data-url");
		
		if(this.isInBrowser) {
			//
		} else {
			Android.sharePost(url);
		}
	},
	
	exit : function() {
		if(this.isInBrowser){
			//
		} else {
			Android.exitApp();
		}
		
	}
	
}
