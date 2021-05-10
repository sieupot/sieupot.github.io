let prevRnd;

// on page load call generate the body part that should be pointed at
jQuery(() => {
  items = [{name: 'head',      audioPath: '../sounds/humanBody/head.ogg'},
           {name: 'shoulders', audioPath: '../sounds/humanBody/shoulders.ogg'},
           {name: 'arms',      audioPath: '../sounds/humanBody/arms.ogg'},
           {name: 'palms',     audioPath: '../sounds/humanBody/palms.ogg'},
           {name: 'chest',     audioPath: '../sounds/humanBody/chest.ogg'},
           {name: 'belly',     audioPath: '../sounds/humanBody/belly.ogg'},
           {name: 'legs',      audioPath: '../sounds/humanBody/legs.ogg'},
           {name: 'knees',     audioPath: '../sounds/humanBody/knees.ogg'},
  ]

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    activityObjElemArray[i] = jQuery('svg[' + item.name + '-attr]');
  }

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

function generateChallengeItems() {
  do {
    validItemIndex = Math.floor((Math.random() * items.length));
  } while (validItemIndex === prevRnd);
  prevRnd = validItemIndex;

  itemAudioFilePath = items[validItemIndex].audioPath;

  playShowItemAudio();
}

function playShowItemAudio() {
  resetObjects(false, true);

  modalPanel.dialog(dialogOptions);
  let playingBodyPartAudio = new Audio(itemAudioFilePath);
  playingBodyPartAudio.addEventListener('ended', function () {
    resultDivElem.hide();
    modalPanel.dialog('close');
  });
  playingAudios[playingAudios.length] = playingBodyPartAudio;
  resultDivElem.find('img').attr('src', '../img/show.svg');
  resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio('../sounds/show.ogg');
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function () {
    playingBodyPartAudio.addEventListener('ended', function () {
      // bind the onclick event function
      for (let i = 0; i < activityObjElemArray.length; i++) {
        let svgElem = activityObjElemArray[i];
        svgElem.off('click');
        svgElem.click(function () {
          checkValidAnswer(i === validItemIndex);
        });
      }
    });
    playingBodyPartAudio.play();
  });
  playingShowAudio.play();

  if (!showItemSoundInterval) {
    showItemSoundInterval = setInterval(playShowItemAudio, commandRepeatInterval);
  }
}
