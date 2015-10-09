function PrimaryBookmarksTree(){
	this.bookmarks = [];
	this.title = "Marinade Bookmarks";
}

function tagGroup(tag){
	this.bookmarks = [];
	this.tag = tag;
}

function Bookmark(name, url, tags){
	this.name = name;
	this.url = url;
	this.dateCreated = this.date();
	this.tags = tags;
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


PrimaryBookmarksTree.prototype.createNewtagGroup = function(tag){
	newTree = new tagGroup(tag)
	this.bookmarks.push(newTree);
}

PrimaryBookmarksTree.prototype.createBookmark = function(name, url, tags){
	newBookmark = new Bookmark(name, url, tags);
	this.bookmarks.push(newBookmark);
}

PrimaryBookmarksTree.prototype.checkForTagGroup = function(){
	var tagsToCheck = this.pluck(this.bookmarks, "tags")
	console.log(tagsToCheck);
}

PrimaryBookmarksTree.prototype.pluck = function(list, prop){
	var results = [];
	if (Array.isArray(list)){
		for (i=0; i<list.length; i++){
			for (var key in list[i]){
				if (key == prop){
					results.push(list[i][prop])
				}			
			}
		}
	}
	return results;
}