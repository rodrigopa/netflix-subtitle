const changedHistoryState = function(data) {
    console.log('data => ', data);
};

const options = {
    url: [{
        hostSuffix: "netflix.com",
        pathPrefix: "/watch/"
    }]
};

chrome.webNavigation.onHistoryStateUpdated.addListener(changedHistoryState, options);