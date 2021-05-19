let prevRnd;

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  for (const item of activityItems) {
    activityObjElemArray.push(jQuery('svg[' + item.name + '-attr]'));
  }

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

function generateChallengeItems() {
  do {
    validItemIndex = Math.floor((Math.random() * activityItems.length));
  } while (validItemIndex === prevRnd);
  prevRnd = validItemIndex;

  itemAudioFilePath = activityItems[validItemIndex].audioPath;

  // bind the onclick event function
  for (const [i, svgElem] of activityObjElemArray.entries()) {
    svgElem.off('click').click(function () {
      checkValidAnswer(i === validItemIndex);
    });
  }

  playShowItemAudio();
}