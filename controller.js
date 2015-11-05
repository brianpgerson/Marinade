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
		this.saveBookmark(message);
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

Controller.prototype.saveBookmark = function(message){
	var title = message.title;
	var tags = message.tags.split(",");
	var url = message.url
	this.model.createNewBookmark(title, tags, url);
}

