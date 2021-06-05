class SoundItem {
  soundPath;

  /**
   *
   * @param soundBaseFileName
   * @param soundArticle: Indefinite, Definite, Possessive
   */
  constructor(soundBaseFileName, soundArticle) {
    this.soundPath = sndPath + soundBaseFileName + (soundArticle ? soundArticle : '') + ".ogg";
  }
}

let answerOptionValues;

const imgPath = "../images/spatialPositioning1/";
const sndPath = "../sounds/spatialPositioning1/";

const
  andSoundItem = new SoundItem('and'),
  inSoundItem = new SoundItem('in'),
  aboveSoundItem = new SoundItem('above'),
  underSoundItem = new SoundItem('under'),
  nearSoundItem = new SoundItem('near'),
  beforeSoundItem = new SoundItem('before'),
  behindSoundItem = new SoundItem('behind'),
  betweenSoundItem = new SoundItem('between'),

  teddyBearArtDSoundItem = new SoundItem('teddyBear', 'D'),
  teddyBearArtISoundItem = new SoundItem('teddyBear', 'I'),
  boxArtISoundItem = new SoundItem('box', 'I'),
  boxArtDSoundItem = new SoundItem('box', 'D'),
  boxArtPSoundItem = new SoundItem('box', 'P'),
  chairArtISoundItem = new SoundItem('chair', 'I'),
  chairArtPSoundItem = new SoundItem('chair', 'P'),
  closetArtISoundItem = new SoundItem('closet', 'I'),
  closetArtPSoundItem = new SoundItem('closet', 'P'),
  tableArtISoundItem = new SoundItem('table', 'I'),
  tableArtPSoundItem = new SoundItem('table', 'P');


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
