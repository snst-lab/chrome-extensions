(async() => {
    const src = chrome.runtime.getURL("contentScript/main.js");
    const contentMain = await import(src);
})()
