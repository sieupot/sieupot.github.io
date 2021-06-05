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

const imgPath = "../images/spatialPositioning/";
const sndPath = "../sounds/spatialPositioning/";

const
  andSoundItem = new SoundItem('under'),
  aboveSoundItem = new SoundItem('above'),
  underSoundItem = new SoundItem('under'),
  nearSoundItem = new SoundItem('near'),
  beforeSoundItem = new SoundItem('before'),
  behindSoundItem = new SoundItem('behind'),
  betweenSoundItem = new SoundItem('between'),

  teddyBearArtDSoundItem = new SoundItem('teddyBear', 'D'),
  teddyBearArtISoundItem = new SoundItem('teddyBear', 'I'),
  teddyBearArtPSoundItem = new SoundItem('teddyBear', 'P'),
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

  activityObjElemArray.push(jQuery('#itemContainer1Id'));
  activityObjElemArray.push(jQuery('#itemContainer2Id'));

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

  // extract the second activityItem from the pairCategory of the first item
  let selectedActivityItem2 = selectedActivityItem1.pairCategory;
  setupAnswer(activityObjElemArray[1], selectedActivityItem2);

  playShowItemAudio();
}

const setupAnswer = function (objElem, selectedActivityItem) {
  // extract the image to display for this first activity item
  let imagePath1 = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
  // randomly determine whether this is the correct answer or not
  let isCorrectAnswer = extractAnswerOption(answerOptionValues);
  if (isCorrectAnswer) {
    activitySoundList[activitySoundList.length] = selectedActivityItem.audioPath;
  }
  objElem.css('background-image', 'url(' + imagePath1 + ')');
  objElem.off('click').click(function () {
    checkValidAnswer(isCorrectAnswer);
  });
}
