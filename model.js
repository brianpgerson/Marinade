function PrimaryBookmarksTree(){
	chrome.storage.sync.get(this.findOrCreate.bind(this));
}

PrimaryBookmarksTree.prototype.findOrCreate = function(result){
	if (result.bookmarksTree != undefined){
		this.bookmarks = result.bookmarksTree.bookmarks;
		this.title = result.bookmarksTree.bookmarks.title;
		this.tagGroups = result.bookmarksTree.bookmarks.tagGroups;
	} else {
		this.bookmarks = [];
		this.title = "Marinade Bookmarks";
		this.tagGroups = [];
		chrome.storage.sync.set({"bookmarksTree": this}, function(){console.log("New tree created!")});
	}
}

function tagGroup(tag){
	this.bookmarks = [];
	this.tag = tag;
}

function Bookmark(name, tags, url){
	this.name = name;
	this.tags = tags;
	this.url = url;
	this.dateCreated = this.date();
}

Bookmark.prototype.date = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	} 
	if (mm < 10) {
		mm = '0' + mm;
	} 
	return mm + '/' + dd + '/' + yyyy;
}


PrimaryBookmarksTree.prototype.createNewTagGroup = function(tagGroups){
	chrome.storage.sync.get(function(result){
		if (result.bookmarksTree === undefined){
			console.log("Nothing here!");
		} else {
			for (i = 0; i<result.bookmarksTree.bookmarks.length; i++){
				console.log("okay")
			}
		}
	});

	this.bookmarks.push(newTree);
}

PrimaryBookmarksTree.prototype.createNewBookmark = function(name, tags, url){
	var newBookmark = new Bookmark(name, tags, url);

	chrome.storage.sync.get(function(result){
			result.bookmarksTree.bookmarks.push(newBookmark);
			this.updateStorage(result);
	}.bind(this));
}


PrimaryBookmarksTree.prototype.updateStorage = function(result){
	chrome.storage.sync.set(result, function(){console.log("Bookmarks saved!")});

}



