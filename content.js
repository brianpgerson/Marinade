chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		if (message.greeting == "new tag"){
			console.log(message)
			sendResponse({farewell: "success"});
			createPopUp(message)

		}
	});

function cancelDialog(){
	document.getElementById("marinadeDiv").setAttribute("class", "hidden");
}

function createPopUp(message){
	if(document.getElementById("marinadeDiv") === null){
		var dialogModal = document.createElement("div");
		dialogModal.setAttribute("id","marinadeDiv");

		dialogModal.innerHTML = "<span id='marinadeSpan'>Title</span><br /><input type='text' name='marinadeTitle' value = "+"'"+message.tabTitle+"'"+"><br /><span id='marinadeSpan'>Tags</span><br /><input type='text' name='mtags' id = 'mtags'><br /><button id='mDone' type='button'>Done</button><button id='mCancel' type='button'>Cancel</button>";

		document.body.appendChild(dialogModal);

		document.getElementById("mCancel").addEventListener("click", cancelDialog);

		document.getElementById("mtags").focus();

	} else {
	document.getElementById("marinadeDiv").setAttribute("class", "shown");
	}
}