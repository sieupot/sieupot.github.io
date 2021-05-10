const commandRepeatInterval = 8000;

let items; // list of available object items for the activity (css class name, image path, audio file name to be played, etc)

let nbDistractors;

let activityObjElemArray = []; // list of the JQUERY objects actively displayed in the page
let prevSelectedItems = []; // item objects selected in the previous iteration of the activity
let itemAudioFilePath;
let showItemSoundInterval;
let playingAudios = [];
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

let modalPanel;
let resultDivElem;

/**
 * starts the activity
 */
const startActivity = function () {
  resultDivElem.find('img').removeAttr('onclick').removeClass('pointerCursor');

  generateChallengeItems();
}

const initContainerElements = function () {
  // what level is this?
  nbDistractors = Number(getUrlParameter('l'));
  nbDistractors = (!nbDistractors || nbDistractors > 3) ? 2 : nbDistractors + 1;

  // inject item containing divs into the page and create the JQUERY objectElements
  for (i = 1; i <= nbDistractors; i++) {
    let itemContainerId = `itemContainer${i}`;
    jQuery('#contentPanel').append(`<div id="${itemContainerId}" class="object pointerCursor"></div>`);

    let objElem = jQuery(`#${itemContainerId}`);
    activityObjElemArray.push(objElem);
  }
}

function checkValidAnswer(isValidAnswer) {
  resetObjects();
  modalPanel.dialog(dialogOptions);
  if (isValidAnswer) {
    rightAnswers++;
    resultDivElem.find('img').attr('src', '../img/smileFace.png');
    resultDivElem.fadeIn(500);
    let playingCorrectAnswerAudio = new Audio('../sounds/correct.ogg');
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function () {
      resultDivElem.hide();
      generateChallengeItems();
    });
    playingCorrectAnswerAudio.play();
    jQuery('#scoreGood > div').html(rightAnswers);
    jQuery('#scoreGood').effect('highlight', {color: '#acffa3'}, 500)
  } else {
    wrongAnswers++;
    resultDivElem.find('img').attr('src', '../img/sadFace.png');
    resultDivElem.fadeIn(500);
    let playingWrongAnswerAudio = new Audio('../sounds/wrong.ogg');
    playingWrongAnswerAudio.addEventListener('ended', function () {
      resultDivElem.hide();
      playShowItemAudio();
    });
    playingWrongAnswerAudio.play();
    playingAudios[playingAudios.length] = playingWrongAnswerAudio;
    jQuery('#scoreBad > div').html(wrongAnswers);
    jQuery('#scoreBad').effect('highlight', {color: '#ff9c9c'}, 500);
  }
}

function resetObjects() {
  playingAudios = [];
  resetSounds();
}

function resetSounds() {
  window.clearInterval(showItemSoundInterval);
  showItemSoundInterval = null;
  playingAudios = [];
  /*for (let i = 0; i < playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }*/
}

function playShowItemAudio() {
  resetObjects();

  modalPanel.dialog(dialogOptions);
  let playingItemNameAudio = new Audio(itemAudioFilePath);
  playingItemNameAudio.addEventListener('ended', function () {
    resultDivElem.hide();
    modalPanel.dialog('close');
  });
  playingAudios[playingAudios.length] = playingItemNameAudio;
  resultDivElem.find('img').attr('src', '../img/show.svg');
  resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio('../sounds/show.ogg');
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function () {
    playingItemNameAudio.play();
  });
  playingShowAudio.play();

  if (!showItemSoundInterval) {
    showItemSoundInterval = setInterval(playShowItemAudio, commandRepeatInterval);
  }
}
