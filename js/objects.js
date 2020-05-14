let object1Elem, object2Elem;
let prevRnd1, prevRnd2;

$('body').load('objectBody.inc');

// on page load call generate 2 objects (first time the page is displayed)
function go() {
  // function declared in each objects related file
  initObjects();

  $modalPanel = $("#dialogDiv");
  $resultDivElem = $('div.result');

  generateChallengeItems();
}

function generateChallengeItems() {
  // randomly find 2 objects to be displayed, from the list of available objects
  let rnd1, rnd2;
  let object1, object2;
  do {
    rnd1 = Math.floor((Math.random() * items.length));
    rnd2 = Math.floor((Math.random() * items.length));
    object1 = items[rnd1];
    object2 = items[rnd2];
  } while(rnd1 === rnd2 || rnd1 === prevRnd1 || rnd2 === prevRnd2 || object1.name === object2.name);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  object1Elem = $('#contentPanel > #object1');
  object2Elem = $('#contentPanel > #object2');
  // display the 2 objects
  object1Elem.css('background-image', 'url(' + object1.imagePath + ')');
  object2Elem.css('background-image', 'url(' + object2.imagePath + ')');
  validItemIndex = Math.random() < 0.5;
  itemAudioFilePath = validItemIndex ? object1.audioPath : object2.audioPath;

  playShowItemAudio();
}

function playShowItemAudio() {
  resetObjects(false, true);

  $modalPanel.dialog(dialogOptions);
  let playingObjectTypeAudio = new Audio(itemAudioFilePath);
  playingObjectTypeAudio.addEventListener('ended', function(){
    $resultDivElem.hide();
    $modalPanel.dialog("close");
  });
  playingAudios[playingAudios.length] = playingObjectTypeAudio;
  $resultDivElem.find('img').attr("src","../img/show.svg");
  $resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio("../sounds/show.ogg");
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function(){
    playingObjectTypeAudio.addEventListener('ended', function(){
      // bind the onclick event function
      object1Elem.addClass('pointerCursor');
      object2Elem.addClass('pointerCursor');
      object1Elem.click(function() {
        checkValidAnswer(validItemIndex);
      });
      object2Elem.click(function() {
        checkValidAnswer(!validItemIndex);
      });
    });
    playingObjectTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showItemSoundInterval) {
    showItemSoundInterval = setInterval(playShowItemAudio, 8000);
  }
}

function resetItemElems(){
  object1Elem.unbind('click').removeClass('pointerCursor');
  object2Elem.unbind('click').removeClass('pointerCursor');
}
