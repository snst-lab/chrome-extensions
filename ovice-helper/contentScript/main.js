setInterval(() => {
  if (
    typeof window !== 'undefined' &&
    document.querySelectorAll('.ovice-helper').length < 1 &&
    document.querySelector('#MenuBar')
  ) {
    main();
  }
  showRoomExitButton();
}, 2000);

function showRoomExitButton() {
  const roomExitButton = document.querySelector('._opacity-0enter-0 > .MuiPaper-root');
  if (roomExitButton) {
    roomExitButton.style.cssText = 'top:-140px;bottom:85px;';
  }
}

function main() {
  //   const header = document.querySelector('header > div > div:last-of-type');
  const menuBarRoot = document.querySelector('#MenuBar');
  const menuBar = document.querySelector('#MenuBar > div:nth-of-type(2)');

  const statusMenuToggleButton = document.querySelector('[aria-label="status-menu"]');
  const reactionMenuToggleButton = document.querySelector('[aria-label="reactions-menu"]');
  // const hiddenMenuContainer = document.querySelector('#MenuBar > div:nth-of-type(1)');

  const initialize = () => {
    document.querySelectorAll('.ovice-helper').forEach((e) => {
      e.remove();
    });
    menuBar.style.cssText = 'display:flex;align-items:center;overflow:visible;max-width:unset;';
    // statusMenuToggleButton.addEventListener('click', () => {
    //   setTimeout(() => {
    //     const hiddenMenuContainer = document.querySelector('#MenuBar > div:nth-of-type(4)');
    //     hiddenMenuContainer.classList.add('s-selector');
    //     hiddenMenuContainer.setAttribute('data-show', true);
    //   }, 200);
    // });
    // reactionMenuToggleButton.addEventListener('click', () => {
    //   setTimeout(() => {
    //     const hiddenMenuContainer = document.querySelector('#MenuBar > div:nth-of-type(3)');
    //     hiddenMenuContainer.classList.add('s-selector');
    //     hiddenMenuContainer.setAttribute('data-show', true);
    //   }, 200);
    // });
    statusMenuToggleButton.addEventListener('click', () => {
      document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
      document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
      // hiddenMenuContainer.toggleAttribute('data-show', true);
    });
    reactionMenuToggleButton.addEventListener('click', () => {
      document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
      document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
      // hiddenMenuContainer.toggleAttribute('data-show', true);
    });
  };

  const insertBorder = () => {
    menuBar.insertAdjacentHTML('beforeend', `<div class="ovice-helper s-border"/>`);
  };

  const addButton = (buttonIcon, image, soundId) => {
    menuBar.insertAdjacentHTML(
      'beforeend',
      `<button class="ovice-helper MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const emojiCodeMap = {
                hand: '270B',
                okay: '1F44C',
                good: '1F44D',
                clap: '1F44F',
                drum: '1F941',
                raised_hands: '1F64C',
                hi5: '',
                love: '2764-FE0F',
                nope: '274C',
                tada: '1F389',
            };
            const selectedSound = document.querySelector('.ovice-helper-sound.s-radio-button--active').getAttribute('data-sound');
            const sound = selectedSound ? selectedSound : '${soundId}';
            const size = Number(document.querySelector('.ovice-helper-size.s-radio-button--active').getAttribute('data-size'));
            let args = '<span data-emoji-code=&quot;' + emojiCodeMap[sound] + '&quot; class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;auto&quot; style=&quot;width:' + size + 'px;height:auto;&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></span>';
            if(selectedSound === 'love' || selectedSound === 'hi5'){
                args = '<span for=&quot;' + sound + '&quot; data-emoji-code=&quot;' + emojiCodeMap[sound] + '&quot; class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;auto&quot; style=&quot;width:' + size + 'px;height:auto;&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></span>';
            }
            ovice.chat(args);ovice.commitReaction();"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/${buttonIcon}"></button>`
    );
  };

  const addSoundSelector = () => {
    insertBorder();
    menuBar.insertAdjacentHTML(
      'beforeend',
      `<button id="ovice-helper-toggle-sound-selector" class="ovice-helper s-tooltip MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" data-tooltip="リアクション時の音声設定"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/music.png"></button>`
    );
    menuBarRoot.insertAdjacentHTML(
      'afterbegin',
      `<div id="ovice-helper-sound-selector" class='ovice-helper s-selector MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ypxb7f'>
                <div class='ovice-helper-sound s-radio-button s-radio-button--active' data-sound="">
                    Unset
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="good" onclick="ovice.playSound('/assets/reaction/sword.mp3',0.08)">
                    Okay
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="love" onclick="ovice.playSound('/assets/reaction/love.mp3',0.3)">
                    Love
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="hi5" onclick="ovice.playSound('/assets/reaction/high_five.mp3',0.12)">
                    Five
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="clap" onclick="ovice.playSound('/assets/reaction/clapping.mp3',0.03)">
                    Clap
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="drum" onclick="ovice.playSound('/assets/reaction/drum.mp3',0.03)">
                    Drum
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="nope" onclick="ovice.playSound('/assets/reaction/nope.mp3',0.08)">
                    Nope
                </div>
                <div class='ovice-helper-sound s-radio-button' data-sound="tada" onclick="ovice.playSound('/assets/reaction/tada.mp3',0.04)">
                    Tada
                </div>
            </div>`
    );
    document.getElementById('ovice-helper-toggle-sound-selector').addEventListener('click', () => {
      // document.querySelector('hidden-menu-container').removeAttribute('data-show');
      document.getElementById('ovice-helper-size-selector').removeAttribute('data-show');
      document.getElementById('ovice-helper-sound-selector').toggleAttribute('data-show');
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
      `<button id="ovice-helper-toggle-size-selector" class="ovice-helper s-tooltip  MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn"  tabindex="0" type="button" data-tooltip="フキダシのサイズ設定"><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/size.png"></button>`
    );
    menuBarRoot.insertAdjacentHTML(
      'afterbegin',
      `<div id="ovice-helper-size-selector" class='ovice-helper s-selector MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-1ypxb7f'>
                <div class='ovice-helper-size s-radio-button s-radio-button--active' data-size="24" data-font-size="16" data-image-size="48">
                    小
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="40" data-font-size="22" data-image-size="120">
                    中
                </div>
                <div class='ovice-helper-size s-radio-button' data-size="64" data-font-size="28" data-image-size="240">
                    大
                </div>
            </div>`
    );

    document.getElementById('ovice-helper-toggle-size-selector').addEventListener('click', () => {
      // document.querySelector('hidden-menu-container').removeAttribute('data-show');
      document.getElementById('ovice-helper-sound-selector').removeAttribute('data-show');
      document.getElementById('ovice-helper-size-selector').toggleAttribute('data-show');
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
      `
            <input id="ovice-helper-active-input" type="hidden" value="text" class="ovice-helper"/>
            <input id="ovice-helper-input-file" class="ovice-helper" type="file" accept="image/*" style="display:none;">
            `
    );
    menuBar.insertAdjacentHTML(
      'beforeend',
      `<div class="s-textarea-container s-tooltip" data-tooltip="Ctrl + Enter でテキスト送信"><textarea id="ovice-helper-textarea" class="ovice-helper s-textarea"></textarea></div>`
    );
    menuBar.insertAdjacentHTML(
      'beforeend',
      `<button id="ovice-helper-select-file" class="ovice-helper s-tooltip s-select-file" data-tooltip="画像を選択"><figure class=" s-preview-file"><img id="ovice-helper-preview-file"/></figure></button>`
    );
    menuBar.insertAdjacentHTML(
      'beforeend',
      `<button id="ovice-helper-send-message" class="ovice-helper s-tooltip MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium s-ext-btn" tabindex="0" type="button" aria-label="reaction" onclick="
            const emojiCodeMap = {
                hand: '270B',
                okay: '1F44C',
                good: '1F44D',
                clap: '1F44F',
                drum: '1F941',
                raised_hands: '1F64C',
                hi5: '',
                love: '2764-FE0F',
                nope: '274C',
                tada: '1F389',
            };
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
                    message = '<div for=&quot;' + sound + '&quot; data-emoji-code=&quot;' + emojiCodeMap[sound] + '&quot; class=&quot;break-space&quot; style=&quot;font-size:' + fontSize + 'px&quot;>' + text + '</div>';
                    break;
                case 'image':
                    message = '<img for=&quot;' + sound + '&quot; data-emoji-code=&quot;' + emojiCodeMap[sound] + '&quot; class=&quot;break-space&quot; style=&quot;width:' + imageSize + 'px;height:auto;&quot; src=&quot;'+ image +'&quot;/>';
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
      reader.onload = async (e) => {
        const data = {
          name: files[0].name,
          size: files[0].size,
          type: files[0].type,
          base64: e.target?.result,
          blobUrl: window.URL.createObjectURL(files[0]),
        };
        if (/image/.test(data.type)) {
          dom.previewfile.src = data.base64;
          dom.previewfile.classList.add('active');
          dom.textArea.classList.remove('active');
          dom.activeInput.value = 'image';
        }
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
    addButton('clap.png', 'Clap.png', 'clap');
    addButton('hand.png', 'Hand.png', 'good');
    addButton('good.png', 'Good.png', 'good');
    addButton('drum.png', 'Drum.png', 'drum');
    addButton('love.png', 'Love.png', 'love');
    addButton('nope.png', 'Nope.png', 'nope');
    addButton('tada.png', 'Tada.png', 'tada');
    addButton('exclamation.png', 'Exclamation.gif', 'good');
    addButton('question.png', 'Question.png', 'love');
    addButton('sweat.png', 'Sweat.gif', 'love');
    addButton('kusa.png', 'Kusa.gif', 'drum');
  })();
}
