let color1Element, color2Element, color3Element, color4Element;
let prevRnd1, prevRnd2, prevRnd3, prevRnd4;

// on page load call generate 4 colors (first time the page is displayed)
$(() => {
  items = [{name: 'red', audioPath: '../sounds/colors/red.ogg'}, {name: 'green', audioPath: '../sounds/colors/green.ogg'}, {name: 'blue', audioPath: '../sounds/colors/blue.ogg'},
    {name: 'pink', audioPath: '../sounds/colors/pink.ogg'}, {name: 'yellow', audioPath: '../sounds/colors/yellow.ogg'}, {name: 'orange', audioPath: '../sounds/colors/orange.ogg'},
    {name: 'violet', audioPath: '../sounds/colors/violet.ogg'}, {name: 'brown', audioPath: '../sounds/colors/brown.ogg'}, {name: 'gray', audioPath: '../sounds/colors/gray.ogg'}, {name: 'black', audioPath: '../sounds/colors/black.ogg'}
  ]

  modalPanel = $('#dialogDiv');
  resultDivElem = $('div.result');

  initContainerElements();

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

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
      if (!currSelectedObjects.some(cso => cso.name === item.name)) {
        currSelectedObjects.push(item);
        break;
      }
    }

    // display the object
    objElem.removeClass().addClass('color pointerCursor ' + item.name)
    if (isCorrectAnswer) {
      itemAudioFilePath = item.audioPath;
    }
  }

  playShowItemAudio();
}
