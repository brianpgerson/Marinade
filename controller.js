function Controller(view, model){
	this.view = view;
	this.model = model;
}

Controller.prototype.bindListeners = function(){
	chrome.runtime.onMessage.addListener(this.messageHandler.bind(this));
}

Controller.prototype.messageHandler = function(request, sender, sendResponse) {
	if(request.type == "tagIt") {
		this.tagIt();
	}
}

Controller.prototype.tagIt = function(){
	this.view.getCurrentTabUrl(function(tab){
		chrome.tabs.sendMessage(tab.id, {greeting: "new tag", tabUrl: tab.url, tabTitle: tab.title}, function(response) {
			console.log(response.farewell);
		});
	});
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
	var tagGroups =  filter(tagCounts, function(x){return x > 1});
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

