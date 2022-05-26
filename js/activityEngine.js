let activityItems; // list of available items for the activity (css class name, image path, audio file name to be played, etc)

let nbDistractors = getNbDistractors();

let activityObjElemArray = []; // list of the JQUERY items actively displayed in the page
let prevSelectedItems = []; // item items selected in the previous iteration of the activity
let activitySoundList = [];
let showItemSoundInterval;
let playingAudios = [];
let [rightAnswers, wrongAnswers] = [0, 0];

let challengeCorrectItemName = '';

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
let score = new Score();

const initActivity = (itemClass = 'item') => {
  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  // INIT CONTAINER ELEMENTS: inject item containing img nodes into the page and create the JQUERY itemElements
  for (i = 1; i <= nbDistractors; i++) {
    let itemContainerId = `itemContainer${i}`;
    jQuery('#contentPanel').append(`<div id="${itemContainerId}" class="${itemClass} pointer-cursor"></div>`);

    let objElem = jQuery(`#${itemContainerId}`);
    activityObjElemArray.push(objElem);
  }

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
}

const startNewChallenge = () => {
  generateChallengeItems();

  // initialize a new reaction time item
  score.addAnswerReactionTimeItem(new Date(), challengeCorrectItemName);
}

/**
 * triggered when the user manually chooses to start the activity
 */
const startActivity = () => {
  resultDivElem.find('div').removeAttr('onmousedown').removeClass('pointer-cursor');

  activitySoundList = [];
  startNewChallenge();
}

const getAnswerOptions = () => {
  let answerOptionValues = []; // [true, false, (false)..]
  activityObjElemArray.forEach(item => answerOptionValues.push(!answerOptionValues.length || answerOptionValues.length === 0));
  return answerOptionValues;
}

const checkValidAnswer = (isValidAnswer) => {
  resetActivityItems();
  modalPanel.dialog(dialogOptions);

  if (isValidAnswer) {
    handleValidAnswer(true, true, true);
  } else {
    handleInvalidAnswer(true);
  }
}

const handleValidAnswer = (doShowSmileFace, doPlayCorrectItemAudio, doStartNewChallenge) => {
  rightAnswers++;
  if (doShowSmileFace) {
    // ------------------------------------------v display success smaller and top right so that children can see the correct item they have chosen (on a tablet, for the human body activities)
    resultDivElem.css('opacity', .5).find('div').addClass('action-feedback').css('background-image', 'url(../images/smileFace.png)');
    resultDivElem.fadeIn(500);
  }
  if (doPlayCorrectItemAudio) {
    let playingCorrectAnswerAudio = new Audio('../sounds/correct.ogg');
    playingAudios.push(playingCorrectAnswerAudio);
    playingCorrectAnswerAudio.addEventListener('ended', () => {
      resultDivElem.css('opacity', 1).hide().find('div').removeClass('action-feedback');

      activitySoundList = [];
      if (doStartNewChallenge) {
        startNewChallenge();
      }
    });
    playingCorrectAnswerAudio.play();
  } else if (doStartNewChallenge) {
    startNewChallenge();
  }

  jQuery('#scoreGood > div').html(rightAnswers);
  jQuery('#scoreGood').effect('highlight', {color: '#acffa3'}, 500);

  score.completeCurrentActionReactionTimeItem(new Date());
}

const handleInvalidAnswer = (doPlayShowItemAudio) => {
  wrongAnswers++;
  resultDivElem.css('opacity', .5).find('div').css('background-image', 'url(../images/sadFace.png)');
  resultDivElem.fadeIn(500);
  let playingWrongAnswerAudio = new Audio('../sounds/wrong.ogg');
  playingWrongAnswerAudio.addEventListener('ended', () => {
    resultDivElem.css('opacity', 1).hide();
    modalPanel.dialog('close');
    if (doPlayShowItemAudio) {
      playShowItemAudio();
    }
  });
  playingWrongAnswerAudio.play();
  playingAudios.push(playingWrongAnswerAudio);
  jQuery('#scoreBad > div').html(wrongAnswers);
  jQuery('#scoreBad').effect('highlight', {color: '#ff9c9c'}, 500);

  score.updateFailuresCurrentAnswerReactionTimeItem();
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

  if (score.dlResultsModalPanel && score.dlResultsModalPanel.is(":visible")) {
    // don't repeat the command and reschedule next repeat
    if (repeat && !showItemSoundInterval) {
      showItemSoundInterval = setInterval(playShowItemAudio, getCommandRepeatInterval());
    }
  } else {
    resultDivElem.find('div').css('background-image', 'url(../images/pause.svg)');
    resultDivElem.fadeIn(300);
    modalPanel.dialog(dialogOptions);

    let audio = new Audio(),
      i = 0;
    audio.addEventListener('ended', () => {
      if (++i === activitySoundList.length) {
        resultDivElem.hide();
        modalPanel.dialog('close');

        // schedule next repeat after the last sound has been played
        if (repeat && !showItemSoundInterval) {
          showItemSoundInterval = setInterval(playShowItemAudio, getCommandRepeatInterval());
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
