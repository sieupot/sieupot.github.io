let shapes; // list of available shape objects (css class name, audio file name to be played)

let showShapeSoundInterval;
let shape1Elem, shape2Elem, valid1, audioFileName;
let playingAudios;
let prevRnd1, prevRnd2;
let rightAnswers = 0, wrongAnswers = 0;

// on page load call generate 2 shapes (first time the page is displayed)
$(function() {
  shapes = [{name: 'square', audio: 'sounds/square.ogg'}, {name: 'rectangle', audio: 'sounds/rectangle.ogg'}, {name: 'circle', audio: 'sounds/circle.ogg'},
            {name: 'triangle', audio: 'sounds/triangle.ogg'}, {name: 'star', audio: 'sounds/star.ogg'}, {name: 'diamond', audio: 'sounds/diamond.ogg'}]

  $('#contentPanel').show();
  $('#startDiv').hide();
  generateChallengeShapes();
});

function generateChallengeShapes() {
  // randomly find 2 shapes to be displayed, from the list of available shapes
  let rnd1, rnd2;
  do {
    rnd1 = Math.floor((Math.random() * 6));
    rnd2 = Math.floor((Math.random() * 6));
  } while(rnd1 === rnd2 || rnd1 === prevRnd1 || rnd2 === prevRnd2);
  prevRnd1 = rnd1;
  prevRnd2 = rnd2;
  let shape1 = shapes[rnd1];
  let shape2 = shapes[rnd2];

  // display the 2 shapes
  $('.shapes-container > #shape1 > div').removeClass().addClass(shape1.name);
  $('.shapes-container > #shape2 > div').removeClass().addClass(shape2.name);
  valid1 = Math.random() < 0.5;
  audioFileName = valid1 ? shape1.audio : shape2.audio;
  shape1Elem = $('.shapes-container > #shape1');
  shape2Elem = $('.shapes-container > #shape2');
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

  let playingShapeTypeAudio = new Audio(audioFileName);
  playingAudios[playingAudios.length] = playingShapeTypeAudio;
  let playingShowAudio = new Audio("sounds/show.ogg");
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
  const $resultDivElem = $('div.result');
  if (selectedValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr("src","img/smileFace.png");
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio("sounds/correct.ogg");
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
    $resultDivElem.find('img').attr("src","img/sadFace.png");
    $resultDivElem.toggle("shake");
    let playingWrongAnswerAudio = new Audio("sounds/wrong.ogg");
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
