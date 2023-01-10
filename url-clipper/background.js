chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
    execute(info.menuItemId, tab, tab.url);
});
chrome.action.onClicked.addListener((tab) => {
    execute('url-clipper', tab, tab.url);
});

function execute(menuItemId, tab, url) {
    try {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: injectedFunctions,
            args: [menuItemId, url],
        });
    } catch (e) {}
}

async function updateContextMenus() {
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: 'url-clipper',
        title: 'URLをデコードしてコピー',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: 'url-clipper-confluence-title',
        title: 'Confluence / タイトルリンクをMarkdown形式でコピー',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: 'url-clipper-azuredevops-workitemid',
        title: 'AzureDevOps / WorkItemのIDをコピー',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: 'url-clipper-azuredevops-workitem',
        title: 'AzureDevOps / WorkItemのリンクをMarkdown形式でコピー',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: 'url-clipper-azuredevops-prid',
        title: 'AzureDevOps / PullRequestのIDをコピー',
        contexts: ['all'],
    });
    chrome.contextMenus.create({
        id: 'url-clipper-azuredevops-prbranch',
        title: 'AzureDevOps / PullRequestのブランチ名をコピー',
        contexts: ['all'],
    });
}

function injectedFunctions(menuItemId, url) {
    function mapper(menuItemId, url) {
        document.body.click();
        const link = decodeURI(url);
        switch (menuItemId) {
            case 'url-clipper':
                navigator.clipboard.writeText(link);
                showDialog('URLをコピーしました', link, url);
                break;
            case 'url-clipper-confluence-title':
                const confluenceTitle = document.getElementById('title-text');
                if (!confluenceTitle) {
                    showDialog(
                        'Confluence上のページではありません',
                        'Confluenceはこちら',
                        'https://www.atlassian.com/ja/software/confluence'
                    );
                    break;
                }
                navigator.clipboard.writeText(`[${confluenceTitle.textContent}](${link})`);
                showDialog('Markdownリンクをコピーしました', `[${confluenceTitle.textContent}](${link})`, link);
                break;
            case 'url-clipper-azuredevops-workitemid':
                const azureDevOpsWorkItemId = document.querySelector('.work-item-form-id > span');
                if (!azureDevOpsWorkItemId) {
                    showDialog(
                        'WorkItemの画面ではありません',
                        'AzureDevOpsはこちら',
                        'https://azure.microsoft.com/ja-jp/products/devops/'
                    );
                    break;
                }
                navigator.clipboard.writeText('#' + azureDevOpsWorkItemId.textContent);
                showDialog('WorkItemのIDをコピーしました', '#' + azureDevOpsWorkItemId.textContent, link);
                break;
            case 'url-clipper-azuredevops-workitem':
                const azureDevOpsWorkItem = {
                    id: document.querySelector('.work-item-form-id > span'),
                    title: document.querySelector('.work-item-form-title > div > div > input'),
                };
                if (!azureDevOpsWorkItem.id || !azureDevOpsWorkItem.title) {
                    showDialog(
                        'WorkItemの画面ではありません',
                        'AzureDevOpsはこちら',
                        'https://azure.microsoft.com/ja-jp/products/devops/'
                    );
                    break;
                }
                navigator.clipboard.writeText(
                    `[#${azureDevOpsWorkItem.id.textContent} ${azureDevOpsWorkItem.title.value}](${link})`
                );
                showDialog(
                    'Markdownリンクをコピーしました',
                    `[#${azureDevOpsWorkItem.id.textContent} ${azureDevOpsWorkItem.title.value}](${link})`,
                    link
                );
                break;
            case 'url-clipper-azuredevops-prid':
                const azureDevOpsPrId = document.querySelector('.pr-secondary-title-row > div > span');
                if (!azureDevOpsPrId) {
                    showDialog(
                        'PullRequestの画面ではありません',
                        'AzureDevOpsはこちら',
                        'https://azure.microsoft.com/ja-jp/products/devops/'
                    );
                    break;
                }
                navigator.clipboard.writeText(azureDevOpsPrId.textContent);
                showDialog('PullRequestのIDをコピーしました', azureDevOpsPrId.textContent, link);
                break;
            case 'url-clipper-azuredevops-prbranch':
                const azureDevOpsPrbranch = document.querySelector('.pr-header-branches > .bolt-link');
                if (!azureDevOpsPrbranch) {
                    showDialog(
                        'PullRequestの画面ではありません',
                        'AzureDevOpsはこちら',
                        'https://azure.microsoft.com/ja-jp/products/devops/'
                    );
                    break;
                }
                navigator.clipboard.writeText(azureDevOpsPrbranch.textContent);
                showDialog('ブランチ名をコピーしました', azureDevOpsPrbranch.textContent, link);
                break;
        }
    }

    function showDialog(title, text, link) {
        const atag =
            text && link
                ? `<a style="
            display:block;
            color:#0cf;
            width:90%;
            white-space:nowrap;
            word-break:break-all;
            overflow:hidden;
            text-align:center;
            text-overflow:ellipsis;
            "
            href="${link}"
            target="_blank"
        >${text}</a>
        `
                : '<span></span>';

        document.body.insertAdjacentHTML(
            'beforeend',
            `<div id="dialog-url-clipper" style="
                position:fixed;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                width:320px;
                height:80px;
                padding:10px 20px;
                top:0;
                right:0;
                left:0;
                bottom:100px;
                margin:auto;
                color:white;
                background-color:#555;
                box-shadow:0 0 3px #aaa;
                opacity:0;
                transition:0.4s;
                border-radius:8px;
                transform:translateY(8px);
                z-index:2147483647;
            ">
                <div style="padding-bottom:4px;">${title}</div>
                ${atag}
            </div>`
        );
        setTimeout(() => {
            document.getElementById('dialog-url-clipper').style.opacity = 0.85;
            document.getElementById('dialog-url-clipper').style.transform = 'translateY(0px)';
        }, 100);
        setTimeout(() => {
            document.getElementById('dialog-url-clipper').style.opacity = 0;
            document.getElementById('dialog-url-clipper').style.transform = 'translateY(8px)';
        }, 2000);
        setTimeout(() => {
            document.getElementById('dialog-url-clipper').remove();
        }, 2200);
    }
    return mapper(menuItemId, url);
}
