chrome.browser.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {speed: () => {
            chrome.storage.sync.get('speed', (result) => {
                console.log(result);
                if(result != undefined && result.speed != undefined){
                    return result.speed;
                }
            })
        }});
    });
});