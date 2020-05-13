let objects; // list of available object objects (css class name, audio file name to be played)

let showObjectSoundInterval;
let object1Elem, object2Elem, valid1, audioFileName;
let playingAudios;
let prevRnd1, prevRnd2;
let rightAnswers = 0, wrongAnswers = 0;

const dialogOptions = {
  dialogClass: "ui-dialog-no-close-button",
  show: {
    effect: 'fade',
    duration: 200
  },
  hide: {
    effect: 'fade',
    duration: 200
  },
};
let $modalPanel;
let $resultDivElem;

$('body').load('objectBody.inc');

// on page load call generate 2 objects (first time the page is displayed)
function go() {
  // function declared in each objects related file
  initObjects();

  $modalPanel = $("#dialogDiv");
  $resultDivElem = $('div.result');

  generateChallengeObjects();
}

function generateChallengeObjects() {
  // randomly find 2 objects to be displayed, from the list of available objects
  let rnd1, rnd2;
  let object1, object2;
  do {
    rnd1 = Math.floor((Math.random() * objects.length));
    rnd2 = Math.floor((Math.random() * objects.length));
    object1 = objects[rnd1];
    object2 = objects[rnd2];
  } while(rnd1 === rnd2 || rnd1 === prevRnd1 || rnd2 === prevRnd2 || object1.name === object2.name);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  object1Elem = $('#contentPanel > #object1');
  object2Elem = $('#contentPanel > #object2');
  // display the 2 objects
  object1Elem.css('background-image', 'url(' + object1.image + ')');
  object2Elem.css('background-image', 'url(' + object2.image + ')');
  valid1 = Math.random() < 0.5;
  audioFileName = valid1 ? object1.audio : object2.audio;
  playShowObjectAudio();

}

function resetObjects() {
  object1Elem.unbind('click').removeClass('pointerCursor');
  object2Elem.unbind('click').removeClass('pointerCursor');
  window.clearInterval(showObjectSoundInterval);
  showObjectSoundInterval = null;
  for(let i = 0; i<playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }
  playingAudios = [];
}

function playShowObjectAudio() {
  playingAudios = [];
  object1Elem.unbind('click').removeClass('pointerCursor');
  object2Elem.unbind('click').removeClass('pointerCursor');

  $modalPanel.dialog(dialogOptions);
  let playingObjectTypeAudio = new Audio(audioFileName);
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
        checkValidAnswer(valid1);
      });
      object2Elem.click(function() {
        checkValidAnswer(!valid1);
      });
    });
    playingObjectTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showObjectSoundInterval) {
    showObjectSoundInterval = setInterval(playShowObjectAudio, 8000);
  }
}

function checkValidAnswer(selectedValidAnswer) {
  resetObjects();
  if (selectedValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr("src","../img/smileFace.png");
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio("../sounds/correct.ogg");
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function(){
      $resultDivElem.hide();
      generateChallengeObjects();
    });
    playingCorrectAnswerAudio.play();
    $('#scoreGood > div').html(rightAnswers);
    $('#scoreGood').effect("highlight", {color: '#acffa3'}, 1000)
  } else {
    wrongAnswers++;
    $resultDivElem.find('img').attr("src", "../img/sadFace.png");
    $resultDivElem.toggle("shake");
    let playingWrongAnswerAudio = new Audio("../sounds/wrong.ogg");
    playingWrongAnswerAudio.addEventListener('ended', function(){
      $resultDivElem.toggle("shake", function() {
        playShowObjectAudio();
      });
    });
    playingWrongAnswerAudio.play();
    playingAudios[playingAudios.length] = playingWrongAnswerAudio;
    $('#scoreBad > div').html(wrongAnswers);
    $('#scoreBad').effect("highlight", {color: '#ff9c9c'}, 1000);
  }
}
