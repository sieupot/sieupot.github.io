import { ActivityEngine } from './activityEngine.js'

// on page load
jQuery(() => {
  new HumanBodySimple();
});

class HumanBodySimple extends ActivityEngine {
  constructor() {
    super();

    let objInstance = this;
    // load dest resource
    $('#clickDestContainerId > svg').load(destImagePath, function () {
      Array.from(document.getElementsByClassName('covered')).forEach(function (item) {
        $(item).bind('mousedown', function (event) {
          event.stopPropagation();
          objInstance.validateChallenge(event);
        });
      });
    });
  }
  
  challengeItem;
  
  activityItems;
  initActivityItems = () => {
    let humanBodyActivityItems;
    if (humanBodyPart === 'head') {
      humanBodyActivityItems = new HeadActivityItems();
    } else if (humanBodyPart === 'body') {
      humanBodyActivityItems = new BodyActivityItems();
    } else {
      alert("ERROR: no items class defind");
    }
    this.activityItems = humanBodyActivityItems.activityItems;
  }

  generateChallengeItems = () => {
    // select the valid challenge item, save it to be checked later
    const validItemIndex = Math.floor((Math.random() * this.activityItems.length));
    this.challengeItem = this.activityItems[validItemIndex];
  
    this.activitySoundList = [];
    this.activitySoundList.push('../sounds/show.ogg');
    const correctItem = this.activityItems[validItemIndex];
    this.activitySoundList.push(correctItem.soundItem.soundPath);
  
    this.playShowItemAudio();
  }
  
  validateChallenge = (ev) => {
    let clickedElem = ev.currentTarget;
    this.checkValidAnswer(clickedElem.id === `gr_${this.challengeItem.name}`);
  }
}

class SoundItem {
  /**
   *
   * @param soundBaseFileName
   * @param soundArticle: Indefinite, Definite, Possessive
   */
  constructor(soundBaseFileName, soundArticle = '') {
    this.soundPath = `${this.sndPath}${soundBaseFileName}${soundArticle}.ogg`;
  }
  
  sndPath = "../sounds/humanBody/";
}

class BodyActivityItems {
  constructor() {
    this.initActivityItems();
  }

  activityItems;
  initActivityItems = () => {
    this.activityItems = [];

    // head
    let head = {};
    head.name = 'head';
    head.soundItem = new SoundItem('head');
    this.activityItems.push(head);

    // shoulders
    let shoulders = {};
    shoulders.name = 'shoulders';
    shoulders.soundItem = new SoundItem('shoulders');
    this.activityItems.push(shoulders);

    // chest
    let chest = {};
    chest.name = 'chest';
    chest.soundItem = new SoundItem('chest');
    this.activityItems.push(chest);

    // arms
    let arms = {};
    arms.name = 'arms';
    arms.soundItem = new SoundItem('arms');
    this.activityItems.push(arms);

    // palms
    let palms = {};
    palms.name = 'palms';
    palms.soundItem = new SoundItem('palms');
    this.activityItems.push(palms);

    // belly
    let belly = {};
    belly.name = 'belly';
    belly.soundItem = new SoundItem('belly');
    this.activityItems.push(belly);

    // legs
    let legs = {};
    legs.name = 'legs';
    legs.soundItem = new SoundItem('legs');
    this.activityItems.push(legs);

    // knees
    let knees = {};
    knees.name = 'knees';
    knees.soundItem = new SoundItem('knees');
    this.activityItems.push(knees);
  }
}

class HeadActivityItems {
  constructor() {
    this.initActivityItems();
  }

  activityItems;
  initActivityItems = () => {
    this.activityItems = [];

    // hair
    let hair = {};
    hair.name = 'hair';
    hair.soundItem = new SoundItem('hair', 'I');
    this.activityItems.push(hair);

    // eyeBrows
    let eyeBrows = {};
    eyeBrows.name = 'eyebrows';
    eyeBrows.soundItem = new SoundItem('eyebrows', 'I');
    this.activityItems.push(eyeBrows);

    // eyes
    let eyes = {};
    eyes.name = 'eyes';
    eyes.soundItem = new SoundItem('eyes', 'I');
    this.activityItems.push(eyes);

    // ears
    let ears = {};
    ears.name = 'ears';
    ears.soundItem = new SoundItem('ears', 'I');
    this.activityItems.push(ears);

    // nose
    let nose = {};
    nose.name = 'nose';
    nose.soundItem = new SoundItem('nose', 'I');
    this.activityItems.push(nose);

    // mouth
    let mouth = {};
    mouth.name = 'mouth';
    mouth.soundItem = new SoundItem('mouth', 'I');
      this.activityItems.push(mouth);
  }
}