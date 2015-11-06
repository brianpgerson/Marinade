function PrimaryBookmarksTree(){
	chrome.storage.sync.get(null, this.findOrCreate.bind(this));
}

PrimaryBookmarksTree.prototype.findOrCreate = function(result){
	if (result.bookmarksTree != undefined){
		this.bookmarks = result.bookmarksTree.bookmarks;
		this.title = result.bookmarksTree.title;
		this.tagGroups = this.updatePrimaryTreeWithTagGroups();
		console.log(this);
	} else {
		this.bookmarks = [];
		this.title = "Marinade Bookmarks";
		this.tagGroups = [];
		chrome.storage.sync.set({"bookmarksTree": this}, function(){console.log("New tree created!")});
		console.log(this);
	}
}

function Bookmark(name, tags, url){
	this.name = name;
	this.tags = tags;
	this.url = url;
	this.dateCreated = this.date();
}

function TagGroup(tag){
	this.bookmarks = [];
	this.tag = tag;
}

//called by controller when user tags a new bookmark via the extension
PrimaryBookmarksTree.prototype.createNewBookmark = function(name, tags, url){
	var newBookmark = new Bookmark(name, tags, url);
	this.bookmarks.push(newBookmark);
	this.updateStorage(this);		

}

PrimaryBookmarksTree.prototype.updatePrimaryTreeWithTagGroups = function(){	
	var tagsForGrouping = this.getTagsWithMultipleBookmarks(this.bookmarks);
	var tagGroups = [];
	for(j=0;j<tagsForGrouping.length;j++){
		tagGroups.push(this.buildTagGroup(tagsForGrouping[j]));
	}
	return tagGroups;
}

PrimaryBookmarksTree.prototype.getTagsWithMultipleBookmarks = function(bookmarks){
	var tagsToCheck = this.pluck(bookmarks, "tags");
	var tagCounts = tagsToCheck.reduce(function (obj, curr){
		if (typeof obj[curr] == 'undefined') {
			obj[curr] = 1;
		} else {
			obj[curr] += 1;
		}
		return obj;
	}, {});
	var tagGroupNames = this.filter(tagCounts, function(x){return x > 1});
	return tagGroupNames;
}

PrimaryBookmarksTree.prototype.buildTagGroup = function(tag){
	tagGroup = new TagGroup(tag);
	for(i=0;i<this.bookmarks.length;i++){
		if(this.bookmarks[i].tags[0] == tag){
			tagGroup.bookmarks.push(this.bookmarks[i]);
		}
	}
	if (tagGroup.bookmarks.length != 0){
		return tagGroup;
	}
}


PrimaryBookmarksTree.prototype.updateStorage = function(updatedTree){
	console.log(JSON.stringify(updatedTree));
	chrome.storage.sync.set({"bookmarksTree": updatedTree}, function(){console.log("final storage complete")});
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


PrimaryBookmarksTree.prototype.filter = function(list, callback, context){
	var callback = context ? callback.bind(context) : callback;
	var filteredList = []
	if (Array.isArray(list)){
		for (i=0; i<list.length; i++){
			if (callback(list[i])) {
				filteredList.push(list[i]);
			}
		}
	} else {
		for (var key in list){
			if (list.hasOwnProperty(key)){
				if (callback(list[key])) {
					filteredList.push(key);
				}
			}
		}
	}
	return filteredList;
}


PrimaryBookmarksTree.prototype.pluck = function(list, prop){
	var results = [];
	if (Array.isArray(list)){
		for (i=0; i<list.length; i++){
			for (var key in list[i]){
				if (key == prop){
					results = results.concat(list[i][prop])
				}			
			}
		}
	}
	return results;
}


