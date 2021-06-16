const
  sndCommonPath = "../sounds/common/",

  boyArtDSoundItem = new SoundItem('boy', 'D'),
  girlArtDSoundItem = new SoundItem('girl', 'D'),

  clapsSoundItem = new SoundItem('claps'),
  drawsSoundItem = new SoundItem('draws'),
  drinksSoundItem = new SoundItem('drinks'),
  makesSoundItem = new SoundItem('makes'),
  playsSoundItem = new SoundItem('plays'),
  singsSoundItem = new SoundItem('sings'),
  throwsSoundItem = new SoundItem('throws'),
  washesSoundItem = new SoundItem('washes'),
  writesSoundItem = new SoundItem('writes'),

  palmsISoundItem = new SoundItem('palms', "I"),
  handsISoundItem = new SoundItem('hands', "I"),
  waterISoundItem = new SoundItem('water', "I"),
  balloonsISoundItem = new SoundItem('balloons', "I"),
  pianoISoundItem = new SoundItem('piano', "I"),
  basketballISoundItem = new SoundItem('basketball', "I"),
  faceISoundItem = new SoundItem('face', "I"),

  // se (articol reflexiv)
  thirdSgReflexiveArtSoundItem = new SoundItem('thirdSgReflexiveArt', '', true),
  // pe
  aboveSoundItem = new SoundItem('above', '', true),
  // din
  fromSoundItem = new SoundItem('from', '', true),
  // la
  atSoundItem = new SoundItem('at', '', true),
  inSoundItem = new SoundItem('in', '', true);

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  activityObjElemArray.push(jQuery('#actionContainer1Id'));
  activityObjElemArray.push(jQuery('#actionContainer2Id'));

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

generateChallengeItems = () => {
  // generate answer options
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  activitySoundList[activitySoundList.length] = '../sounds/show.ogg';

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

const setupAnswer = function (objElem, selectedActivityItem) {
  // extract the image to display for this first activity item
  let imagePath = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
  // randomly determine whether this is the correct answer or not
  let isCorrectAnswer = extractAnswerOption(answerOptionValues);
  if (isCorrectAnswer) {
    activitySoundList = activitySoundList.concat(selectedActivityItem.soundItems);
  }
  objElem.load(imagePath);
  objElem.off('click').click(function () {
    checkValidAnswer(isCorrectAnswer);
  });
}
