window.onload = function() {
    document.getElementById("tagIt").onclick = function() {
        chrome.runtime.sendMessage({
            type: "tagIt"
        });
        window.close();
    }
    document.getElementById("yourTags").onclick = function() {
        chrome.runtime.sendMessage({
            type: "yourTags"
        });
    }
    document.getElementById("recent").onclick = function() {
        chrome.runtime.sendMessage({
            type: "recent"
        });
    }
    document.getElementById("options").onclick = function() {
        chrome.runtime.sendMessage({
            type: "options"
        });
    }
}