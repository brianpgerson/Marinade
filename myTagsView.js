function TagView(){};	


TagView.prototype.display = function() {
	chrome.storage.sync.get("bookmarksTree", function(result){
		console.log(result);
		var tagGroups = result.bookmarksTree.tagGroups;
		var bookmarksDiv = document.getElementById("bookmarksMain");
		for(i=0; i<tagGroups.length; i++){
			bookmarksDiv.innerHTML += "<div id='tileContainer'><div id='tile'></div>"+tagGroups[i].tag+": "+tagGroups[i].bookmarks[0]+" bookmarks</div>";
		}
	});
}

