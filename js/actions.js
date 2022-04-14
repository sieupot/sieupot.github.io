let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times

// on page load
const sndCommonPath = "../sounds/common/";

  // verbs
const clapsSoundItem = new SoundItem('claps');
const drawsSoundItem = new SoundItem('draws');
const drinksSoundItem = new SoundItem('drinks');
const makesSoundItem = new SoundItem('makes');
const playsSoundItem = new SoundItem('plays');
const singsSoundItem = new SoundItem('sings');
const throwsSoundItem = new SoundItem('throws');
const washesSoundItem = new SoundItem('washes');
const writesSoundItem = new SoundItem('writes');
const blowsSoundItem = new SoundItem('blows');
const sleepsSoundItem = new SoundItem('sleeps');
const walksSoundItem = new SoundItem('walks');
const readsSoundItem = new SoundItem('reads');
const looksSoundItem = new SoundItem('looks');
const climbsSoundItem = new SoundItem('climbs');
const smellsSoundItem = new SoundItem('smells');
const runsSoundItem = new SoundItem('runs');
const dancesSoundItem = new SoundItem('dances');
const dressesSoundItem = new SoundItem('dresses');
const putsShoesOnSoundItem = new SoundItem('putsShoesOn');
const combsSoundItem = new SoundItem('combs');
const criesSoundItem = new SoundItem('cries');
const broomsSoundItem = new SoundItem('brooms');
const listensSoundItem = new SoundItem('listens');
const laughsSoundItem = new SoundItem('laughs');
const jumpsSoundItem = new SoundItem('jumps');
const eatsSoundItem = new SoundItem('eats');

  // nouns
const boyArtDSoundItem = new SoundItem('boy', 'D');
const girlArtDSoundItem = new SoundItem('girl', 'D');
  // +
const palmsISoundItem = new SoundItem('palms', "I");
const handsISoundItem = new SoundItem('hands', "I");
const waterISoundItem = new SoundItem('water', "I");
const balloonsISoundItem = new SoundItem('balloons', "I");
const pianoISoundItem = new SoundItem('piano', "I");
const ballDSoundItem = new SoundItem('ball', "D");
const basketISoundItem = new SoundItem('basket', "I");
const faceISoundItem = new SoundItem('face', "I");
const bathISoundItem = new SoundItem('bath', "I");
const candlesISoundItem = new SoundItem('candles', "I");
const watchISoundItem = new SoundItem('watch', "I");
const flowerDSoundItem = new SoundItem('flower', "D");
const musicISoundItem = new SoundItem('music', "I");

  // se (articol reflexiv)
const thirdSgReflexiveArtSoundItem = new SoundItem('thirdSgReflexiveArt', '', true);
  // pe
const aboveSoundItem = new SoundItem('above', '', true);
  // din
const fromSoundItem = new SoundItem('from', '', true);
  // la
const atSoundItem = new SoundItem('at', '', true);
const inSoundItem = new SoundItem('in', '', true);

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
