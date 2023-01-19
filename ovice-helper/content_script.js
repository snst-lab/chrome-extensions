setInterval(() => {
    if (
        typeof window !== 'undefined' &&
        !/@room/.test(window.location.href) &&
        document.querySelectorAll('.ovice-helper').length < 1 &&
        document.querySelector('#MenuBar')
    ) {
        main();
    }
}, 2000);

function main() {
    const menuBarRoot = document.querySelector('#MenuBar');
    const reactionsMenu = document.querySelector('#MenuBar > div:nth-of-type(1)');
    const menuBar = document.querySelector('#MenuBar > div:nth-of-type(2)');

    const initialize = () => {
        document.querySelectorAll('.ovice-helper').forEach((e) => {
            e.remove();
        });
        menuBar.style.cssText = 'display:flex;align-items:center;overflow:visible';
        reactionsMenu.classList.add('s-selector');
    };

    const insertBorder = () => {
        menuBar.insertAdjacentHTML('beforeend', `<div class="ovice-helper s-border"/>`);
    };

    const addButtons = (buttonIcon, image, soundImageId) => {
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button class="ovice-helper MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const size = 24;ovice.chat('<div id=&quot;${soundImageId}&quot; class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;auto&quot; style=&quot;width:' + size + 'px;height:auto;&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></div>');ovice.commitReaction();ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/${buttonIcon}"></button>`
        );
    };

    const addSoundSelector = () => {
        insertBorder();
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-toggle-sound-selector" class="ovice-helper s-tooltip MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" data-tooltip="テキスト・画像送信時の音声設定"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/music.png"></button>`
        );
        menuBarRoot.insertAdjacentHTML(
            'afterbegin',
            `<div id="ovice-helper-sound-selector" class='ovice-helper s-selector MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ypxb7f'>
                <div class='ovice-helper-sound s-radio-button s-radio-button--active' data-sound="">
                    None
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="ok-hand" onclick="ovice.playSound('/assets/reaction/sword.mp3',0.08)">
                    Okay
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="love" onclick="ovice.playSound('/assets/reaction/love.mp3',0.3)">
                    Love
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="clap" onclick="ovice.playSound('/assets/reaction/clapping.mp3',0.03)">
                    Clap
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="drum" onclick="ovice.playSound('/assets/reaction/drum.mp3',0.03)">
                    Drum
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="nope" onclick="ovice.playSound('/assets/reaction/nope.mp3',0.05)">
                    Nope
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="tada" onclick="ovice.playSound('/assets/reaction/tada.mp3',0.04)">
                    Tada
                </div>
            </div>`
        );

        document.getElementById('ovice-helper-toggle-sound-selector').addEventListener('click', () => {
            reactionsMenu.removeAttribute('data-show');
            document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
            document.getElementById('ovice-helper-sound-selector').toggleAttribute('data-show');
        });
        document.querySelector('[aria-label="reactions-menu"]').addEventListener('click', () => {
            document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
            document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
            reactionsMenu.toggleAttribute('data-show', true);
        });
        document.querySelectorAll('.ovice-helper-sound').forEach((e) => {
            e.addEventListener('click', (event) => {
                document.querySelectorAll('.ovice-helper-sound').forEach((f) => {
                    f.classList.remove('s-radio-button--active');
                });
                event.target.classList.add('s-radio-button--active');
            });
        });
    };

    const addSizeSelector = () => {
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-toggle-size-selector" class="ovice-helper s-tooltip  MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn"  tabindex="0" type="button" data-tooltip="テキスト・画像サイズ設定"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/size.png"></button>`
        );
        menuBarRoot.insertAdjacentHTML(
            'afterbegin',
            `<div id="ovice-helper-size-selector" class='ovice-helper s-selector MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ypxb7f'>
                <div class='ovice-helper-size s-radio-button s-radio-button--active' data-size="24" data-font-size="16" data-image-size="54">
                    小
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="40" data-font-size="24" data-image-size="110">
                    中
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="64" data-font-size="48" data-image-size="220">
                    大
                </div>
            </div>`
        );

        document.getElementById('ovice-helper-toggle-size-selector').addEventListener('click', () => {
            reactionsMenu.removeAttribute('data-show');
            document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
            document.getElementById('ovice-helper-size-selector').toggleAttribute('data-show');
        });
        document.querySelector('[aria-label="reactions-menu"]').addEventListener('click', () => {
            document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
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
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<input id="ovice-helper-active-input" type="hidden" value="text" class="ovice-helper"/><input id="ovice-helper-input-file" class="ovice-helper" type="file" style="display:none;">`
        );
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<textarea id="ovice-helper-textarea" class="ovice-helper s-textarea"></textarea>`
        );
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-select-file" class="ovice-helper s-tooltip s-select-file" data-tooltip="画像を選択"><figure class=" s-preview-file"><img id="ovice-helper-preview-file"/></figure></button>`
        );
        menuBar.insertAdjacentHTML(
            'beforeend',
            `<button id="ovice-helper-send-message" class="ovice-helper s-tooltip MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const sound = document.querySelector('.ovice-helper-sound.s-radio-button--active').getAttribute('data-sound');
            const sizeSelector = document.querySelector('.ovice-helper-size.s-radio-button--active');
            const fontSize = Number(sizeSelector.getAttribute('data-font-size'));
            const imageSize = Number(sizeSelector.getAttribute('data-image-size'));
            const text = document.getElementById('ovice-helper-textarea').value;
            const image = document.getElementById('ovice-helper-preview-file').src;
            let message = '';
            const activeInput = document.getElementById('ovice-helper-active-input');
            switch(activeInput.value){
                case 'text':
                    message = '<div id=&quot;' + sound + '&quot; class=&quot;break-space&quot; style=&quot;font-size:' + fontSize + 'px&quot;>' + text + '</div>';
                    break;
                case 'image':
                    message = '<img id=&quot;' + sound + '&quot; class=&quot;break-space&quot; style=&quot;width:' + imageSize + 'px;height:auto;&quot; src=&quot;'+ image +'&quot;/>';
                    break;
            }
            ovice.chat(message);ovice.commitReaction();" data-tooltip="テキスト・画像を送信"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/send-message.png"></button>`
        );
        insertBorder();

        const dom = {
            textArea: document.getElementById('ovice-helper-textarea'),
            inputFile: document.getElementById('ovice-helper-input-file'),
            selectfile: document.getElementById('ovice-helper-select-file'),
            previewfile: document.getElementById('ovice-helper-preview-file'),
            activeInput: document.getElementById('ovice-helper-active-input'),
            sendMessage: document.getElementById('ovice-helper-send-message'),
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
        dom.textArea.addEventListener('focus', () => {
            dom.activeInput.value = 'text';
            dom.previewfile.classList.remove('active');
            dom.textArea.classList.add('active');
            dom.inputFile.value = '';
            dom.previewfile.removeAttribute('src');
        });
        dom.textArea.addEventListener('keydown', (event) => {
            if (event.ctrlKey === true && event.key === 'Enter') {
                dom.sendMessage.click();
            }
        });
    };

    (() => {
        initialize();
        addSoundSelector();
        addSizeSelector();
        addInput();
        addButtons('clap.png', 'clap.png', 'clap');
        addButtons('hand.png', 'hand.png', 'ok-hand');
        addButtons('good.png', 'good.png', 'ok-hand');
        addButtons('drum.png', 'drum.png', 'drum');
        addButtons('love.png', 'love.png', 'love');
        addButtons('nope.png', 'nope.png', 'nope');
        addButtons('tada.png', 'tada.png', 'tada');
        insertBorder();
        addButtons('exclamation.png', 'exclamation.gif', 'ok-hand');
        addButtons('question.png', 'question.png', 'love');
        addButtons('sweat.png', 'sweat.gif', 'love');
        addButtons('kusa.png', 'kusa.gif', 'drum');
    })();
}
