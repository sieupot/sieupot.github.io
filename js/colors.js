let color1Element, color2Element, color3Element, color4Element;
let prevRnd1, prevRnd2, prevRnd3, prevRnd4;

// on page load call generate 4 colors (first time the page is displayed)
$(() => {
  items = [{name: 'red', audioPath: '../sounds/colors/red.ogg'}, {name: 'green', audioPath: '../sounds/colors/green.ogg'}, {name: 'blue', audioPath: '../sounds/colors/blue.ogg'},
    {name: 'pink', audioPath: '../sounds/colors/pink.ogg'}, {name: 'yellow', audioPath: '../sounds/colors/yellow.ogg'}, {name: 'orange', audioPath: '../sounds/colors/orange.ogg'},
    {name: 'violet', audioPath: '../sounds/colors/violet.ogg'}, {name: 'brown', audioPath: '../sounds/colors/brown.ogg'}, {name: 'gray', audioPath: '../sounds/colors/gray.ogg'}, {name: 'black', audioPath: '../sounds/colors/black.ogg'}
  ]

  modalPanel = $('#dialogDiv');
  resultDivElem = $('div.result');

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

function generateChallengeItems() {
  // randomly find 4 colors to be displayed, from the list of available colors
  let rnd1, rnd2, rnd3, rnd4;
  do {
    rnd1 = Math.floor((Math.random() * items.length));
    rnd2 = Math.floor((Math.random() * items.length));
    rnd3 = Math.floor((Math.random() * items.length));
    rnd4 = Math.floor((Math.random() * items.length));
  } while(!isIsogram(((('' + rnd1) + rnd2) + rnd3) + rnd4) || rnd1 === prevRnd1 || rnd2 === prevRnd2 || rnd3 === prevRnd3 || rnd4 === prevRnd4);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  prevRnd3 = rnd3;
  prevRnd4 = rnd4;
  let color1 = items[rnd1];
  let color2 = items[rnd2];
  let color4 = items[rnd4];
  let color3 = items[rnd3];

  validItemIndex = Math.floor((Math.random() * 4) + 1);
  itemAudioFilePath = (eval('color'+validItemIndex)).audioPath;
  color1Element = $('#contentPanel > #color1');
  color2Element = $('#contentPanel > #color2');
  color3Element = $('#contentPanel > #color3');
  color4Element = $('#contentPanel > #color4');
  // display the colors
  color1Element.removeClass().addClass('color ' + color1.name);
  color2Element.removeClass().addClass('color ' + color2.name);
  color3Element.removeClass().addClass('color ' + color3.name);
  color4Element.removeClass().addClass('color ' + color4.name);

  playShowItemAudio();
}

function playShowItemAudio() {
  resetObjects(false, true);

  modalPanel.dialog(dialogOptions);
  let playingColorTypeAudio = new Audio(itemAudioFilePath);
  playingColorTypeAudio.addEventListener('ended', function(){
    resultDivElem.hide();
    modalPanel.dialog('close');
  });
  playingAudios[playingAudios.length] = playingColorTypeAudio;
  resultDivElem.find('img').attr('src', '../img/show.svg');
  resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio('../sounds/show.ogg');
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function(){
    playingColorTypeAudio.addEventListener('ended', function(){
      // bind the onclick event function
      color1Element.addClass('pointerCursor');
      color2Element.addClass('pointerCursor');
      color3Element.addClass('pointerCursor');
      color4Element.addClass('pointerCursor');
      color1Element.click(function() {
        checkValidAnswer(1 === validItemIndex);
      });
      color2Element.click(function() {
        checkValidAnswer(2 === validItemIndex);
      });
      color3Element.click(function() {
        checkValidAnswer(3 === validItemIndex);
      });
      color4Element.click(function() {
        checkValidAnswer(4 === validItemIndex);
      });
    });
    playingColorTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showItemSoundInterval) {
    showItemSoundInterval = setInterval(playShowItemAudio, commandRepeatInterval);
  }
}

function resetItemElems() {
  color1Element.off('click').removeClass('pointerCursor');
  color2Element.off('click').removeClass('pointerCursor');
  color3Element.off('click').removeClass('pointerCursor');
  color4Element.off('click').removeClass('pointerCursor');
}
