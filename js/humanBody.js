import { ActivityCore } from './activityCore.js'

// on page load
jQuery(() => {
  new HumanBody();
});

class HumanBody extends ActivityCore {
  constructor() {
    super();
  }

  prevRnd;
  activityObjElemArray = [];

  activityItems;
  initActivityItems = () => {
  const sndPath = "../sounds/humanBody/";
   this.activityItems = [
            {name: 'head', audioPath: sndPath + 'head.ogg'},
            {name: 'shoulders', audioPath: sndPath + 'shoulders.ogg'},
            {name: 'arms', audioPath: sndPath + 'arms.ogg'},
            {name: 'palms', audioPath: sndPath + 'palms.ogg'},
            {name: 'chest', audioPath: sndPath + 'chest.ogg'},
            {name: 'belly', audioPath: sndPath + 'belly.ogg'},
            {name: 'legs', audioPath: sndPath + 'legs.ogg'},
            {name: 'knees', audioPath: sndPath + 'knees.ogg'},
    ]
  
    this.activityItems.forEach(item => this.activityObjElemArray.push($('svg[' + item.name + '-attr]')));
  }

  generateChallengeItems = () => {
    let validItemIndex;
    do {
      validItemIndex = Math.floor((Math.random() * this.activityItems.length));
    } while (validItemIndex === this.prevRnd);
    this.prevRnd = validItemIndex;
  
    this.activitySoundList.push('../sounds/show.ogg');
    const correctItem = this.activityItems[validItemIndex];
    this.activitySoundList.push(correctItem.audioPath);
    this.challengeCorrectItemName = correctItem.name;
  
   let objInstance = this;
    // unbind previously bound mousedown handler; bind the mousedown event function
    for (const [i, svgElem] of this.activityObjElemArray.entries()) {
      svgElem.off('mousedown').mousedown(() => {
        objInstance.checkValidAnswer(i === validItemIndex);
      });
    }
  
    this.playShowItemAudio();
  }
}