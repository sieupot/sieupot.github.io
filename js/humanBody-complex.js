let prevRnd;
let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times
let userSelectedElem, challengeItem;
let currentActivityItems;

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

let clickSrcContainers = jQuery('#clickSrcContainersId');

const generateChallengeItems = () => {
  // load dest resource
  jQuery('#clickDestContainerId > svg').load(destImagePath, function () {
    Array.from(document.getElementsByClassName('covered')).forEach(function (item) {
      item.setAttribute('onmousedown', 'event.stopPropagation(); validateChallenge(event);');
    });
  });

  // generate selectable items
  currentActivityItems = Object.assign([], activityItems); // clone the array
  shuffleArray(currentActivityItems); // shuffle items

  currentActivityItems.forEach(function (item) {
    let clickSrcHtmlElem = document.createElement('div');
    clickSrcHtmlElem.id = `${item.name}SrcId`;
    clickSrcHtmlElem.setAttribute('name', `${item.name}`);
    clickSrcHtmlElem.style.backgroundImage = `url('${item.image}')`;
    clickSrcHtmlElem.classList.add('clickable-src-container', 'pointer-cursor');
    clickSrcHtmlElem.setAttribute('onmousedown', 'sourceSelected(event);');
    clickSrcContainers.append(clickSrcHtmlElem);
  });

  selectValidChallengeItem();
}

const selectValidChallengeItem = () => {
  // select the valid challenge item, save it to be checked later
  const validItemIndex = Math.floor((Math.random() * currentActivityItems.length));
  challengeItem = clickSrcContainers.children()[validItemIndex];

  activitySoundList = [];
  activitySoundList.push('../sounds/match.ogg'); // potriveste
  const correctItem = currentActivityItems[validItemIndex];
  activitySoundList.push(correctItem.soundItem.soundPath);

  currentActivityItems.splice(validItemIndex, 1);

  playShowItemAudio();
}

const sourceSelected = (ev) => {
  let clickedElem = ev.currentTarget;
  if (!userSelectedElem) {
    if (clickedElem.getAttribute('name') === challengeItem.getAttribute('name')) {
      clickedElem.classList.add('selected');
      clickedElem.classList.remove('pointer-cursor');
      userSelectedElem = clickedElem;

      handleValidAnswer(false, false, false);
    } else {
      handleInvalidAnswer(true);
      // in order to have the animation of the error-indicator play after repeatedly clicking on this element
      const clickedElemClone = clickedElem.cloneNode(true);
      clickedElemClone.classList.add('error-indicator');
      clickedElem.parentNode.replaceChild(clickedElemClone, clickedElem);
    }
  }
}

const validateChallenge = (ev) => {
  let clickedElem = ev.currentTarget;
  if (userSelectedElem) {
    const userSelectedItemAttrName = userSelectedElem.getAttribute('name');
    const challengeItemAttrName = challengeItem.getAttribute('name');
    if (clickedElem.id === `gr_${userSelectedItemAttrName}` && userSelectedItemAttrName === challengeItemAttrName) {
      // uncover the item on the head
      clickedElem.classList.remove('covered', 'pointer-cursor');
      removeAttributes(clickedElem, 'onmousedown')

      // remove uncovered item from source clickable list
      userSelectedElem.remove();
      userSelectedElem = undefined;

      // check progress
      checkActivityProgress();
    } else {
      handleInvalidAnswer(true);
    }
  }
}

const checkActivityProgress = () => {
  // no more clickable items?
  if (clickSrcContainers.children().length <= 0) {
    checkValidAnswer(true);
  } else {
    handleValidAnswer(false, false, false);

    selectValidChallengeItem();
  }
}
