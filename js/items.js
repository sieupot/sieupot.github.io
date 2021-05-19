jQuery('body').load('0_item.inc.html');

function generateChallengeItems() {
  let answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  // setup the containing DOM elements
  let currSelectedItems = []; // items selected in the current iteration of the activity
  for (let objElem of activityObjElemArray) {
    // randomly determine whether this is the correct answer or not
    const isCorrectAnswer = extractAnswerOption(answerOptionValues);

    // randomly find "nbDistractors" items to be displayed, from the list of available items
    let item;
    while (true) {
      item = activityItems[Math.floor((Math.random() * activityItems.length))];

      // make sure it was not already generated for the current iteration (/* can also limited to the previous iteration*/)
      if (!currSelectedItems.some(cso => cso.name === item.name)/* && !prevSelectedItems.some(pso => pso.name === item.name)*/) {
        currSelectedItems.push(item);
        break;
      }
    }

    // display the item
    objElem.css('background-image', 'url(' + item.imagePath + ')').removeClass().addClass('item pointerCursor');
    // unbind previously bound click handler; bind the onclick event function
    objElem.off('click').click(function () {
      checkValidAnswer(isCorrectAnswer);
    });

    isCorrectAnswer ? itemAudioFilePath = item.audioPath : null;
  }
  prevSelectedItems = currSelectedItems;

  playShowItemAudio();
}
