window.onload = function() {
    document.getElementById("tagIt").onclick = function() {
        chrome.runtime.sendMessage({greeting: "tagIt"});
        window.close();
    }
    document.getElementById("yourTags").onclick = function() {
        chrome.runtime.sendMessage({greeting: "yourTags"});
    }
    document.getElementById("recent").onclick = function() {
        chrome.runtime.sendMessage({greeting: "recent"});
    }
    document.getElementById("options").onclick = function() {
        chrome.runtime.sendMessage({greeting: "options"});
    }
}