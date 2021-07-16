let prevRnd;

// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  activityItems.forEach(item => activityObjElemArray.push(jQuery('svg[' + item.name + '-attr]')));

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

const generateChallengeItems = () => {
  do {
    validItemIndex = Math.floor((Math.random() * activityItems.length));
  } while (validItemIndex === prevRnd);
  prevRnd = validItemIndex;

  activitySoundList.push('../sounds/show.ogg');
  activitySoundList.push(activityItems[validItemIndex].audioPath);

  // bind the onclick event function
  for (const [i, svgElem] of activityObjElemArray.entries()) {
    svgElem.off('click').click(() => {
      checkValidAnswer(i === validItemIndex);
    });
  }

  playShowItemAudio();
}
