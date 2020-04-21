const loadSubtitleSettings = function() {
    let storedOptions = localStorage.getItem('netflix-subtitle-options')
    if (storedOptions == null)
        storedOptions = {}
    else
        storedOptions = JSON.parse(storedOptions)

    updateSubtitle(storedOptions);
}

const updateSubtitle = function(subtitleOptions) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'update-subtitle', subtitleOptions: subtitleOptions }, function(response) {});
    });
}

const changedHistoryState = function(data) {
    loadSubtitleSettings();
};

const options = {
    url: [{
        hostSuffix: "netflix.com",
        pathPrefix: "/watch/"
    }]
};

chrome.webNavigation.onHistoryStateUpdated.addListener(changedHistoryState, options);
chrome.webNavigation.onCompleted.addListener(changedHistoryState, options);
