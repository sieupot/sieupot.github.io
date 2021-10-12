jQuery('body').load('0_item.inc.html');

let hasDistractors = true; // used when exporting results, as info in the sheet with activity reaction times

const generateChallengeItems = () => {
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  // setup the containing DOM elements
  let currSelectedItems = []; // items selected in the current iteration of the activity
  activitySoundList.push('../sounds/show.ogg');
  for (let objElem of activityObjElemArray) {
    // randomly determine whether this is the correct answer or not
    const isCorrectAnswer = extractRandomEntryAndSplice(answerOptionValues);

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
    objElem.css('background-image', 'url(' + item.imagePath + ')').removeClass().addClass('item pointer-cursor');
    // objElem.attr('src', item.imagePath).removeClass().addClass('item pointer-cursor');
    // unbind previously bound mousedown handler; bind the mousedown event function
    objElem.off('mousedown').mousedown(() => {
      checkValidAnswer(isCorrectAnswer);
    });

    if (isCorrectAnswer) {
      activitySoundList.push(item.audioPath);
      challengeCorrectItemName = item.name;
    }
  }
  prevSelectedItems = currSelectedItems;

  playShowItemAudio();
}
