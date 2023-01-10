chrome.runtime.onInstalled.addListener(startUp);
chrome.runtime.onStartup.addListener(startUp);
chrome.action.onClicked.addListener((tab) => {
    execute('ovice-helper', tab.id, tab.url);
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    execute(info.menuItemId, tab.id, tab.url);
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(123);
});

async function startUp() {
    try {
        const tab = await getCurrentTab();
        const injectionResults = chrome.scripting.executeScript({
            target: { tab: tab.id },
            func: startUpScript,
            args: [],
        });
        for (const frameResult of injectionResults) {
            console.log('Frame Title: ' + frameResult.result);
        }
    } catch (e) {}
}

function execute(menuItemId, tabId, url) {
    try {
        chrome.scripting.executeScript({
            target: { tabId },
            func: executeScript,
            args: [menuItemId, tabId, url],
        });
    } catch (e) {}
}

function startUpScript() {
    console.log(window.location.href);
}

function executeScript(menuItemId, tabId, url) {
    console.log(menuItemId, tabId, url);
}
