window.onload = function() {
    document.getElementById("tagIt").onclick = function() {
        chrome.runtime.sendMessage({
            type: "tagIt"
        });
    }
}