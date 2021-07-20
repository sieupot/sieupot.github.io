let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times

const
  sndCommonPath = "../sounds/common/",

  inSoundItem = new SoundItem('in', '', true),
  aboveSoundItem = new SoundItem('above', '', true),
  underSoundItem = new SoundItem('under', '', true),
  nearSoundItem = new SoundItem('near', '', true),
  beforeSoundItem = new SoundItem('before', '', true),
  behindSoundItem = new SoundItem('behind', '', true);

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  activityObjElemArray.push(jQuery('#svgContainer1Id'));
  activityObjElemArray.push(jQuery('#svgContainer2Id'));

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

  let selectedActivityItem1Name = selectedActivityItem1.name;

  // extract the second activityItem
  // loop until different name
  let selectedActivityItem2;
  do {
    selectedActivityItem2 =  activityItems[Math.floor((Math.random() * activityItems.length))];
  } while (selectedActivityItem1Name === selectedActivityItem2.name);
  setupAnswer(activityObjElemArray[1], selectedActivityItem2);

  playShowItemAudio();
}

const setupAnswer = (objElem, selectedActivityItem) => {
  // extract the image to display for this first activity item
  let imagePath = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
  // randomly determine whether this is the correct answer or not
  let isCorrectAnswer = extractRandomEntryAndSplice(answerOptionValues);
  if (isCorrectAnswer) {
    activitySoundList = activitySoundList.concat(selectedActivityItem.soundItems);
    challengeCorrectItemName = selectedActivityItem.name;
  }
  objElem.load(imagePath);
  objElem.off('click').click(() => {
    checkValidAnswer(isCorrectAnswer);
  });
}
