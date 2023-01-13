setTimeout(main, 1500);

function main() {
    const menuBar = document.querySelector('#MenuBar > div:nth-of-type(2)');

    const fixStyle = () => {
        menuBar.style.cssText = 'display:flex;align-items:center;';
    };

    const addButtons = (buttonIcon, image, soundImageId) => {
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="ovice.chat('<div class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;auto&quot; id=&quot;${soundImageId}&quot; style=&quot;margin:&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></div>');ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/${buttonIcon}"></button>`
        );
    };

    const addInput = () => {
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<textarea id="ovice-helper-textarea" class="s-textarea"></textarea><figure class="s-preview-file" id="ovice-helper-select-file"><img id="ovice-helper-preview-file"/></figure><input id="ovice-helper-input-file" class="s-input-file" type="file" style="display:none;">`
        );
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-send-message" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="const text = document.getElementById('ovice-helper-textarea').value;const image =  document.getElementById('ovice-helper-preview-file').src;ovice.chat('<div id=&quot;87-88-17ok-hand.png&quot; class=&quot;break-space&quot;>' + text + image + '</div>');ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/send-message.png"></button>`
        );
        menuBar.insertAdjacentHTML('beforeend', `<div class="s-border"/>`);

        const dom = {
            inputFile: document.getElementById('ovice-helper-input-file'),
            selectfile: document.getElementById('ovice-helper-select-file'),
            previewfile: document.getElementById('ovice-helper-preview-file'),
        };
        dom.selectfile.addEventListener('click', () => {
            dom.inputFile.click();
        });
        dom.inputFile.addEventListener('change', (event) => {
            const files = event.target?.files ? event.target?.files : event.dataTransfer?.files;
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    base64: e.target?.result,
                };
                dom.previewfile.src = data.base64;
            };
            if (files[0]) {
                reader.readAsDataURL(files[0]);
            }
        });
    };

    fixStyle();
    addInput();
    addButtons('exclamation.png', 'exclamation.gif', '87-88-17ok-hand.png');
    addButtons('question.png', 'question.png', '111ared-heart.png');
    addButtons('sweat.png', 'sweat.gif', '111ared-heart.png');
    addButtons('kusa.png', 'kusa.gif', 'drum.png');
}
