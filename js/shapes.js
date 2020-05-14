let shapes; // list of available shape objects (css class name, audio file name to be played)

let showShapeSoundInterval;
let shape1Elem, shape2Elem, valid1, audioFileName;
let playingAudios;
let prevRnd1, prevRnd2;
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

// on page load call generate 2 shapes (first time the page is displayed)
$(function() {
  shapes = [{name: 'square', audioPath: '../sounds/shapes/square.ogg'}, {name: 'rectangle', audioPath: '../sounds/shapes/rectangle.ogg'}, {name: 'circle', audioPath: '../sounds/shapes/circle.ogg'},
            {name: 'triangle', audioPath: '../sounds/shapes/triangle.ogg'}, {name: 'star', audioPath: '../sounds/shapes/star.ogg'}, {name: 'diamond', audioPath: '../sounds/shapes/diamond.ogg'}]

  $modalPanel = $("#dialogDiv");
  $resultDivElem = $('div.result');

  generateChallengeShapes();
});

function generateChallengeShapes() {
  // randomly find 2 shapes to be displayed, from the list of available shapes
  let rnd1, rnd2;
  do {
    rnd1 = Math.floor((Math.random() * shapes.length));
    rnd2 = Math.floor((Math.random() * shapes.length));
  } while(rnd1 === rnd2 || rnd1 === prevRnd1 || rnd2 === prevRnd2);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  let shape1 = shapes[rnd1];
  let shape2 = shapes[rnd2];

  // display the 2 shapes
  $('#contentPanel > #shape1 > div').removeClass().addClass(shape1.name);
  $('#contentPanel > #shape2 > div').removeClass().addClass(shape2.name);
  valid1 = Math.random() < 0.5;
  audioFileName = valid1 ? shape1.audioPath : shape2.audioPath;
  shape1Elem = $('#contentPanel > #shape1');
  shape2Elem = $('#contentPanel > #shape2');
  playShowShapeAudio();

}

function resetObjects() {
  shape1Elem.unbind('click').removeClass('pointerCursor');
  shape2Elem.unbind('click').removeClass('pointerCursor');
  window.clearInterval(showShapeSoundInterval);
  showShapeSoundInterval = null;
  for(let i = 0; i<playingAudios.length; i++) {
    let audio = playingAudios[i];
    audio.pause();
  }
  playingAudios = [];
}

function playShowShapeAudio() {
  playingAudios = [];
  shape1Elem.unbind('click').removeClass('pointerCursor');
  shape2Elem.unbind('click').removeClass('pointerCursor');

  $modalPanel.dialog(dialogOptions);
  let playingShapeTypeAudio = new Audio(audioFileName);
  playingShapeTypeAudio.addEventListener('ended', function(){
    $resultDivElem.hide();
    $modalPanel.dialog("close");
  });
  playingAudios[playingAudios.length] = playingShapeTypeAudio;
  $resultDivElem.find('img').attr("src","../img/show.svg");
  $resultDivElem.fadeIn(300);
  let playingShowAudio = new Audio("../sounds/show.ogg");
  playingAudios[playingAudios.length] = playingShowAudio;
  playingShowAudio.addEventListener('ended', function(){
    playingShapeTypeAudio.addEventListener('ended', function(){
      // bind the onclick event function
      shape1Elem.addClass('pointerCursor');
      shape2Elem.addClass('pointerCursor');
      shape1Elem.click(function() {
        checkValidAnswer(valid1);
      });
      shape2Elem.click(function() {
        checkValidAnswer(!valid1);
      });
    });
    playingShapeTypeAudio.play();
  });
  playingShowAudio.play();

  if (!showShapeSoundInterval) {
    showShapeSoundInterval = setInterval(playShowShapeAudio, 8000);
  }
}

function checkValidAnswer(selectedValidAnswer) {
  resetObjects();
  $modalPanel.dialog(dialogOptions);
  if (selectedValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr("src","../img/smileFace.png");
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio("../sounds/correct.ogg");
    playingAudios[playingAudios.length] = playingCorrectAnswerAudio;
    playingCorrectAnswerAudio.addEventListener('ended', function(){
      $resultDivElem.hide();
      generateChallengeShapes();
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
        playShowShapeAudio();
      });
    });
    playingWrongAnswerAudio.play();
    playingAudios[playingAudios.length] = playingWrongAnswerAudio;
    $('#scoreBad > div').html(wrongAnswers);
    $('#scoreBad').effect("highlight", {color: '#ff9c9c'}, 1000);
  }
}
