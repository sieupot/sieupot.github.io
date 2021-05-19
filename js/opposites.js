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

function generateChallengeItems() {
  let answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  // extract the first activityItem
  let selectedActivityItem1 = activityItems[Math.floor((Math.random() * activityItems.length))];
  // extract the image to display for this first activity item
  let imagePath1 = selectedActivityItem1.images[Math.floor((Math.random() * selectedActivityItem1.images.length))];
  // randomly determine whether this is the correct answer or not
  let isCorrectAnswer = extractAnswerOption(answerOptionValues);
  if (isCorrectAnswer) {
    itemAudioFilePath = selectedActivityItem1.audioPath;
  }
  let objElem1 = activityObjElemArray[0];
  objElem1.css('background-image', 'url(' + imagePath1 + ')');
  objElem1.off('click').click(function () {
    checkValidAnswer(isCorrectAnswer);
  });

  // extract the second activityItem from the pairCategory of the first item
  let selectedActivityItem2 = selectedActivityItem1.pairCategory;
  // extract the image to display for this second activity item
  let imagePath2 = selectedActivityItem2.images[Math.floor((Math.random() * selectedActivityItem2.images.length))];
  // randomly determine whether this is the correct answer or not
  isCorrectAnswer = extractAnswerOption(answerOptionValues);
  if (isCorrectAnswer) {
    itemAudioFilePath = selectedActivityItem2.audioPath;
  }
  let objElem2 = activityObjElemArray[1];
  objElem2.css('background-image', 'url(' + imagePath2 + ')');
  objElem2.off('click').click(function () {
    checkValidAnswer(isCorrectAnswer);
  });

  playShowItemAudio();
}
