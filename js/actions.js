let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times

// on page load
const
  sndCommonPath = "../sounds/common/",

  // verbs
  clapsSoundItem = new SoundItem('claps'),
  drawsSoundItem = new SoundItem('draws'),
  drinksSoundItem = new SoundItem('drinks'),
  makesSoundItem = new SoundItem('makes'),
  playsSoundItem = new SoundItem('plays'),
  singsSoundItem = new SoundItem('sings'),
  throwsSoundItem = new SoundItem('throws'),
  washesSoundItem = new SoundItem('washes'),
  writesSoundItem = new SoundItem('writes'),
  blowsSoundItem = new SoundItem('blows'),
  sleepsSoundItem = new SoundItem('sleeps'),
  walksSoundItem = new SoundItem('walks'),
  readsSoundItem = new SoundItem('reads'),
  looksSoundItem = new SoundItem('looks'),
  climbsSoundItem = new SoundItem('climbs'),
  smellsSoundItem = new SoundItem('smells'),
  runsSoundItem = new SoundItem('runs'),
  dancesSoundItem = new SoundItem('dances'),
  dressesSoundItem = new SoundItem('dresses'),
  putsShoesOnSoundItem = new SoundItem('putsShoesOn'),
  combsSoundItem = new SoundItem('combs'),
  criesSoundItem = new SoundItem('cries'),
  broomsSoundItem = new SoundItem('brooms'),
  listensSoundItem = new SoundItem('listens'),
  laughsSoundItem = new SoundItem('laughs'),
  jumpsSoundItem = new SoundItem('jumps'),
  eatsSoundItem = new SoundItem('eats'),

  // nouns
  boyArtDSoundItem = new SoundItem('boy', 'D'),
  girlArtDSoundItem = new SoundItem('girl', 'D'),
  // +
  palmsISoundItem = new SoundItem('palms', "I"),
  handsISoundItem = new SoundItem('hands', "I"),
  waterISoundItem = new SoundItem('water', "I"),
  balloonsISoundItem = new SoundItem('balloons', "I"),
  pianoISoundItem = new SoundItem('piano', "I"),
  ballDSoundItem = new SoundItem('ball', "D"),
  basketISoundItem = new SoundItem('basket', "I"),
  faceISoundItem = new SoundItem('face', "I"),
  bathISoundItem = new SoundItem('bath', "I"),
  candlesISoundItem = new SoundItem('candles', "I"),
  watchISoundItem = new SoundItem('watch', "I"),
  flowerDSoundItem = new SoundItem('flower', "D"),
  musicISoundItem = new SoundItem('music', "I"),

  // se (articol reflexiv)
  thirdSgReflexiveArtSoundItem = new SoundItem('thirdSgReflexiveArt', '', true),
  // pe
  aboveSoundItem = new SoundItem('above', '', true),
  // din
  fromSoundItem = new SoundItem('from', '', true),
  // la
  atSoundItem = new SoundItem('at', '', true),
  inSoundItem = new SoundItem('in', '', true);

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

const generateChallengeItems = () => {
  // generate answer options
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  activitySoundList.push('../sounds/show.ogg');

  // extract the first activityItem
  let selectedActivityItem1 = activityItems[Math.floor((Math.random() * activityItems.length))];
  setupAnswer(activityObjElemArray[0], selectedActivityItem1);

  let selectedActivityItem1Name = selectedActivityItem1.name;

  let inSameGrouping = false;

  // extract the second activityItem
  // loop until different name
  let selectedActivityItem2;
  do {
    selectedActivityItem2 =  activityItems[Math.floor((Math.random() * activityItems.length))];

    inSameGrouping = selectedActivityItem1.grouping && selectedActivityItem2.grouping && (selectedActivityItem1.grouping === selectedActivityItem2.grouping);
  } while (selectedActivityItem1Name === selectedActivityItem2.name || inSameGrouping);
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
  objElem.css('background-image', 'url(' + imagePath + ')');
  // objElem.attr('src', imagePath);
  objElem.off('mousedown').mousedown(() => {
    checkValidAnswer(isCorrectAnswer);
  });
}
