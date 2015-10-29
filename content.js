chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log(message);
		if (message.greeting == "createPopUp"){
			popUpScript(message);
		} 
	});


function popUpScript(message){
	if(document.getElementById("marinadeDiv") === null){
		var dialogModal = document.createElement("div");
		dialogModal.setAttribute("id","marinadeDiv");
		dialogModal.innerHTML = "<span id='marinadeSpan'>Title</span><br /><input type='text' id='mTitle' value = "+"'"+message.tabTitle+"'"+"><br /><span id='marinadeSpan'>Tags <span id='helpText'>(separated by commas)</span></span><br /><input type='text' id='mTags'><br /><button id='mDone' type='button'>Done</button><button id='mCancel' type='button'>Cancel</button>";
		document.body.appendChild(dialogModal);
		document.getElementById("mCancel").addEventListener("click", clickedCancel);
		document.getElementById("mDone").addEventListener("click", function(){clickedDone(message);});
		document.getElementById("mTags").focus();
	} else {
		document.getElementById("marinadeDiv").setAttribute("class", "shown");
	}
}

function clickedCancel(){
	document.getElementById("marinadeDiv").setAttribute("class", "hidden");
}

function clickedDone(message){
	var title = document.getElementById("mTitle").value;
	var tags = document.getElementById("mTags").value;
	var url = message.tabUrl;
	chrome.runtime.sendMessage({greeting: "doneTagging", title: title, tags: tags, url: url});
	document.getElementById("marinadeDiv").setAttribute("class", "hidden");
}