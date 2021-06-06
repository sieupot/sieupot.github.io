// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  initActivity('color');
});

generateChallengeItems = () => {
  answerOptionValues = getAnswerOptions(); // [true, false, (false)..]

  // setup the containing DOM elements
  let currSelectedItems = []; // items selected in the current iteration of the activity
  activitySoundList[activitySoundList.length] = '../sounds/show.ogg';
  for (let objElem of activityObjElemArray) {
    // randomly determine whether this is the correct answer or not
    const isCorrectAnswer = extractAnswerOption(answerOptionValues);

    // randomly find "nbDistractors" items to be displayed, from the list of available items
    let item;
    while (true) {
      item = activityItems[Math.floor((Math.random() * activityItems.length))];

      // make sure it was not already generated for the current iteration
      if (!currSelectedItems.some(cso => cso.name === item.name)) {
        currSelectedItems.push(item);
        break;
      }
    }

    // display the item
    objElem.removeClass().addClass('color pointerCursor ' + item.name);
    // unbind previously bound click handler; bind the onclick event function
    objElem.off('click').click(function () {
      checkValidAnswer(isCorrectAnswer);
    });

    isCorrectAnswer ? activitySoundList[activitySoundList.length] = item.audioPath : null;
  }

  playShowItemAudio();
}
