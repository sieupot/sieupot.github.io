let prevRnd;
let hasDistractors = false; // used when exporting results, as info in the sheet with activity reaction times
let selectedElem;

const
  hairArtDSoundItem = new SoundItem('hair', 'D'),
  eyeBrowsArtDSoundItem = new SoundItem('eyeBrows', 'D'),
  eyesArtDSoundItem = new SoundItem('eyes', 'D'),
  earsArtDSoundItem = new SoundItem('ears', 'D'),
  noseArtDSoundItem = new SoundItem('nose', 'D'),
  mouthArtDSoundItem = new SoundItem('mouth', 'D');

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
  const correctItem = activityItems[validItemIndex];
  activitySoundList.push(correctItem.audioPath);
  challengeCorrectItemName = correctItem.name;

  // unbind previously bound mousedown handler; bind the mousedown event function
  for (const [i, svgElem] of activityObjElemArray.entries()) {
    svgElem.off('mousedown').mousedown(() => {
      checkValidAnswer(i === validItemIndex);
    });
  }

  playShowItemAudio();
}

const sourceSelected = (ev) => {
  let clickedElem = ev.target;
  if (selectedElem) {
    selectedElem.classList.remove('selected');
  }
  clickedElem.classList.add('selected');
  selectedElem = clickedElem;
}
