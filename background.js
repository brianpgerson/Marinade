function getCurrentTabUrl(callback){
	var queryInfo = {
		active: true,
		currentWindow: true
	};


	chrome.tabs.query(queryInfo, function(tabs){
		var tab = tabs[0];
		callback(tab);
	});
}

function getUsersBookmarkTree(tab, callback){
	chrome.bookmarks.getTree(function(results){
		callback(results[0].children[0].id, tab);
	});
}

chrome.browserAction.onClicked.addListener(function(){
	getCurrentTabUrl(function(tab){
		chrome.bookmarks.create({url: tab.url, title: tab.title, parentId: "1"});
	});
});
