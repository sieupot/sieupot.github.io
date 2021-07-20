let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times

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

let okClicksNb = 0, selectedActivitySqLength = 0;
let itemsContainerId = jQuery('#itemsContainerId');

const generateClickableHtmlElem = (index, imagePath) => {
  const clickableHtmlElem = `<div id="clickable${index}" class="pointer-cursor click-item" style="background-image: url('${imagePath}');" canbeclicked="true" onclick="itemClicked(event);">
        </div>`;
  itemsContainerId.append(clickableHtmlElem);
}

const generateChallengeItems = () => {
  // remove previous HTML content from the itemsContainerId div (new content will be generated below)
  removeContent(itemsContainerId.attr('id'));

  activitySoundList.push(`${sndPath}sequence.ogg`);

  // extract the activity sequence
  const indexAct = Math.floor((Math.random() * activityItems.length));
  const selectedActivitySq = activityItems[indexAct];

  challengeCorrectItemName = selectedActivitySq.name;

  const selectedActivitySqItems = Object.assign([], selectedActivitySq.items); // clone the array, or else the extractRandomEntryAndSplice will empty the source array
  selectedActivitySqLength = selectedActivitySqItems.length;
  okClicksNb = 1;
  while (selectedActivitySqItems.length > 0) {
    const entryObj = extractRandomEntryAndSplice(selectedActivitySqItems);

    generateClickableHtmlElem(entryObj.index, entryObj.imagePath);
  }

  playShowItemAudio(false);
}

const checkActivityProgress = () => {
  // no more clickable items?
  if (okClicksNb === selectedActivitySqLength) {
    checkValidAnswer(true);
  }
}

const itemClicked = (ev) => {
  ev.preventDefault();
  const clickableElem = ev.target;
  if (clickableElem && clickableElem.getAttribute('canbeclicked')) {

    // remove alphas from clickableId (i.e.: clickable1 -> 1, etc)
    const clickableElemIndex = parseInt(clickableElem.id.replace(/[^\d.-]/g, ''));
    if (clickableElemIndex === okClicksNb) {
      // don't display it for the last successful choice
      if (okClicksNb < selectedActivitySqLength) {
        resultDivElem.find('div').css('background-image', 'url(../images/smileFace.png)');
        resultDivElem.fadeIn(500, () => {
          resultDivElem.fadeOut(500);
        });
      }

      // don't allow source to be clickable anymore
      removeAttributes(clickableElem, 'canbeclicked', 'onclick');
      clickableElem.classList.remove('pointer-cursor');
      // hide the counter indicator
      clickableElem.classList.add('hidden-content', 'success-indicator');
      checkActivityProgress();
      okClicksNb++;
    } else {
      modalPanel.dialog(dialogOptions);
      handleInvalidAnswer(false);
      // in order to have the animation of the error-indicator play after repeatedly clicking on this element
      const clickableElemClone = clickableElem.cloneNode(true);
      clickableElemClone.classList.add('error-indicator');
      clickableElem.parentNode.replaceChild(clickableElemClone, clickableElem);
    }
  }
}
