function View(){};	

View.prototype.getCurrentTabUrl = function(callback){
	var queryInfo = {
		active: true,
		currentWindow: true
	};


	chrome.tabs.query(queryInfo, function(tabs){
		var tab = tabs[0];
		callback(tab);
	});
}

View.prototype.tagIt = function(){ 
	return document.getElementById("tagIt");
}

View.prototype.yourTags = function(){ 
	return document.getElementById("yourTags");
}

View.prototype.recent = function(){ 
	return document.getElementById("recent");
}

View.prototype.options = function(){ 
	return document.getElementById("options");
}