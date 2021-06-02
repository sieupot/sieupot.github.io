class Item {
  imagePath;
  soundPath;

  /**
   *
   * @param imageFile
   * @param soundBaseFileName
   * @param soundArticle: Indefinite, Definite, Possessive
   */
  constructor(imageFile, soundBaseFileName, soundArticle) {
    this.imagePath = imgPath + imageFile;
    this.soundPath = sndPath + soundBaseFileName + soundArticle + ".ogg";
  }
}

let answerOptionValues;

const imgPath = "../images/spatialPositioning/";
const sndPath = "../sounds/spatialPositioning/";

const teddyBearArtDItem = new Item('teddyBear.svg', 'teddyBear', 'D'),
  boxArtIItem = new Item('box.svg', 'box', 'I'),
  boxArtDItem = new Item('box.svg', 'box', 'D'),
  boxArtPItem = new Item('box.svg', 'box', 'P'),
  chairArtIItem = new Item('chair.svg', 'chair', 'I'),
  chairArtPItem = new Item('chair.svg', 'chair', 'P'),
  closetArtIItem = new Item('closet.svg', 'closet', 'I'),
  closetArtPItem = new Item('closet.svg', 'closet', 'P'),
  tableArtIItem = new Item('table.svg', 'table', 'I'),
  tableArtPItem = new Item('table.svg', 'table', 'P');


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
  // generate answer options
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

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
    itemAudioFilePath = selectedActivityItem.audioPath;
  }
  objElem.css('background-image', 'url(' + imagePath1 + ')');
  objElem.off('click').click(function () {
    checkValidAnswer(isCorrectAnswer);
  });
}
