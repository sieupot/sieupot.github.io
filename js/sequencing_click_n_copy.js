import { ActivityEngine } from './activityEngine.js'

// on page load
jQuery(() => {
  new SequencingClickNCopy();
});

class SequencingClickNCopy extends ActivityEngine {
  constructor() {
    super();

    this.modalPanel = jQuery('#dialogDiv');
    this.resultDivElem = jQuery('div.result');

    let objInstance = this;
    $( "div.start-activity" ).bind('mousedown', function() {
      objInstance.startActivity();
    });

    // show the start icon and let the user manually start the activity
    this.resultDivElem.fadeIn(300);
    this.modalPanel.dialog(this.dialogOptions);
  }

  okClicksNb = 0;
  selectedActivitySqLength = 0;
  destContainers = jQuery('#destContainersId');
  srcContainers = jQuery('#srcContainersId');

  activityItems;
  imgPath = "../images/sequencing/";
  sndPath = "../sounds/sequencing/";
  initActivityItems = () => {
    this.activityItems = [];

    // CATERPILLAR
    let caterpillarSq = {name: 'caterpillar', items: [{index: 1, imagePath: `${this.imgPath}caterpillar1.jpg`},
                                                      {index: 2, imagePath: `${this.imgPath}caterpillar2.jpg`},
                                                      {index: 3, imagePath: `${this.imgPath}caterpillar3.jpg`}]};
    this.activityItems.push(caterpillarSq);

    // CHICKEN
    let chickenSq = {name: 'chicken', items: [{index: 1, imagePath: `${this.imgPath}chicken1.jpg`},
                                              {index: 2, imagePath: `${this.imgPath}chicken2.jpg`},
                                              {index: 3, imagePath: `${this.imgPath}chicken3.jpg`}]};
    this.activityItems.push(chickenSq);

    // CUBES
    let cubesSq = {name: 'cubes', items: [{index: 1, imagePath: `${this.imgPath}cubes1.jpg`},
                                          {index: 2, imagePath: `${this.imgPath}cubes2.jpg`},
                                          {index: 3, imagePath: `${this.imgPath}cubes3.jpg`}]};
    this. activityItems.push(cubesSq);

    // DRAWN BEAR
    let drawnBearSq = {name: 'drawBear', items: [{index: 1, imagePath: `${this.imgPath}drawnBear1.jpg`},
                                                 {index: 2, imagePath: `${this.imgPath}drawnBear2.jpg`},
                                                 {index: 3, imagePath: `${this.imgPath}drawnBear3.jpg`}]};
    this.activityItems.push(drawnBearSq);

    // HOUSE
    let houseSq = {name: 'buildHouse', items: [{index: 1, imagePath: `${this.imgPath}house1.jpg`},
                                               {index: 2, imagePath: `${this.imgPath}house2.jpg`},
                                               {index: 3, imagePath: `${this.imgPath}house3.jpg`},
                                               {index: 4, imagePath: `${this.imgPath}house4.jpg`},
                                               {index: 5, imagePath: `${this.imgPath}house5.jpg`},
                                               {index: 6, imagePath: `${this.imgPath}house6.jpg`}]};
    this.activityItems.push(houseSq);

    // PLANT
    let plantSq = {name: 'growPlant', items: [{index: 1, imagePath: `${this.imgPath}plant1.jpg`},
                                              {index: 2, imagePath: `${this.imgPath}plant2.jpg`},
                                              {index: 3, imagePath: `${this.imgPath}plant3.jpg`}]};
    this.activityItems.push(plantSq);

    // SEASON TREE
    let seasonTreeSq = {name: 'seasonTree', items: [{index: 1, imagePath: `${this.imgPath}seasonTree1.jpg`},
                                                    {index: 2, imagePath: `${this.imgPath}seasonTree2.jpg`},
                                                    {index: 3, imagePath: `${this.imgPath}seasonTree3.jpg`},
                                                    {index: 4, imagePath: `${this.imgPath}seasonTree4.jpg`},
                                                    {index: 5, imagePath: `${this.imgPath}seasonTree5.jpg`},
                                                    {index: 6, imagePath: `${this.imgPath}seasonTree6.jpg`}]};
    this.activityItems.push(seasonTreeSq);

    // WAKEUP
    let wakeupSq = {name: 'wakeup', items: [{index: 1, imagePath: `${this.imgPath}wakeup1.jpg`},
                                            {index: 2, imagePath: `${this.imgPath}wakeup2.jpg`},
                                            {index: 3, imagePath: `${this.imgPath}wakeup3.jpg`},
                                            {index: 4, imagePath: `${this.imgPath}wakeup4.jpg`},
                                            {index: 5, imagePath: `${this.imgPath}wakeup5.jpg`},
                                            {index: 6, imagePath: `${this.imgPath}wakeup6.jpg`}]};
    this.activityItems.push(wakeupSq);
  }

  generateDestHtmlElem = (index, nbItems) => {
    let assistAudioPath = "../sounds/sequencing/";
    switch (index) {
      case 1:
        // first
        assistAudioPath += 'whatComesFirst.ogg';
        break;
      case (nbItems):
        // last
        assistAudioPath += 'whatComesLast.ogg';
        break;
      default:
        // then
        assistAudioPath += 'whatComesThen.ogg';
        break;
    }
  
    let destHtmlElem = document.createElement('div');
    destHtmlElem.id = `dest${index}`;
    destHtmlElem.style.cursor = 'help';
    destHtmlElem.classList.add('activity-item', 'destination');
    destHtmlElem.onmousedown = function () {
      let assistAudio = new Audio(assistAudioPath);
      assistAudio.play();
    };
    this.destContainers.append(destHtmlElem);
  }
  
  generateClickableHtmlElem = (index, imagePath) => {
    const clickableHtmlElem = `<div id="clickable${index}" class="pointer-cursor click-item" style="background-image: url('${imagePath}');" canBeClicked="true">
          </div>`;
   this.srcContainers.append(clickableHtmlElem);

    let objInstance = this;
    $( `#clickable${index}` ).bind( "mousedown", function(ev) {
      objInstance.itemClicked(ev);
    });
  }
  
  generateChallengeItems = () => {
    // remove previous HTML content from the destContainersId div (new content will be generated below)
    removeContent(this.destContainers.attr('id'));
    removeContent(this.srcContainers.attr('id'));
  
    this.activitySoundList.push(`${this.sndPath}sequence.ogg`);
  
    // extract the activity sequence
    const indexAct = Math.floor((Math.random() * this.activityItems.length));
    const selectedActivitySq = this.activityItems[indexAct];
  
    this.challengeCorrectItemName = selectedActivitySq.name;
  
    const selectedActivitySqItems = Object.assign([], selectedActivitySq.items); // clone the array, or else the extractRandomEntryAndSplice will empty the source array
    for (let index in selectedActivitySqItems) {
      this.generateDestHtmlElem(parseInt(index) + 1, selectedActivitySqItems.length);
    }
    // set bg-color opacity of first element to 1, as if it's waiting to be populated
    jQuery('.activity-item:not(:has(> div)):first').addClass('done');
  
    this.selectedActivitySqLength = selectedActivitySqItems.length;
    this.okClicksNb = 1;
    while (selectedActivitySqItems.length > 0) { // length changed here in extractRandomEntryAndSplice(...) below
      const entryObj = extractRandomEntryAndSplice(selectedActivitySqItems);
  
      this.generateClickableHtmlElem(entryObj.index, entryObj.imagePath);
    }
  
    this.playShowItemAudio(false);
  }
  
  checkActivityProgress = () => {
    // no more clickable items?
    if (this.okClicksNb === this.selectedActivitySqLength) {
      this.checkValidAnswer(true);
    }
  }
  
  itemClicked = (ev) => {
    ev.preventDefault();
    const clickableElem = ev.target;
    let clickableElemJQ = $(clickableElem);
    if (clickableElemJQ && clickableElemJQ.attr('canbeclicked')) {
  
      // remove alphas from clickableId (i.e.: clickable1 -> 1, etc)
      const clickableElemIndex = parseInt(clickableElemJQ.attr('id').replace(/[^\d.-]/g, ''));
      if (clickableElemIndex === this.okClicksNb) {
        // don't allow source to be clickable anymore
        removeAttributes(clickableElem, 'canbeclicked');
        clickableElemJQ.unbind('mousedown').removeClass('pointer-cursor');
  
        // copy source object to dest container
        const destElem = document.getElementById(`dest${clickableElemIndex}`);
        const destContentElem = clickableElem.cloneNode(true);
        destContentElem.classList.remove('error-indicator');
        destContentElem.style.boxShadow = 'none';
        destContentElem.style.height = '75%';
        destContentElem.style.padding = 'unset';
        destContentElem.style.margin = 'unset';
        destContentElem.style.backgroundColor = 'transparent';
        destElem.appendChild(destContentElem);
        destElem.style.backgroundColor = 'rgb(205, 238, 200)';
        destElem.onmousedown = {};
        destElem.style.cursor = 'auto';
  
        // set bg-color opacity of first empty dest element to 1, as if it's waiting to be populated
        $('.activity-item:not(:has(> div)):first').addClass('done');
  
        // add counter on source image
        let indicatorNode = document.createElement('span');
        indicatorNode.innerHTML = `${clickableElemIndex}`;
        indicatorNode.classList.add('indicator');
        clickableElem.appendChild(indicatorNode);
  
        // flash success indicators and fade source panel
        clickableElemJQ.addClass('success-indicator post-click');
  
        this.checkActivityProgress();
        this.okClicksNb++;
      } else {
        this.modalPanel.dialog(this.dialogOptions);
        this.handleInvalidAnswer(false);
        // in order to have the animation of the error-indicator play after repeatedly clicking on this element
        clickableElemJQ.replaceWith(clickableElemJQ.clone(true).addClass('error-indicator'));
      }
    }
  }
}