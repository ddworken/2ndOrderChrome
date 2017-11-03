chrome.storage.sync.get("checkedCount", function (item) {
    document.getElementById("number").innerHTML = item.checkedCount;
});
