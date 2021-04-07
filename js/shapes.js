let shape1Elem, shape2Elem;
let prevRnd1, prevRnd2;

// on page load call generate 2 shapes (first time the page is displayed)
$(() => {
  items = [{name: 'square', audioPath: '../sounds/shapes/square.ogg'}, {name: 'rectangle', audioPath: '../sounds/shapes/rectangle.ogg'}, {name: 'circle', audioPath: '../sounds/shapes/circle.ogg'},
            {name: 'triangle', audioPath: '../sounds/shapes/triangle.ogg'}, {name: 'star', audioPath: '../sounds/shapes/star.ogg'}, {name: 'diamond', audioPath: '../sounds/shapes/diamond.ogg'}]

  $modalPanel = $('#dialogDiv');
  $resultDivElem = $('div.result');

  generateChallengeItems();
});

function generateChallengeItems() {
  // randomly find 2 shapes to be displayed, from the list of available shapes
  let rnd1, rnd2;
  do {
    rnd1 = Math.floor((Math.random() * items.length));
    rnd2 = Math.floor((Math.random() * items.length));
  } while(rnd1 === rnd2 || rnd1 === prevRnd1 || rnd2 === prevRnd2);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  let shape1 = items[rnd1];
  let shape2 = items[rnd2];

  // display the 2 shapes
  $('#contentPanel > #shape1 > div').removeClass().addClass(shape1.name);
  $('#contentPanel > #shape2 > div').removeClass().addClass(shape2.name);
  validItemIndex = Math.random() < 0.5;
  itemAudioFilePath = validItemIndex ? shape1.audioPath : shape2.audioPath;
  shape1Elem = $('#contentPanel > #shape1');
  shape2Elem = $('#contentPanel > #shape2');

  playShowItemAudio();
}

function playShowItemAudio() {
  resetObjects(false, true);

  $modalPanel.dialog(dialogOptions);
  let playingShapeTypeAudio = new Audio(itemAudioFilePath);
  playingShapeTypeAudio.addEventListener('ended', function(){
    $resultDivElem.hide();
    $modalPanel.dialog('close');
  });
  playingAudios[playingAudios.length] = playingShapeTypeAudio;
  $resultDivElem.find('img').attr('src','../img/show.svg');
  $resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio('../sounds/show.ogg');
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function(){
    playingShapeTypeAudio.addEventListener('ended', function(){
      // bind the onclick event function
      shape1Elem.addClass('pointerCursor');
      shape2Elem.addClass('pointerCursor');
      shape1Elem.click(function() {
        checkValidAnswer(validItemIndex);
      });
      shape2Elem.click(function() {
        checkValidAnswer(!validItemIndex);
      });
    });
    playingShapeTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showItemSoundInterval) {
    showItemSoundInterval = setInterval(playShowItemAudio, 8000);
  }
}

function resetItemElems() {
  shape1Elem.unbind('click').removeClass('pointerCursor');
  shape2Elem.unbind('click').removeClass('pointerCursor');
}
