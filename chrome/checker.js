function resolves(domain) {
    fetch('https://resolver.daviddworken.com/api/v1/resolves?url=' + domain + '&rand=' + Math.random(),
        {method: 'get'}).then(function (resp) {
        resp.json().then(function (data) {
            if (!data.result) {
                alert('Domain not found: ' + domain)
            }
        })
    }).catch(function (err) {
        console.log('Resolver API down!');
    })
}

function incrementChecked() {
    chrome.storage.sync.get("checkedCount", function(item) {
        if (JSON.stringify(item) === "{}") {
            chrome.storage.sync.set({"checkedCount": "0"});
        }
        chrome.storage.sync.set({"checkedCount": parseInt(item.checkedCount) + 1});
    });
}

scriptAndIframes = document.querySelectorAll("script,iframe");
for (var i = 0; i < scriptAndIframes.length; i++) {
    if (scriptAndIframes[i].src !== "") {
        incrementChecked();
        if (!scriptAndIframes[i].src.startsWith("chrome-extension://")) {
            resolves(scriptAndIframes[i].src);
        }
    }
}
links = document.querySelectorAll("link");
for (var i = 0; i < links.length; i++) {
    if (links[i].rel === "stylesheet" && links[i].href) {
        incrementChecked();
        if (!links[i].href.startsWith("chrome-extension://")) {
            resolves(links[i].href);
        }
    }
}