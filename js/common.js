let items; // list of available object items for the activity (css class name, image path, audio file name to be played, etc)

let validItemIndex, itemAudioFilePath;
let showItemSoundInterval;
let playingAudios;
let rightAnswers = 0, wrongAnswers = 0;

const dialogOptions = {
  dialogClass: 'ui-dialog-no-close-button',
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

function checkValidAnswer(isValidAnswer) {
  resetObjects(true, false);
  $modalPanel.dialog(dialogOptions);
  console.log(1);
  if (isValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr('src', '../img/smileFace.png');
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio('../sounds/correct.ogg');
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function () {
      $resultDivElem.hide();
      generateChallengeItems();
    });
    playingCorrectAnswerAudio.play();
    $('#scoreGood > div').html(rightAnswers);
    $('#scoreGood').effect('highlight', {color: '#acffa3'}, 1000)
  } else {
    wrongAnswers++;
    $resultDivElem.find('img').attr('src', '../img/sadFace.png');
    $resultDivElem.toggle('shake');
    let playingWrongAnswerAudio = new Audio('../sounds/wrong.ogg');
    playingWrongAnswerAudio.addEventListener('ended', function () {
      $resultDivElem.toggle('shake', function () {
        playShowItemAudio();
      });
    });
    playingWrongAnswerAudio.play();
    playingAudios[playingAudios.length] = playingWrongAnswerAudio;
    $('#scoreBad > div').html(wrongAnswers);
    $('#scoreBad').effect('highlight', {color: '#ff9c9c'}, 1000);
  }
}

function resetSounds() {
  window.clearInterval(showItemSoundInterval);
  showItemSoundInterval = null;
  for (let i = 0; i < playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }
  playingAudios = [];
}

function resetObjects(alsoResetSounds, alsoResetPlayingAudiosArray) {
  resetItemElems();

  if (alsoResetPlayingAudiosArray) {
    playingAudios = [];
  }

  if (alsoResetSounds) {
    resetSounds();
  }
}
