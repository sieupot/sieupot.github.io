import { ActivityEngine } from './activityEngine.js'

// on page load
jQuery(() => {
  new SpatialPositioning();
});

class SpatialPositioning extends ActivityEngine {
  constructor() {
    super();

    this.activityObjElemArray.push(jQuery('#svgContainer1Id'));
    this.activityObjElemArray.push(jQuery('#svgContainer2Id'));
  }

  activityObjElemArray = [];

  activityItems;
  initActivityItems = () => {
    let sPActivityItems;
    if (actionsType === 1) {
      sPActivityItems = new SP1ActivityItems();
    } else if (actionsType === 2) {
      sPActivityItems = new SP2ActivityItems();
    } else {
      alert("ERROR: no items class defind");
    }
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

class SoundItem {
  /**
   *
   * @param soundBaseFileName
   * @param soundArticle: Indefinite, Definite, Possessive
   * @param sharedSound: some sounds are shared by the spatial positioning activities
   */
  constructor(sndPath, soundBaseFileName, soundArticle = '', sharedSound = false) {
    this.soundPath = `${sharedSound ? this.sndCommonPath : sndPath}${soundBaseFileName}${soundArticle}.ogg`;
  }

  sndCommonPath = "../sounds/common/";
}

class ActionsSoundItems {
  static aboveSoundItem = new SoundItem(null, 'above', '', true);
  static beforeSoundItem = new SoundItem(null, 'before', '', true);
  static behindSoundItem = new SoundItem(null, 'behind', '', true);
  static inSoundItem = new SoundItem(null, 'in', '', true);
  static nearSoundItem = new SoundItem(null, 'near', '', true);
  static underSoundItem = new SoundItem(null, 'under', '', true);

  static sndPath1 = "../sounds/spatialPositioning/1/";
  static dogArtDSoundItem = new SoundItem(this.sndPath1, 'dog', 'D');
  static doghouseArtISoundItem = new SoundItem(this.sndPath1, 'doghouse', 'I');
  static doghouseArtPSoundItem = new SoundItem(this.sndPath1, 'doghouse', 'P');

  static sndPath2 = "../sounds/spatialPositioning/2/";
  static andSoundItem = new SoundItem(this.sndPath2, 'and');
  static betweenSoundItem = new SoundItem(this.sndPath2, 'between');
  static teddyBearArtDSoundItem = new SoundItem(this.sndPath2, 'teddyBear', 'D');
  static teddyBearArtISoundItem = new SoundItem(this.sndPath2, 'teddyBear', 'I');
  static boxArtISoundItem = new SoundItem(this.sndPath2, 'box', 'I');
  static boxArtDSoundItem = new SoundItem(this.sndPath2, 'box', 'D');
  static boxArtPSoundItem = new SoundItem(this.sndPath2, 'box', 'P');
  static chairArtISoundItem = new SoundItem(this.sndPath2, 'chair', 'I');
  static chairArtPSoundItem = new SoundItem(this.sndPath2, 'chair', 'P');
  static closetArtISoundItem = new SoundItem(this.sndPath2, 'closet', 'I');
  static closetArtPSoundItem = new SoundItem(this.sndPath2, 'closet', 'P');
  static tableArtISoundItem = new SoundItem(this.sndPath2, 'table', 'I');
  static tableArtPSoundItem = new SoundItem(this.sndPath2, 'table', 'P');

}

class SP1ActivityItems{
  constructor() {
    this.initActivityItems();
  }

  imgPath = "../images/spatialPositioning/1/";

  activityItems;
  initActivityItems = () => {
    this.activityItems = [];

    // DOG in DOGHOUSE
    let dogInDoghouse = {};
    dogInDoghouse.name = 'dogInDoghouse';
    dogInDoghouse.images = [this.imgPath + "dog_In_Doghouse.svg"];
    dogInDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.doghouseArtISoundItem.soundPath];
    this.activityItems.push(dogInDoghouse);

    // DOG on DOGHOUSE
    let dogOnDoghouse = {};
    dogOnDoghouse.name = 'dogOnDoghouse';
    dogOnDoghouse.images = [this.imgPath + "dog_On_Doghouse.svg"];
    dogOnDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.doghouseArtISoundItem.soundPath];
    this.activityItems.push(dogOnDoghouse);

    // DOG behind DOGHOUSE
    let dogBehindDoghouse = {};
    dogBehindDoghouse.name = 'dogBehindDoghouse';
    dogBehindDoghouse.images = [this.imgPath + "dog_Behind_Doghouse.svg"];
    dogBehindDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.doghouseArtPSoundItem.soundPath];
    this.activityItems.push(dogBehindDoghouse);

    // DOG before DOGHOUSE
    let dogBeforeDoghouse = {};
    dogBeforeDoghouse.name = 'dogBeforeDoghouse';
    dogBeforeDoghouse.images = [this.imgPath + "dog_Before_Doghouse.svg"];
    dogBeforeDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.doghouseArtPSoundItem.soundPath];
    this.activityItems.push(dogBeforeDoghouse);

    // DOG under DOGHOUSE
    let dogUnderDoghouse = {};
    dogUnderDoghouse.name = 'dogUnderDoghouse';
    dogUnderDoghouse.images = [this.imgPath + "dog_Under_Doghouse.svg"];
    dogUnderDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.doghouseArtISoundItem.soundPath];
    this.activityItems.push(dogUnderDoghouse);

    // DOG near DOGHOUSE
    let dogNearDoghouse = {};
    dogNearDoghouse.name = 'dogNearDoghouse';
    dogNearDoghouse.images = [this.imgPath + "dog_Near_Doghouse.svg"];
    dogNearDoghouse.soundItems = [ActionsSoundItems.dogArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.doghouseArtISoundItem.soundPath];
    this.activityItems.push(dogNearDoghouse);
  }
}

class SP2ActivityItems{
  constructor() {
    this.initActivityItems();
  }

  imgPath = "../images/spatialPositioning/2/";

  activityItems;
  initActivityItems = () => {
    this.activityItems = [];

    // BEAR between BOX and CHAIR
    let boxBearChair = {};
    boxBearChair.name = 'bearBetweenBoxAndChair';
    boxBearChair.images = [this.imgPath + "box_bear_chair.svg", this.imgPath + "chair_bear_box.svg"];
    boxBearChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(boxBearChair);
    // BEAR between BOX and CLOSET
    let boxBearCloset = {};
    boxBearCloset.name = 'bearBetweenBoxAndCloset';
    boxBearCloset.images = [this.imgPath + "box_bear_closet.svg", this.imgPath + "closet_bear_box.svg"];
    boxBearCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(boxBearCloset);
    // BEAR between BOX and TABLE
    let boxBearTable = {};
    boxBearTable.name = 'bearBetweenBoxAndTable';
    boxBearTable.images = [this.imgPath + "box_bear_table.svg", this.imgPath + "table_bear_box.svg"];
    boxBearTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(boxBearTable);
    // BEAR between CHAIR and CLOSET
    let chairBearCloset = {};
    chairBearCloset.name = 'bearBetweenChairAndCloset';
    chairBearCloset.images = [this.imgPath + "chair_bear_closet.svg", this.imgPath + "closet_bear_chair.svg"];
    chairBearCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(chairBearCloset);
    // BEAR between CHAIR and TABLE
    let chairBearTable = {};
    chairBearTable.name = 'bearBetweenChairAndTable';
    chairBearTable.images = [this.imgPath + "chair_bear_table.svg", this.imgPath + "table_bear_chair.svg"];
    chairBearTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(chairBearTable);
    // BEAR between CLOSET and TABLE
    let closetBearTable = {};
    closetBearTable.name = 'bearBetweenClosetAndTable';
    closetBearTable.images = [this.imgPath + "closet_bear_table.svg", this.imgPath + "table_bear_closet.svg"];
    closetBearTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(closetBearTable);

    // BOX between CHAIR and CLOSET
    let chairBoxCloset = {};
    chairBoxCloset.name = 'boxBetweenChairAndCloset';
    chairBoxCloset.images = [this.imgPath + "chair_box_closet.svg", this.imgPath + "closet_box_chair.svg"];
    chairBoxCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(chairBoxCloset);
    // BOX between CHAIR and TABLE
    let chairBoxTable = {};
    chairBoxTable.name = 'boxBetweenChairAndTable';
    chairBoxTable.images = [this.imgPath + "chair_box_table.svg", this.imgPath + "table_box_chair.svg"];
    chairBoxTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(chairBoxTable);
    // BOX between CHAIR and BEAR
    let chairBoxBear = {};
    chairBoxBear.name = 'boxBetweenChairAndTeddyBear';
    chairBoxBear.images = [this.imgPath + "chair_box_teddyBear.svg", this.imgPath + "teddyBear_box_chair.svg"];
    chairBoxBear.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.teddyBearArtISoundItem.soundPath];
    this.activityItems.push(chairBoxBear);
    // BOX between CLOSET and TABLE
    let closetBoxTable = {};
    closetBoxTable.name = 'boxBetweenClosetAndTable';
    closetBoxTable.images = [this.imgPath + "closet_box_table.svg", this.imgPath + "table_box_closet.svg"];
    closetBoxTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(closetBoxTable);
    // BOX between CLOSET and BEAR
    let closetBoxBear = {};
    closetBoxBear.name = 'boxBetweenClosetAndTeddyBear';
    closetBoxBear.images = [this.imgPath + "closet_box_teddyBear.svg", this.imgPath + "teddyBear_box_closet.svg"];
    closetBoxBear.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.teddyBearArtISoundItem.soundPath];
    this.activityItems.push(closetBoxBear);
    // BOX between table and BEAR
    let tableBoxBear = {};
    tableBoxBear.name = 'boxBetweenTableAndTeddyBear';
    tableBoxBear.images = [this.imgPath + "table_box_teddyBear.svg", this.imgPath + "teddyBear_box_table.svg"];
    tableBoxBear.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.betweenSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath, ActionsSoundItems.andSoundItem.soundPath, ActionsSoundItems.teddyBearArtISoundItem.soundPath];
    this.activityItems.push(tableBoxBear);

    // BOX before CHAIR
    let boxBeforeChair = {};
    boxBeforeChair.name = 'boxBeforeChair';
    boxBeforeChair.images = [this.imgPath + "box_Before_Chair.svg"];
    boxBeforeChair.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.chairArtPSoundItem.soundPath];
    this.activityItems.push(boxBeforeChair);
    // BOX before CLOSET
    let boxBeforeCloset = {};
    boxBeforeCloset.name = 'boxBeforeCloset';
    boxBeforeCloset.images = [this.imgPath + "box_Before_Closet.svg"];
    boxBeforeCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.closetArtPSoundItem.soundPath];
    this.activityItems.push(boxBeforeCloset);
    // BOX before TABLE
    let boxBeforeTable = {};
    boxBeforeTable.name = 'boxBeforeTable';
    boxBeforeTable.images = [this.imgPath + "box_Before_Table.svg"];
    boxBeforeTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.tableArtPSoundItem.soundPath];
    this.activityItems.push(boxBeforeTable);

    // BOX behind CHAIR
    let boxBehindChair = {};
    boxBehindChair.name = 'boxBehindChair';
    boxBehindChair.images = [this.imgPath + "box_Behind_Chair.svg"];
    boxBehindChair.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.chairArtPSoundItem.soundPath];
    this.activityItems.push(boxBehindChair);
    // BOX behind CLOSET
    let boxBehindCloset = {};
    boxBehindCloset.name = 'boxBehindCloset';
    boxBehindCloset.images = [this.imgPath + "box_Behind_Closet.svg"];
    boxBehindCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.closetArtPSoundItem.soundPath];
    this.activityItems.push(boxBehindCloset);
    // BOX behind TABLE
    let boxBehindTable = {};
    boxBehindTable.name = 'boxBehindTable';
    boxBehindTable.images = [this.imgPath + "box_Behind_Table.svg"];
    boxBehindTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.tableArtPSoundItem.soundPath];
    this.activityItems.push(boxBehindTable);

    // BOX in CLOSET
    let boxInCloset = {};
    boxInCloset.name = 'boxInCloset';
    boxInCloset.images = [this.imgPath + "box_In_Closet.svg"];
    boxInCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(boxInCloset);
    // BEAR in CLOSET
    let bearInCloset = {};
    bearInCloset.name = 'teddyBearInCloset';
    bearInCloset.images = [this.imgPath + "teddyBear_In_Closet.svg"];
    bearInCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(bearInCloset);
    // BEAR in BOX
    let bearInBox = {};
    bearInBox.name = 'teddyBearInBox';
    bearInBox.images = [this.imgPath + "teddyBear_In_Box.svg"];
    bearInBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath];
    this.activityItems.push(bearInBox);

    // BOX near CHAIR
    let boxNearChair = {};
    boxNearChair.name = 'boxNearChair';
    boxNearChair.images = [this.imgPath + "box_Near_Chair.svg"];
    boxNearChair.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(boxNearChair);
    // BOX near CLOSET
    let boxNearCloset = {};
    boxNearCloset.name = 'boxNearCloset';
    boxNearCloset.images = [this.imgPath + "box_Near_Closet.svg"];
    boxNearCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(boxNearCloset);
    // BOX near TABLE
    let boxNearTable = {};
    boxNearTable.name = 'boxNearTable';
    boxNearTable.images = [this.imgPath + "box_Near_Table.svg"];
    boxNearTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(boxNearTable);

    // BOX on CHAIR
    let boxOnChair = {};
    boxOnChair.name = 'boxOnChair';
    boxOnChair.images = [this.imgPath + "box_On_Chair.svg"];
    boxOnChair.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(boxOnChair);
    // BOX on CLOSET
    let boxOnCloset = {};
    boxOnCloset.name = 'boxOnCloset';
    boxOnCloset.images = [this.imgPath + "box_On_Closet.svg"];
    boxOnCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(boxOnCloset);
    // BOX on TABLE
    let boxOnTable = {};
    boxOnTable.name = 'boxOnTable';
    boxOnTable.images = [this.imgPath + "box_On_Table.svg"];
    boxOnTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(boxOnTable);

    // BOX under CHAIR
    let boxUnderChair = {};
    boxUnderChair.name = 'boxUnderChair';
    boxUnderChair.images = [this.imgPath + "box_Under_Chair.svg"];
    boxUnderChair.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(boxUnderChair);
    // BOX under CLOSET
    let boxUnderCloset = {};
    boxUnderCloset.name = 'boxUnderCloset';
    boxUnderCloset.images = [this.imgPath + "box_Under_Closet.svg"];
    boxUnderCloset.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(boxUnderCloset);
    // BOX under TABLE
    let boxUnderTable = {};
    boxUnderTable.name = 'boxUnderTable';
    boxUnderTable.images = [this.imgPath + "box_Under_Table.svg"];
    boxUnderTable.soundItems = [ActionsSoundItems.boxArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(boxUnderTable);

    // BEAR before BOX
    let bearBeforeBox = {};
    bearBeforeBox.name = 'teddyBearBeforeBox';
    bearBeforeBox.images = [this.imgPath + "teddyBear_Before_Box.svg"];
    bearBeforeBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.boxArtPSoundItem.soundPath];
    this.activityItems.push(bearBeforeBox);
    // BEAR before CHAIR
    let bearBeforeChair = {};
    bearBeforeChair.name = 'teddyBearBeforeChair';
    bearBeforeChair.images = [this.imgPath + "teddyBear_Before_Chair.svg"];
    bearBeforeChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.chairArtPSoundItem.soundPath];
    this.activityItems.push(bearBeforeChair);
    // BEAR before CLOSET
    let bearBeforeCloset = {};
    bearBeforeCloset.name = 'teddyBearBeforeCloset';
    bearBeforeCloset.images = [this.imgPath + "teddyBear_Before_Closet.svg"];
    bearBeforeCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.closetArtPSoundItem.soundPath];
    this.activityItems.push(bearBeforeCloset);
    // BEAR before TABLE
    let bearBeforeTable = {};
    bearBeforeTable.name = 'teddyBearBeforeTable';
    bearBeforeTable.images = [this.imgPath + "teddyBear_Before_Table.svg"];
    bearBeforeTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.beforeSoundItem.soundPath, ActionsSoundItems.tableArtPSoundItem.soundPath];
    this.activityItems.push(bearBeforeTable);

    // BEAR behind BOX
    let bearBehindBox = {};
    bearBehindBox.name = 'teddyBearBehindBox';
    bearBehindBox.images = [this.imgPath + "teddyBear_Behind_Box.svg"];
    bearBehindBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.boxArtPSoundItem.soundPath];
    this.activityItems.push(bearBehindBox);
    // BEAR behind CHAIR
    let bearBehindChair = {};
    bearBehindChair.name = 'teddyBearBehindChair';
    bearBehindChair.images = [this.imgPath + "teddyBear_Behind_Chair.svg"];
    bearBehindChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.chairArtPSoundItem.soundPath];
    this.activityItems.push(bearBehindChair);
    // BEAR behind CLOSET
    let bearBehindCloset = {};
    bearBehindCloset.name = 'teddyBearBehindCloset';
    bearBehindCloset.images = [this.imgPath + "teddyBear_Behind_Closet.svg"];
    bearBehindCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.closetArtPSoundItem.soundPath];
    this.activityItems.push(bearBehindCloset);
    // BEAR behind TABLE
    let bearBehindTable = {};
    bearBehindTable.name = 'teddyBearBehindTable';
    bearBehindTable.images = [this.imgPath + "teddyBear_Behind_Table.svg"];
    bearBehindTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.behindSoundItem.soundPath, ActionsSoundItems.tableArtPSoundItem.soundPath];
    this.activityItems.push(bearBehindTable);

    // BEAR near BOX
    let bearNearBox = {};
    bearNearBox.name = 'teddyBearNearBox';
    bearNearBox.images = [this.imgPath + "teddyBear_Near_Box.svg"];
    bearNearBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath];
    this.activityItems.push(bearNearBox);
    // BEAR near CHAIR
    let bearNearChair = {};
    bearNearChair.name = 'teddyBearNearChair';
    bearNearChair.images = [this.imgPath + "teddyBear_Near_Chair.svg"];
    bearNearChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(bearNearChair);
    // BEAR near CLOSET
    let bearNearCloset = {};
    bearNearCloset.name = 'teddyBearNearCloset';
    bearNearCloset.images = [this.imgPath + "teddyBear_Near_Closet.svg"];
    bearNearCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(bearNearCloset);
    // BEAR near TABLE
    let bearNearTable = {};
    bearNearTable.name = 'teddyBearNearTable';
    bearNearTable.images = [this.imgPath + "teddyBear_Near_Table.svg"];
    bearNearTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.nearSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(bearNearTable);

    // BEAR on BOX
    let bearOnBox = {};
    bearOnBox.name = 'teddyBearOnBox';
    bearOnBox.images = [this.imgPath + "teddyBear_On_Box.svg"];
    bearOnBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath];
    this.activityItems.push(bearOnBox);
    // BEAR on CHAIR
    let bearOnChair = {};
    bearOnChair.name = 'teddyBearOnChair';
    bearOnChair.images = [this.imgPath + "teddyBear_On_Chair.svg"];
    bearOnChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(bearOnChair);
    // BEAR on CLOSET
    let bearOnCloset = {};
    bearOnCloset.name = 'teddyBearOnCloset';
    bearOnCloset.images = [this.imgPath + "teddyBear_On_Closet.svg"];
    bearOnCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(bearOnCloset);
    // BEAR on TABLE
    let bearOnTable = {};
    bearOnTable.name = 'teddyBearOnTable';
    bearOnTable.images = [this.imgPath + "teddyBear_On_Table.svg"];
    bearOnTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(bearOnTable);

    // BEAR under BOX
    let bearUnderBox = {};
    bearUnderBox.name = 'teddyBearUnderBox';
    bearUnderBox.images = [this.imgPath + "teddyBear_Under_Box.svg"];
    bearUnderBox.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.boxArtISoundItem.soundPath];
    this.activityItems.push(bearUnderBox);
    // BEAR under CHAIR
    let bearUnderChair = {};
    bearUnderChair.name = 'teddyBearUnderChair';
    bearUnderChair.images = [this.imgPath + "teddyBear_Under_Chair.svg"];
    bearUnderChair.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.chairArtISoundItem.soundPath];
    this.activityItems.push(bearUnderChair);
    // BEAR under CLOSET
    let bearUnderCloset = {};
    bearUnderCloset.name = 'teddyBearUnderCloset';
    bearUnderCloset.images = [this.imgPath + "teddyBear_Under_Closet.svg"];
    bearUnderCloset.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.closetArtISoundItem.soundPath];
    this.activityItems.push(bearUnderCloset);
    // BEAR under TABLE
    let bearUnderTable = {};
    bearUnderTable.name = 'teddyBearUnderTable';
    bearUnderTable.images = [this.imgPath + "teddyBear_Under_Table.svg"];
    bearUnderTable.soundItems = [ActionsSoundItems.teddyBearArtDSoundItem.soundPath, ActionsSoundItems.underSoundItem.soundPath, ActionsSoundItems.tableArtISoundItem.soundPath];
    this.activityItems.push(bearUnderTable);
  }
}