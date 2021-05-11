jQuery('body').load('objectBody.inc');

// called on page load
function go() {
  // function declared in each object's related file
  initItems();

  initActivity();
}

function generateChallengeItems() {
  let answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  // setup the containing DOM elements
  let currSelectedObjects = []; // objects selected in the current iteration of the activity
  for (let objElem of activityObjElemArray) {
    // randomly determine whether this is the correct answer or not
    let isCorrectAnswer = extractAnswerOption(answerOptionValues);

    // randomly find "nbDistractors" objects to be displayed, from the list of available objects
    let item;
    while (true) {
      item = items[Math.floor((Math.random() * items.length))];

      // make sure it was not already generated for the current iteration (/* can also limited to the previous iteration*/)
      if (!currSelectedObjects.some(cso => cso.name === item.name)/* && !prevSelectedItems.some(pso => pso.name === item.name)*/) {
        currSelectedObjects.push(item);
        break;
      }
    }

    // display the object
    objElem.css('background-image', 'url(' + item.imagePath + ')').removeClass().addClass('object pointerCursor');
    // unbind previously bound click handler; bind the onclick event function
    objElem.off('click').click(function () {
      checkValidAnswer(isCorrectAnswer);
    });

    isCorrectAnswer ? itemAudioFilePath = item.audioPath : null;
  }
  prevSelectedItems = currSelectedObjects;

  playShowItemAudio();
}
