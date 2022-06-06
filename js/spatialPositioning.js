import { ActivityEngine } from './activityEngine.js'

// on page load
jQuery(() => {
  new SpatialPositioning();
});

class SpatialPositioning extends ActivityEngine {
  constructor() {
    super();

    this.modalPanel = $('#dialogDiv');
    this.resultDivElem = $('div.result');

    let objInstance = this;
    $( "div.start-activity" ).bind('mousedown', function() {
      objInstance.startActivity();
    });
  
    this.activityObjElemArray.push(jQuery('#svgContainer1Id'));
    this.activityObjElemArray.push(jQuery('#svgContainer2Id'));
  
    // show the start icon and let the user manually start the activity
    this.resultDivElem.fadeIn(300);
    this.modalPanel.dialog(this.dialogOptions);
  }

  activityObjElemArray = [];

  activityItems;
  initActivityItems = () => {
    let sPActivityItems = new SPActivityItems();
    this.activityItems = sPActivityItems.activityItems;
  }
  
  generateChallengeItems = () => {
    // generate answer options
    this.answerOptionValues = this.getAnswerOptions(); // [true, false, (false)..]
  
    this.activitySoundList.push('../sounds/show.ogg');
  
    // extract the first activityItem
    let selectedActivityItem1 = this.activityItems[Math.floor((Math.random() * this.activityItems.length))];
    this.setupAnswer(this.activityObjElemArray[0], selectedActivityItem1);
  
    let selectedActivityItem1Name = selectedActivityItem1.name;
  
    // extract the second activityItem
    // loop until different name
    let selectedActivityItem2;
    do {
      selectedActivityItem2 =  this.activityItems[Math.floor((Math.random() * this.activityItems.length))];
    } while (selectedActivityItem1Name === selectedActivityItem2.name);
    this.setupAnswer(this.activityObjElemArray[1], selectedActivityItem2);
  
    this.playShowItemAudio();
  }
  
  setupAnswer = (objElem, {images, soundItems, name}) => {
    // extract the image to display for this first activity item
    let imagePath = images[Math.floor((Math.random() * images.length))];
    // randomly determine whether this is the correct answer or not
    let isCorrectAnswer = extractRandomEntryAndSplice(this.answerOptionValues);
    if (isCorrectAnswer) {
      this.activitySoundList = this.activitySoundList.concat(soundItems);
      this.challengeCorrectItemName = name;
    }
    objElem.load(imagePath);
    objElem.off('mousedown').mousedown(() => {
      this.checkValidAnswer(isCorrectAnswer);
    });
  }
}
