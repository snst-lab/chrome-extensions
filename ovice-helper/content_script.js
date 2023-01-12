    setTimeout(() => {
        addButtons('exclamation.png', 'exclamation.gif', '87-88-17ok-hand.png');
        addButtons('question.png', 'question.png', '111ared-heart.png');
        addButtons('sweat.png', 'sweat.gif', '111ared-heart.png');
        addButtons('kusa.png', 'kusa.gif', 'drum.png');
    }, 1000);

function addButtons(buttonIcon, image, soundImageId) {
    const menuBar = document.querySelector('#MenuBar > div:nth-of-type(2)');
    menuBar.insertAdjacentHTML(
        'beforeend',
        `<button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium ext-btn-style" tabindex="0" type="button" aria-label="reaction" onclick="
    ovice.chat(
      '<div class=&quot;break-space&quot;><img width=&quot;40&quot; height=&quot;40&quot; id=&quot;${soundImageId}&quot; style=&quot;margin:&quot; src=&quot;//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/image/${image}&quot; /></div>'
    );
    ovice.commitReaction();
    "><img width="24" height="24" src="//raw.githubusercontent.com/snst-lab/chrome-extensions/main/ovice-helper/icon/${buttonIcon}"></button>`
    );
}
