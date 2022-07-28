const copyToClipboard = (tab, text) => {
    function injectedFunction(text) {
        try {
            navigator.clipboard.writeText(decodeURI(text));
            document.body.insertAdjacentHTML(
                'beforeend',
                `<div id="decoded-url-copy" style="
                    position:fixed;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:180px;
                    height:60px;
                    top:0;
                    right:0;
                    left:0;
                    bottom:0;
                    margin:auto;
                    background-color:white;
                    color:#333;
                    box-shadow:0 0 3px #aaa;
                    opacity:0;
                    transition:0.2s;
                    border-radius:8px;
                    transform:scale(0);
                    z-index:9999;
                ">URL has Copied</div>`
            );
            setTimeout(() => {
                document.getElementById('decoded-url-copy').style.opacity = 1;
                document.getElementById('decoded-url-copy').style.transform = 'scale(1)';
            }, 100);
            setTimeout(() => {
                document.getElementById('decoded-url-copy').style.opacity = 0;
                document.getElementById('decoded-url-copy').style.transform = 'scale(0)';
            }, 1000);
            setTimeout(() => {
                document.getElementById('decoded-url-copy').remove();
            }, 1200);
        } catch (e) {}
    }
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: injectedFunction,
        args: [text],
    });
};

const updateContextMenus = async () => {
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: 'context-copytab-url',
        title: 'URL Clipper',
        contexts: ['all'],
    });
};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
    try {
        switch (info.menuItemId) {
            case 'context-copytab-url':
                copyToClipboard(tab, tab.url);
                break;
        }
    } catch (e) {}
});
chrome.action.onClicked.addListener((tab) => {
    try {
        copyToClipboard(tab, tab.url);
    } catch (e) {}
});
