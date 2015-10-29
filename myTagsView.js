function TagView(){};	


TagView.prototype.display = function() {
	console.log("i'm trying");
	chrome.storage.sync.get("bookmarksTree", function(result){
		console.log(result);
		var bookmarks = result.bookmarksTree.bookmarks;
		var bookmarksDiv = document.getElementById("bookmarksMain");
		for(i=0; i<bookmarks.length; i++){
			bookmarksDiv.innerHTML += "<div id='tileContainer'><div id='tile'><a href="+bookmarks[i].url+" id = 'linky'></a></div><a href="+bookmarks[i].url+" target =_'blank'>"+bookmarks[i].name+"</a></div>";
		}
	});
}
