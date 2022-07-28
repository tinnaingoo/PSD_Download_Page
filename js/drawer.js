var drawerLayout = document.querySelector("#drawer-layout");
var drawerOverlay = document.querySelector("#drawer-overlay");

function drawerToggle(b) {
    (b) ? drawer.open() : drawer.close();
}

function drawerItemSelected(data){
	drawer.close();
	switch(drawer.selectedItem(data)){
		case "home":
			//localStorage.clear();
			break;
			
		case "fav":
			pageChange("favorite-list");
			break;
			
		case "refresh":
		    window.location.reload(true);
		    break;
		    
		case "facebook":
		    pageChange("info"); 
		    break;
			
		case "clear_all":
			localStorage.clear();
			sessionStorage.clear();
			Client.Toast("Cleared!", 0);
			window.location.reload(true);
			break;
	}
}

var drawer = {
    open: function() {	
        drawerLayout.classList.remove("dLayoutClose");
        drawerOverlay.classList.remove("dOverlayClose");
        drawerLayout.classList.add("dLayoutOpen");
        drawerOverlay.classList.add("dOverlayOpen");
        drawerLayout.style.display = "block";
        drawerOverlay.style.display = "block";
    },

    close: function() {
        drawerLayout.classList.remove("dLayoutOpen");
        drawerOverlay.classList.remove("dOverlayOpen");
        drawerLayout.classList.add("dLayoutClose");
        drawerOverlay.classList.add("dOverlayClose");
        drawerOverlay.style.display = "none";
        setTimeout(function() {
            drawerLayout.style.display = "none";
        }, 300);
    },
    
    selectedItem : function(data) {
    	return data.getAttribute("data-id");
    }
}