var sheet = document.createElement('style');
var createSubtitleSizeRule = function(options) {
    let style = '.VideoContainer .player-timedtext-text-container > span { ' +
        'font-size: ' + options.subtitle.font.size + 'px !important;' +
        'color: ' + options.subtitle.font.color + ' !important;';

    if (options.subtitle.background.active) {
        style += 'background-color: ' + options.subtitle.background.color + ' !important;';
    }

    return style;
};
var updateSubtitleStyle = function(options) {
    if (options.active) {
        sheet.innerHTML = createSubtitleSizeRule(options);
        document.body.appendChild(sheet);
    } else {
        document.body.removeChild(sheet);
    }
}

function init() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action && request.action === 'update-subtitle') {
                const subtitleOptions = request.subtitleOptions;
                updateSubtitleStyle(subtitleOptions);
                sendResponse();
            }
            return true;
        });
}

window.addEventListener('load', init);