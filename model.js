function PrimaryBookmarksTree(){
	chrome.storage.sync.get(null, this.findOrCreate.bind(this));
}

PrimaryBookmarksTree.prototype.findOrCreate = function(result){
	if (result.bookmarksTree != undefined){
		this.bookmarks = result.bookmarksTree.bookmarks;
		this.title = result.bookmarksTree.title;
		this.tagGroups = result.tagGroups;
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
	chrome.storage.sync.get(function(result){
		result.bookmarksTree.bookmarks.push(newBookmark);
		result.bookmarksTree.tagGroups = this.updatePrimaryTreeWithTagGroups(result);
		this.updateStorage(result);		
	}.bind(this));
}

PrimaryBookmarksTree.prototype.updatePrimaryTreeWithTagGroups = function(result){	
	var tagsForGrouping = this.getTagsWithMultipleBookmarks(result.bookmarksTree.bookmarks);
	for(j=0;j<tagsForGrouping.length;j++){
		result.bookmarksTree.tagGroups.push(this.buildTagGroup(result.bookmarksTree, tagsForGrouping[j]));
	}
	return result.bookmarksTree.tagGroups;
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
	var tagGroups = this.filter(tagCounts, function(x){return x > 1});
	return tagGroups;
}

PrimaryBookmarksTree.prototype.buildTagGroup = function(bookmarksTree, tag){
	tagGroup = new TagGroup(tag);
	for(i=0;i<bookmarksTree.bookmarks.length;i++){
		if(bookmarksTree.bookmarks[i].tags[0] == tag){
			tagGroup.bookmarks.push(bookmarksTree.bookmarks[i]);
		}
	}
	if (tagGroup.bookmarks.length != 0){
		return tagGroup;
	}
}


PrimaryBookmarksTree.prototype.updateStorage = function(result){
	console.log(JSON.stringify(result));
	chrome.storage.sync.set({"bookmarksTree": result.bookmarksTree}, function(){console.log("final storage complete")});
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


