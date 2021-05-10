jQuery('body').load('objectBody.inc');

// on page load call generate 2 objects (first time the page is displayed)
function go() {
  // function declared in each objects related file
  initObjects();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  initContainerElements();

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
}

function generateChallengeItems() {
  let answerOptionValues = []; // [true, false, (false)..]
  for (i = 0; i < nbDistractors; i++) {
    answerOptionValues.push(!answerOptionValues.length || answerOptionValues.length === 0);
  }

  // generate the containing DOM elements
  let currSelectedObjects = []; // objects selected in the current iteration of the activity
  for (let objElem of activityObjElemArray) {
    // randomly determine whether this is the correct answer or not
    const answerOptionIndex = Math.floor(Math.random() * answerOptionValues.length);
    let isCorrectAnswer = answerOptionValues[answerOptionIndex]; // true or false
    answerOptionValues.splice(answerOptionIndex, 1); // remove the selected answer from the array

    // unbind previously bound click handler
    objElem.off('click');
    // bind the onclick event function
    objElem.click(function () {
      checkValidAnswer(isCorrectAnswer);
    });

    // randomly find "nbDistractors" objects to be displayed, from the list of available objects
    let item;
    while (true) {
      item = items[Math.floor((Math.random() * items.length))];

      // make sure it was neither selected in the previous iteration, nor in the current iteration
      if (!currSelectedObjects.some(cso => cso.name === item.name)/* && !prevSelectedItems.some(pso => pso.name === item.name)*/) {
        currSelectedObjects.push(item);
        break;
      }
    }

    // display the object
    objElem.css('background-image', 'url(' + item.imagePath + ')');
    objElem.removeClass().addClass('object pointerCursor');
    if (isCorrectAnswer) {
      itemAudioFilePath = item.audioPath;
    }

  }
  prevSelectedItems = currSelectedObjects;

  playShowItemAudio();
}
