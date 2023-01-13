setTimeout(main, 2000);

function main() {
    const menuBarRoot = document.querySelector('#MenuBar');
    const reactionsMenu = document.querySelector('#MenuBar > div:nth-of-type(1)');
    const menuBar = document.querySelector('#MenuBar > div:nth-of-type(2)');

    const initialize = () => {
        menuBar.style.cssText = 'display:flex;align-items:center;';
        reactionsMenu.classList.add('s-selector');
    };

    const addButtons = (buttonIcon, image, soundImageId) => {
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const size = Number(document.querySelector('.ovice-helper-size.s-radio-button--active').getAttribute('data-size'));
            ovice.chat('<div class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;auto&quot; id=&quot;${soundImageId}&quot; style=&quot;width:' + size + 'px;height:auto;&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></div>');ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/${buttonIcon}"></button>`
        );
    };

    const addSizeSelector = () => {
        menuBar.insertAdjacentHTML('beforeend', `<div class="s-border"/>`);
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-toggle-size-selector" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/change-size.png"></button>`
        );
        menuBarRoot.insertAdjacentHTML(
            'beforeend',
            `<div id="ovice-helper-size-selector" class='s-selector MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ypxb7f'>
                <div class='ovice-helper-size s-radio-button s-radio-button--active' data-size="24">
                    小
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="40">
                    中
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="64">
                    大
                </div>
            </div>`
        );

        document.getElementById('ovice-helper-toggle-size-selector').addEventListener('click', () => {
            reactionsMenu.removeAttribute('data-show');
            document.getElementById('ovice-helper-size-selector').toggleAttribute('data-show');
        });
        document.querySelector('[aria-label="reactions-menu"]').addEventListener('click', () => {
            document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
            reactionsMenu.toggleAttribute('data-show', true);
        });
        document.querySelectorAll('.ovice-helper-size').forEach((e) => {
            e.addEventListener('click', (event) => {
                document.querySelectorAll('.ovice-helper-size').forEach((f) => {
                    f.classList.remove('s-radio-button--active');
                });
                event.target.classList.add('s-radio-button--active');
            });
        });
    };

    const addInput = () => {
        menuBar.insertAdjacentHTML('beforeend', `<input id="ovice-helper-active-input" type="hidden" value="text"/>`);
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<textarea id="ovice-helper-textarea" class="s-textarea"></textarea><figure class="s-preview-file" id="ovice-helper-select-file"><img id="ovice-helper-preview-file"/></figure><input id="ovice-helper-input-file" class="s-input-file" type="file" style="display:none;">`
        );
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-send-message" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const size = Number(document.querySelector('.ovice-helper-size.s-radio-button--active').getAttribute('data-size'));
            const text = document.getElementById('ovice-helper-textarea').value;
            const image = document.getElementById('ovice-helper-preview-file').src;
            let message = '';
            const activeInput = document.getElementById('ovice-helper-active-input');
            switch(activeInput.value){
                case 'text':
                    message = '<div id=&quot;87-88-17ok-hand.png&quot; class=&quot;break-space&quot; style=&quot;font-size:' + 0.5 * size + 'px&quot;>' + text + '</div>';
                    break;
                case 'image':
                    message = '<img id=&quot;87-88-17ok-hand.png&quot; class=&quot;break-space&quot; style=&quot;width:' + size + 'px;height:auto;&quot; src=&quot;'+ image +'&quot;/>';
                    break;
            }
            ovice.chat(message);ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/send-message.png"></button>`
        );
        menuBar.insertAdjacentHTML('beforeend', `<div class="s-border"/>`);

        const dom = {
            textArea: document.getElementById('ovice-helper-textarea'),
            inputFile: document.getElementById('ovice-helper-input-file'),
            selectfile: document.getElementById('ovice-helper-select-file'),
            previewfile: document.getElementById('ovice-helper-preview-file'),
            activeInput: document.getElementById('ovice-helper-active-input'),
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
                dom.previewfile.classList.add('active');
                dom.textArea.classList.remove('active');
                dom.activeInput.value = 'image';
            };
            if (files[0]) {
                reader.readAsDataURL(files[0]);
            }
        });
        dom.textArea.addEventListener('input', () => {
            dom.activeInput.value = 'text';
            dom.previewfile.classList.remove('active');
            dom.textArea.classList.add('active');
            dom.inputFile.value = '';
            dom.previewfile.removeAttribute('src');
        });
    };

    (() => {
        initialize();
        addSizeSelector();
        addInput();
        addButtons('clap.png', 'clap.png', '87-88-6clapping-hands.png');
        addButtons('hand.png', 'hand.png', '87-88-17ok-hand.png');
        addButtons('good.png', 'good.png', '87-88-17ok-hand.png');
        addButtons('drum.png', 'drum.png', 'drum.png');
        addButtons('love.png', 'love.png', '111ared-heart.png');
        addButtons('nope.png', 'nope.png', 'cross-mark.png');
        addButtons('tada.png', 'tada.png', 'party-popper.png');
        menuBar.insertAdjacentHTML('beforeend', `<div class="s-border"/>`);
        addButtons('exclamation.png', 'exclamation.gif', '87-88-17ok-hand.png');
        addButtons('question.png', 'question.png', '111ared-heart.png');
        addButtons('sweat.png', 'sweat.gif', '111ared-heart.png');
        addButtons('kusa.png', 'kusa.gif', 'drum.png');
    })();
}
