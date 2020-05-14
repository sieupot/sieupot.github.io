let colors; // list of available color objects (css class name, audio file name to be played)

let showColorSoundInterval;
let color1Element, color2Element, color3Element, color4Element, validImageIndex, audioFileName;
let playingAudios;
let prevRnd1, prevRnd2, prevRnd3, prevRnd4;
let rightAnswers = 0, wrongAnswers = 0;

const dialogOptions = {
  dialogClass: "ui-dialog-no-close-button",
  show: {
    effect: 'fade',
    duration: 200
  },
  hide: {
    effect: 'fade',
    duration: 200
  },
};
let $modalPanel;
let $resultDivElem;

// on page load call generate 4 colors (first time the page is displayed)
$(function() {
  colors = [{name: 'red', audioPath: '../sounds/colors/red.ogg'}, {name: 'green', audioPath: '../sounds/colors/green.ogg'}, {name: 'blue', audioPath: '../sounds/colors/blue.ogg'},
    {name: 'pink', audioPath: '../sounds/colors/pink.ogg'}, {name: 'yellow', audioPath: '../sounds/colors/yellow.ogg'}, {name: 'orange', audioPath: '../sounds/colors/orange.ogg'},
    {name: 'violet', audioPath: '../sounds/colors/violet.ogg'}, {name: 'brown', audioPath: '../sounds/colors/brown.ogg'}, {name: 'gray', audioPath: '../sounds/colors/gray.ogg'}, {name: 'black', audioPath: '../sounds/colors/black.ogg'}
  ]

  $modalPanel = $("#dialogDiv");
  $resultDivElem = $('div.result');

  generateChallengeColors();
});

function generateChallengeColors() {
  // randomly find 4 colors to be displayed, from the list of available colors
  let rnd1, rnd2, rnd3, rnd4;
  do {
    rnd1 = Math.floor((Math.random() * colors.length));
    rnd2 = Math.floor((Math.random() * colors.length));
    rnd3 = Math.floor((Math.random() * colors.length));
    rnd4 = Math.floor((Math.random() * colors.length));
  } while(!isIsogram(((('' + rnd1) + rnd2) + rnd3) + rnd4) || rnd1 === prevRnd1 || rnd2 === prevRnd2 || rnd3 === prevRnd3 || rnd4 === prevRnd4);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  prevRnd3 = rnd3;
  prevRnd4 = rnd4;
  let color1 = colors[rnd1];
  let color2 = colors[rnd2];
  let color4 = colors[rnd4];
  let color3 = colors[rnd3];

  validImageIndex = Math.floor((Math.random() * 4) + 1);
  audioFileName = (eval('color'+validImageIndex)).audioPath;
  color1Element = $('#contentPanel > #color1');
  color2Element = $('#contentPanel > #color2');
  color3Element = $('#contentPanel > #color3');
  color4Element = $('#contentPanel > #color4');
  // display the colors
  color1Element.removeClass().addClass('color ' + color1.name);
  color2Element.removeClass().addClass('color ' + color2.name);
  color3Element.removeClass().addClass('color ' + color3.name);
  color4Element.removeClass().addClass('color ' + color4.name);

  playShowColorsAudio();
}

function resetObjects() {
  color1Element.unbind('click').removeClass('pointerCursor');
  color2Element.unbind('click').removeClass('pointerCursor');
  color3Element.unbind('click').removeClass('pointerCursor');
  color4Element.unbind('click').removeClass('pointerCursor');
  window.clearInterval(showColorSoundInterval);
  showColorSoundInterval = null;
  for(let i = 0; i<playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }
  playingAudios = [];
}

function playShowColorsAudio() {
  playingAudios = [];
  color1Element.unbind('click').removeClass('pointerCursor');
  color2Element.unbind('click').removeClass('pointerCursor');
  color3Element.unbind('click').removeClass('pointerCursor');
  color4Element.unbind('click').removeClass('pointerCursor');

  $modalPanel.dialog(dialogOptions);
  let playingColorTypeAudio = new Audio(audioFileName);
  playingColorTypeAudio.addEventListener('ended', function(){
    $resultDivElem.hide();
    $modalPanel.dialog("close");
  });
  playingAudios[playingAudios.length] = playingColorTypeAudio;
  $resultDivElem.find('img').attr("src","../img/show.svg");
  $resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio("../sounds/show.ogg");
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function(){
    playingColorTypeAudio.addEventListener('ended', function(){
      // bind the onclick event function
      color1Element.addClass('pointerCursor');
      color2Element.addClass('pointerCursor');
      color3Element.addClass('pointerCursor');
      color4Element.addClass('pointerCursor');
      color1Element.click(function() {
        checkValidAnswer(1 === validImageIndex);
      });
      color2Element.click(function() {
        checkValidAnswer(2 === validImageIndex);
      });
      color3Element.click(function() {
        checkValidAnswer(3 === validImageIndex);
      });
      color4Element.click(function() {
        checkValidAnswer(4 === validImageIndex);
      });
    });
    playingColorTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showColorSoundInterval) {
    showColorSoundInterval = setInterval(playShowColorsAudio, 8000);
  }
}

function checkValidAnswer(isValidAnswer) {
  resetObjects();
  $modalPanel.dialog(dialogOptions);
  if (isValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr("src","../img/smileFace.png");
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio("../sounds/correct.ogg");
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function(){
      $resultDivElem.hide();
      generateChallengeColors();
    });
    playingCorrectAnswerAudio.play();
    $('#scoreGood > div').html(rightAnswers);
    $('#scoreGood').effect("highlight", {color: '#acffa3'}, 1000)
  } else {
    wrongAnswers++;
    $resultDivElem.find('img').attr("src","../img/sadFace.png");
    $resultDivElem.toggle("shake");
    let playingWrongAnswerAudio = new Audio("../sounds/wrong.ogg");
    playingWrongAnswerAudio.addEventListener('ended', function(){
      $resultDivElem.toggle("shake", function() {
        playShowColorsAudio();
      });
    });
    playingWrongAnswerAudio.play();
    playingAudios[playingAudios.length] = playingWrongAnswerAudio;
    $('#scoreBad > div').html(wrongAnswers);
    $('#scoreBad').effect("highlight", {color: '#ff9c9c'}, 1000);
  }
}
