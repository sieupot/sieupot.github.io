let prevRnd;
let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times
let challengeItem;

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  // load dest resource
  jQuery('#clickDestContainerId > svg').load(destImagePath, function () {
    Array.from(document.getElementsByClassName('covered')).forEach(function (item) {
      item.setAttribute('onmousedown', 'event.stopPropagation(); validateChallenge(event);');
    });
  });

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

const generateChallengeItems = () => {
  // select the valid challenge item, save it to be checked later
  const validItemIndex = Math.floor((Math.random() * activityItems.length));
  challengeItem = activityItems[validItemIndex];

  activitySoundList = [];
  activitySoundList.push('../sounds/show.ogg');
  const correctItem = activityItems[validItemIndex];
  activitySoundList.push(correctItem.soundItem.soundPath);

  playShowItemAudio();
}

const validateChallenge = (ev) => {
  let clickedElem = ev.currentTarget;
  checkValidAnswer(clickedElem.id === `gr_${challengeItem.name}`);
}
