const commandRepeatInterval = 8000;

let activityItems; // list of available items for the activity (css class name, image path, audio file name to be played, etc)

let nbDistractors;

let activityObjElemArray = []; // list of the JQUERY items actively displayed in the page
let prevSelectedItems = []; // item items selected in the previous iteration of the activity
let itemAudioFilePath;
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

  // INIT CONTAINER ELEMENTS: inject item containing divs into the page and create the JQUERY itemElements
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
  resultDivElem.find('img').removeAttr('onclick').removeClass('pointerCursor');

  generateChallengeItems();
}

const getAnswerOptions = () => {
  let answerOptionValues = []; // [true, false, (false)..]
  for (i = 0; i < activityObjElemArray.length; i++) {
    answerOptionValues.push(!answerOptionValues.length || answerOptionValues.length === 0);
  }
 return answerOptionValues;
}
const extractAnswerOption = (answerOptionValues) => {
  const answerOptionIndex = Math.floor(Math.random() * answerOptionValues.length);
  let isCorrectAnswer = answerOptionValues[answerOptionIndex]; // true or false
  answerOptionValues.splice(answerOptionIndex, 1); // remove the selected answer from the array
  return isCorrectAnswer;
}

const checkValidAnswer = (isValidAnswer) => {
  resetActivityItems();
  modalPanel.dialog(dialogOptions);
  if (isValidAnswer) {
    rightAnswers++;
    resultDivElem.find('img').attr('src', '../images/smileFace.png');
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
    resultDivElem.find('img').attr('src', '../images/sadFace.png');
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

const resetActivityItems = () => {
  resetSounds();
}

const resetSounds = () => {
  window.clearInterval(showItemSoundInterval);
  showItemSoundInterval = null;
  playingAudios = [];
  /*for (let i = 0; i < playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }*/
}

const playShowItemAudio = () => {
  resetActivityItems();

  modalPanel.dialog(dialogOptions);
  let playingItemNameAudio = new Audio(itemAudioFilePath);
  playingItemNameAudio.addEventListener('ended', function () {
    resultDivElem.hide();
    modalPanel.dialog('close');
  });
  playingAudios[playingAudios.length] = playingItemNameAudio;
  resultDivElem.find('img').attr('src', '../images/show.svg');
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
