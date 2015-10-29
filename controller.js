function Controller(view, model){
	this.view = view;
	this.model = model;
}

Controller.prototype.bindListeners = function(){
	chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
}

Controller.prototype.messageHandler = function(message, sender, sendResponse) {
	if (message.greeting == "tagIt") {
		this.tagIt();
	} else if (message.greeting == "doneTagging"){
		this.saveTag(message);
	} else if (message.greeting == "yourTags"){
		console.log("message received");
		this.goToBookmarks();
	}
}

Controller.prototype.goToBookmarks = function(){
	chrome.tabs.create({url: "chrome://bookmarks/"});
}

Controller.prototype.tagIt = function(){
	this.view.getCurrentTabUrl(function(tab){
		chrome.tabs.sendMessage(tab.id, 
			{greeting: "createPopUp", tabUrl: tab.url, tabTitle: tab.title});
	});
}

Controller.prototype.saveTag = function(message){
	var title = message.title;
	var tags = message.tags.split(",");
	var url = message.url
	this.model.createNewBookmark(title, tags, url);
}


Controller.prototype.getTagGroups = function(callback){
	var tagsToCheck = this.pluck(this.model.bookmarks, "tags");
	var tagCounts = tagsToCheck.reduce(function (obj, curr){
		if (typeof obj[curr] == 'undefined') {
			obj[curr] = 1;
		} else {
			obj[curr] += 1;
		}
		return obj;
	}, {});
	var tagGroups = filter(tagCounts, function(x){return x > 1});
	console.log(tagGroups);
}


Controller.prototype.filter = function(list, callback, context){
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



Controller.prototype.pluck = function(list, prop){
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

