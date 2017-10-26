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

scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src !== "") {
        chrome.storage.sync.get("checkedCount", function(item) {
            if (JSON.stringify(item) === "{}") {
                chrome.storage.sync.set({"checkedCount": "0"});
            }
            chrome.storage.sync.set({"checkedCount": parseInt(item.checkedCount) + 1});
        });
        resolves(scripts[i].src);
    }
}
