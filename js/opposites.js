import { ActivityEngine } from './activityEngine.js'

// on page load
jQuery(() => {
  new Opposites();
});

class Opposites extends ActivityEngine {
  // on page load
  constructor() {
    super();
  
    this.modalPanel = jQuery('#dialogDiv');
    this.resultDivElem = jQuery('div.result');

    let objInstance = this;
    $( "div.start-activity" ).bind('mousedown', function() {
      objInstance.startActivity();
    });

    this.activityObjElemArray.push(jQuery('#itemContainer1Id'));
    this.activityObjElemArray.push(jQuery('#itemContainer2Id'));
  
    // show the start icon and let the user manually start the activity
    this.resultDivElem.fadeIn(300);
    this.modalPanel.dialog(this.dialogOptions);
  }

  activityObjElemArray = [];

  activityItems;
  imgPath = "../images/opposites/";
  sndPath = "../sounds/opposites/";
  initActivityItems = () => {
    this.activityItems = [];

    // FULL / EMPTY
    let fullCategory = {}, emptyCategory = {};
    fullCategory.name = 'full';
    fullCategory.audioPath = this.sndPath + "full.ogg";
    fullCategory.images = [this.imgPath + "full.jpg"];
    emptyCategory.name = 'empty';
    emptyCategory.audioPath = this.sndPath + "empty.ogg";
    emptyCategory.images = [this.imgPath + "empty.jpg"];
    fullCategory.pairCategory = emptyCategory;
    emptyCategory.pairCategory = fullCategory;
    this.activityItems.push(fullCategory);
    this.activityItems.push(emptyCategory);
    // INSIDE / OUTSIDE
    let insideCategory = {}, outsideCategory = {};
    insideCategory.name = 'inside';
    insideCategory.audioPath = this.sndPath + "inside.ogg";
    insideCategory.images = [this.imgPath + "inside.jpg"];
    outsideCategory.name = 'outside';
    outsideCategory.audioPath = this.sndPath + "outside.ogg";
    outsideCategory.images = [this.imgPath + "outside.jpg"];
    insideCategory.pairCategory = outsideCategory;
    outsideCategory.pairCategory = insideCategory;
    this.activityItems.push(insideCategory);
    this.activityItems.push(outsideCategory);
    // WARM / COLD
    let warmCategory = {}, coldCategory = {};
    warmCategory.name = 'warm';
    warmCategory.audioPath = this.sndPath + "warm.ogg";
    warmCategory.images = [this.imgPath + "warm.jpg"];
    coldCategory.name = 'cold';
    coldCategory.audioPath = this.sndPath + "cold.ogg";
    coldCategory.images =  [this.imgPath + "cold.jpg"];
    warmCategory.pairCategory = coldCategory;
    coldCategory.pairCategory = warmCategory;
    this.activityItems.push(warmCategory);
    this.activityItems.push(coldCategory);
    // FRONT / BACK
    let frontCategory = {}, backCategory = {};
    frontCategory.name = 'front';
    frontCategory.audioPath = this.sndPath + "front.ogg";
    frontCategory.images = [this.imgPath + "front.jpg"];
    backCategory.name = 'back';
    backCategory.audioPath = this.sndPath + "back.ogg";
    backCategory.images = [this.imgPath + "back.jpg"];
    frontCategory.pairCategory = backCategory;
    backCategory.pairCategory = frontCategory;
    this.activityItems.push(frontCategory);
    this.activityItems.push(backCategory);
    // SLEEPING / AWAKE
    let sleepingCategory = {}, awakeCategory = {};
    sleepingCategory.name = 'sleeping';
    sleepingCategory.audioPath = this.sndPath + "sleeping.ogg";
    sleepingCategory.images =[this.imgPath + "sleeping.jpg"] ;
    awakeCategory.name = "awake";
    awakeCategory.audioPath = this.sndPath + "awake.ogg";
    awakeCategory.images =  [this.imgPath + "awake.jpg"];
    sleepingCategory.pairCategory = awakeCategory;
    awakeCategory.pairCategory = sleepingCategory;
    this.activityItems.push(sleepingCategory);
    this.activityItems.push(awakeCategory);
    // FAT / SLIM
    let fatCategory = {}, slimCategory = {};
    fatCategory.name = 'fat';
    fatCategory.audioPath = this.sndPath + "fat.ogg";
    fatCategory.images = [this.imgPath + "fat.jpg"];
    slimCategory.name = 'slim';
    slimCategory.audioPath = this.sndPath + "slim.ogg";
    slimCategory.images = [this.imgPath + "slim.jpg"];
    fatCategory.pairCategory = slimCategory;
    slimCategory.pairCategory = fatCategory;
    this.activityItems.push(fatCategory);
    this.activityItems.push(slimCategory);
    // HEAVY / LIGHT
    let heavyCategory = {}, lightCategory = {};
    heavyCategory.name = 'heavy';
    heavyCategory.audioPath = this.sndPath + "heavy.ogg";
    heavyCategory.images = [this.imgPath + "heavy.jpg"];
    lightCategory.name = 'light';
    lightCategory.audioPath = this.sndPath + "light.ogg";
    lightCategory.images = [this.imgPath + "light.jpg"];
    heavyCategory.pairCategory = lightCategory;
    lightCategory.pairCategory = heavyCategory;
    this.activityItems.push(heavyCategory);
    this.activityItems.push(lightCategory);
    // SLOW / FAST
    let slowCategory = {}, fastCategory = {};
    slowCategory.name = 'slow';
    slowCategory.audioPath = this.sndPath + "slow.ogg";
    slowCategory.images = [this.imgPath + "slow.jpg"];
    fastCategory.name = 'fast';
    fastCategory.audioPath = this.sndPath + "fast.ogg";
    fastCategory.images = [this.imgPath + "fast.jpg"];
    slowCategory.pairCategory = fastCategory;
    fastCategory.pairCategory = slowCategory;
    this.activityItems.push(slowCategory);
    this.activityItems.push(fastCategory);
    // DOWN / UP
    let downCategory = {}, upCategory = {};
    downCategory.name = 'down';
    downCategory.audioPath = this.sndPath + "down.ogg";
    downCategory.images = [this.imgPath + "down.jpg"];
    upCategory.name = 'up';
    upCategory.audioPath = this.sndPath + "up.ogg";
    upCategory.images = [this.imgPath + "up.jpg"];
    downCategory.pairCategory = upCategory;
    upCategory.pairCategory = downCategory;
    this.activityItems.push(downCategory);
    this.activityItems.push(upCategory);
    // CRYING / LAUGHING
    let cryingCategory = {}, laughingCategory = {};
    cryingCategory.name = 'crying';
    cryingCategory.audioPath = this.sndPath + "crying.ogg";
    cryingCategory.images = [this.imgPath + "crying.jpg"];
    laughingCategory.name = 'laughing';
    laughingCategory.audioPath = this.sndPath + "laughing.ogg";
    laughingCategory.images = [this.imgPath + "laughing.jpg"];
    cryingCategory.pairCategory = laughingCategory;
    laughingCategory.pairCategory = cryingCategory;
    this.activityItems.push(cryingCategory);
    this.activityItems.push(laughingCategory);
    // DAY / NIGHT
    let dayCategory = {}, nightCategory = {};
    dayCategory.name = 'day';
    dayCategory.audioPath = this.sndPath + "day.ogg";
    dayCategory.images = [this.imgPath + "day.jpg"];
    nightCategory.name = 'night';
    nightCategory.audioPath = this.sndPath + "night.ogg";
    nightCategory.images = [this.imgPath + "night.jpg"];
    dayCategory.pairCategory = nightCategory;
    nightCategory.pairCategory = dayCategory;
    this.activityItems.push(dayCategory);
    this.activityItems.push(nightCategory);
    // OPEN / CLOSED
    let openCategory = {}, closedCategory = {};
    openCategory.name = 'open';
    openCategory.audioPath = this.sndPath + "open.ogg";
    openCategory.images = [this.imgPath + "open.jpg"];
    closedCategory.name = 'closed';
    closedCategory.audioPath = this.sndPath + "closed.ogg";
    closedCategory.images = [this.imgPath + "closed.jpg"];
    openCategory.pairCategory = closedCategory;
    closedCategory.pairCategory = openCategory;
    this.activityItems.push(openCategory);
    this.activityItems.push(closedCategory);
    // RIGHT / LEFT
    let rightCategory = {}, leftCategory = {};
    rightCategory.name = 'right';
    rightCategory.audioPath = this.sndPath + "right.ogg";
    rightCategory.images = [this.imgPath + "right.jpg"];
    leftCategory.name = 'left';
    leftCategory.audioPath = this.sndPath + "left.ogg";
    leftCategory.images = [this.imgPath + "left.jpg"];
    rightCategory.pairCategory = leftCategory;
    leftCategory.pairCategory = rightCategory;
    this.activityItems.push(rightCategory);
    this.activityItems.push(leftCategory);
    // YOUNG / OLD
    let youngCategory = {}, oldCategory = {};
    youngCategory.name = 'young';
    youngCategory.audioPath = this.sndPath + "young.ogg";
    youngCategory.images = [this.imgPath + "young.jpg"];
    oldCategory.name = 'old';
    oldCategory.audioPath = this.sndPath + "old.ogg";
    oldCategory.images = [this.imgPath + "old.jpg"];
    youngCategory.pairCategory = oldCategory;
    oldCategory.pairCategory = youngCategory;
    this.activityItems.push(youngCategory);
    this.activityItems.push(oldCategory);
    // TALL / SHORT
    let tallCategory = {}, shortCategory = {};
    tallCategory.name = 'tall';
    tallCategory.audioPath = this.sndPath + "tall.ogg";
    tallCategory.images = [this.imgPath + "tall.jpg"];
    shortCategory.name = 'short';
    shortCategory.audioPath = this.sndPath + "short.ogg";
    shortCategory.images = [this.imgPath + "short.jpg"];
    tallCategory.pairCategory = shortCategory;
    shortCategory.pairCategory = tallCategory;
    this.activityItems.push(tallCategory);
    this.activityItems.push(shortCategory);
    // WET / DRY
    let wetCategory = {}, dryCategory = {};
    wetCategory.name = 'wet';
    wetCategory.audioPath = this.sndPath + "wet.ogg";
    wetCategory.images = [this.imgPath + "wet.jpg"];
    dryCategory.name = 'dry';
    dryCategory.audioPath = this.sndPath + "dry.ogg";
    dryCategory.images = [this.imgPath + "dry.jpg"];
    wetCategory.pairCategory = dryCategory;
    dryCategory.pairCategory = wetCategory;
    this.activityItems.push(wetCategory);
    this.activityItems.push(dryCategory);
    // CLEAN / DIRTY
    let cleanCategory = {}, dirtyCategory = {};
    cleanCategory.name = 'clean';
    cleanCategory.audioPath = this.sndPath + "clean.ogg";
    cleanCategory.images = [this.imgPath + "clean.jpg"];
    dirtyCategory.name = 'dirty';
    dirtyCategory.audioPath = this.sndPath + "dirty.ogg";
    dirtyCategory.images = [this.imgPath + "dirty.jpg"];
    cleanCategory.pairCategory = dirtyCategory;
    dirtyCategory.pairCategory = cleanCategory;
    this.activityItems.push(cleanCategory);
    this.activityItems.push(dirtyCategory);
    // GOOD / BAD
    let goodCategory = {}, badCategory = {};
    goodCategory.name = 'good';
    goodCategory.audioPath = this.sndPath + "good.ogg";
    goodCategory.images = [this.imgPath + "good.jpg"];
    badCategory.name = 'bad';
    badCategory.audioPath = this.sndPath + "bad.ogg";
    badCategory.images = [this.imgPath + "bad.jpg"];
    goodCategory.pairCategory = badCategory;
    badCategory.pairCategory = goodCategory;
    this.activityItems.push(goodCategory);
    this.activityItems.push(badCategory);
    // PUSH / PULL
    let pushCategory = {}, pullCategory = {};
    pushCategory.name = 'push';
    pushCategory.audioPath = this.sndPath + "push.ogg";
    pushCategory.images = [this.imgPath + "push.jpg"];
    pullCategory.name = 'pull';
    pullCategory.audioPath = this.sndPath + "pull.ogg";
    pullCategory.images = [this.imgPath + "pull.jpg"];
    pushCategory.pairCategory = pullCategory;
    pullCategory.pairCategory = pushCategory;
    this.activityItems.push(pushCategory);
    this.activityItems.push(pullCategory);
    // ON / OFF
    let onCategory = {}, offCategory = {};
    onCategory.name = 'on';
    onCategory.audioPath = this.sndPath + "on.ogg";
    onCategory.images = [this.imgPath + "on.jpg"];
    offCategory.name = 'off';
    offCategory.audioPath = this.sndPath + "off.ogg";
    offCategory.images = [this.imgPath + "off.jpg"];
    onCategory.pairCategory = offCategory;
    offCategory.pairCategory = onCategory;
    this.activityItems.push(onCategory);
    this.activityItems.push(offCategory);
  }

  generateChallengeItems = () => {
    // generate answer options
    this.answerOptionValues = this.getAnswerOptions(); // [true, false, (false)..]
  
    this.activitySoundList.push('../sounds/show.ogg');
  
    // extract the first activityItem
    let selectedActivityItem1 = this.activityItems[Math.floor((Math.random() * this.activityItems.length))];
    this.setupAnswer(this.activityObjElemArray[0], selectedActivityItem1);
  
    // extract the second activityItem from the pairCategory of the first item
    let selectedActivityItem2 = selectedActivityItem1.pairCategory;
    this.setupAnswer(this.activityObjElemArray[1], selectedActivityItem2);
  
    this.playShowItemAudio();
  }
  
  setupAnswer = (objElem, selectedActivityItem) => {
    // extract the image to display for this first activity item
    let imagePath1 = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
    // randomly determine whether this is the correct answer or not
    let isCorrectAnswer = extractRandomEntryAndSplice(this.answerOptionValues);
    if (isCorrectAnswer) {
      this.activitySoundList.push(selectedActivityItem.audioPath);
      this.challengeCorrectItemName = selectedActivityItem.name;
    }
    objElem.css('background-image', 'url(' + imagePath1 + ')');
    objElem.off('mousedown').mousedown(() => {
      this.checkValidAnswer(isCorrectAnswer);
    });
  }
}
