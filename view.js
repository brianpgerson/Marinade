function View(){};	



View.prototype.getCurrentTabUrl = function(callback){
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function(tabs){
		callback(tabs[0]);
	});
}

