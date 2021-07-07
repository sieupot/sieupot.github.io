let activityItems; // list of available items for the activity (css class name, image path, audio file name to be played, etc)

let nbDistractors;

let activityObjElemArray = []; // list of the JQUERY items actively displayed in the page
let prevSelectedItems = []; // item items selected in the previous iteration of the activity
let activitySoundList = [];
let showItemSoundInterval;
let playingAudios = [];
let [rightAnswers, wrongAnswers] = [0, 0];

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

let modalPanel, resultDivElem;

const initActivity = (itemClass = 'item') => {
  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  // what level is this? Init number of distractors used to render the number of activity items
  nbDistractors = Number(getUrlParameter('l'));
  nbDistractors = (!nbDistractors || nbDistractors > 3) ? 2 : nbDistractors + 1;

  // INIT CONTAINER ELEMENTS: inject item containing img nodes into the page and create the JQUERY itemElements
  for (i = 1; i <= nbDistractors; i++) {
    let itemContainerId = `itemContainer${i}`;
    jQuery('#contentPanel').append(`<div id="${itemContainerId}" class="${itemClass} pointerCursor"></div>`);

    let objElem = jQuery(`#${itemContainerId}`);
    activityObjElemArray.push(objElem);
  }

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
}


/**
 * triggered when the user manually chooses to start the activity
 */
const startActivity = () => {
  resultDivElem.find('div').removeAttr('onclick').removeClass('pointerCursor');

  activitySoundList = [];
  generateChallengeItems();
}

const getAnswerOptions = () => {
  let answerOptionValues = []; // [true, false, (false)..]
  for (i = 0; i < activityObjElemArray.length; i++) {
    answerOptionValues.push(!answerOptionValues.length || answerOptionValues.length === 0);
  }
 return answerOptionValues;
}

const checkValidAnswer = (isValidAnswer) => {
  resetActivityItems();
  modalPanel.dialog(dialogOptions);

  if (isValidAnswer) {
    rightAnswers++;
    resultDivElem.find('div').css('background-image', 'url(../images/smileFace.png)');
    resultDivElem.fadeIn(500);
    let playingCorrectAnswerAudio = new Audio('../sounds/correct.ogg');
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function () {
      resultDivElem.hide();

      activitySoundList = [];
      generateChallengeItems();
    });
    playingCorrectAnswerAudio.play();
    jQuery('#scoreGood > div').html(rightAnswers);
    jQuery('#scoreGood').effect('highlight', {color: '#acffa3'}, 500)
  } else {
    handleInvalidAnswer(true);
  }
}

function handleInvalidAnswer(doPlayShowItemAudio) {
  wrongAnswers++;
  resultDivElem.find('div').css('background-image', 'url(../images/sadFace.png)');
  resultDivElem.fadeIn(500);
  let playingWrongAnswerAudio = new Audio('../sounds/wrong.ogg');
  playingWrongAnswerAudio.addEventListener('ended', function () {
    resultDivElem.hide();
    modalPanel.dialog('close');
    if (doPlayShowItemAudio) {
      playShowItemAudio();
    }
  });
  playingWrongAnswerAudio.play();
  playingAudios[playingAudios.length] = playingWrongAnswerAudio;
  jQuery('#scoreBad > div').html(wrongAnswers);
  jQuery('#scoreBad').effect('highlight', {color: '#ff9c9c'}, 500);
}

const resetActivityItems = () => {
  resetSounds();
}

const resetSounds = () => {
  window.clearInterval(showItemSoundInterval);
  showItemSoundInterval = null;
  // playingAudios = [];
  /*for (let i = 0; i < playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }*/
}

const playShowItemAudio = (repeat = true) => {
  resetActivityItems();

  if (nameModalPanel && nameModalPanel.is(":visible")) {
    // don't repeat the command and reschedule next repeat
    if (repeat && !showItemSoundInterval) {
      showItemSoundInterval = setInterval(playShowItemAudio, getCommandRepeatInterval(true));
    }
  } else {
    resultDivElem.find('div').css('background-image', 'url(../images/pause.svg)');
    resultDivElem.fadeIn(300);
    modalPanel.dialog(dialogOptions);

    let audio = new Audio(),
      i = 0;
    audio.addEventListener('ended', function () {
      if (++i === activitySoundList.length) {
        resultDivElem.hide();
        modalPanel.dialog('close');

        // schedule next repeat after the last sound has been played
        if (repeat && !showItemSoundInterval) {
          showItemSoundInterval = setInterval(playShowItemAudio, getCommandRepeatInterval(true));
        }
        return;
      }

      audio.src = activitySoundList[i];
      audio.play();
    }, true);
    audio.src = activitySoundList[0];
    audio.play();
  }
}
