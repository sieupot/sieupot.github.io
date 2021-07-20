let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  activityObjElemArray.push(jQuery('#itemContainer1Id'));
  activityObjElemArray.push(jQuery('#itemContainer2Id'));

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

const generateChallengeItems = () => {
  // generate answer options
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  activitySoundList.push('../sounds/show.ogg');

  // extract the first activityItem
  let selectedActivityItem1 = activityItems[Math.floor((Math.random() * activityItems.length))];
  setupAnswer(activityObjElemArray[0], selectedActivityItem1);

  // extract the second activityItem from the pairCategory of the first item
  let selectedActivityItem2 = selectedActivityItem1.pairCategory;
  setupAnswer(activityObjElemArray[1], selectedActivityItem2);

  playShowItemAudio();
}

const setupAnswer = (objElem, selectedActivityItem) => {
  // extract the image to display for this first activity item
  let imagePath1 = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
  // randomly determine whether this is the correct answer or not
  let isCorrectAnswer = extractRandomEntryAndSplice(answerOptionValues);
  if (isCorrectAnswer) {
    activitySoundList.push(selectedActivityItem.audioPath);
    challengeCorrectItemName = selectedActivityItem.name;
  }
  objElem.css('background-image', 'url(' + imagePath1 + ')');
  objElem.off('click').click(() => {
    checkValidAnswer(isCorrectAnswer);
  });
}
