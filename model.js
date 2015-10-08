function PrimaryBookmarksTree(){
	this.bookmarks = [];
	this.title = "Marinade Bookmarks";
}

function SecondaryBookmarksTree(tag){
	this.bookmarks = [];
	this.tag = tag;
}

function Bookmark(name, url, tags){
	this.name = name;
	this.url = url;
	this.dateCreated = this.date;
	this.tags = tags;
}

Bookmark.prototype.date = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd < 10) {
		dd = '0' + dd;
	} 
	if(mm < 10) {
		mm = '0' + mm;
	} 
	return mm + '/' + dd + '/' + yyyy;
}

