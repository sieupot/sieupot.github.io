let colors; // list of available color objects (css class name, audio file name to be played)

let showColorSoundInterval;
let color1Element, color2Element, color3Element, color4Element, validImageIndex, audioFileName;
let playingAudios;
let prevRnd1, prevRnd2, prevRnd3, prevRnd4;
let rightAnswers = 0, wrongAnswers = 0;

// on page load call generate 4 colors (first time the page is displayed)
$(function() {
  colors = [{name: 'red', audio: 'sounds/colors/red.ogg'}, {name: 'green', audio: 'sounds/colors/green.ogg'}, {name: 'blue', audio: 'sounds/colors/blue.ogg'},
    {name: 'pink', audio: 'sounds/colors/pink.ogg'}, {name: 'yellow', audio: 'sounds/colors/yellow.ogg'}, {name: 'orange', audio: 'sounds/colors/orange.ogg'},
    {name: 'violet', audio: 'sounds/colors/violet.ogg'}, {name: 'brown', audio: 'sounds/colors/brown.ogg'}, {name: 'gray', audio: 'sounds/colors/gray.ogg'}, {name: 'black', audio: 'sounds/colors/black.ogg'}
  ]

  $('#contentPanel').show();
  $('#startDiv').hide();
  generateChallengeColors();
});

function generateChallengeColors() {
  // randomly find 4 colors to be displayed, from the list of available colors
  let rnd1, rnd2, rnd3, rnd4;
  do {
    rnd1 = Math.floor((Math.random() * 10));
    rnd2 = Math.floor((Math.random() * 10));
    rnd3 = Math.floor((Math.random() * 10));
    rnd4 = Math.floor((Math.random() * 10));
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
  audioFileName = (eval('color'+validImageIndex)).audio;
  color1Element = $('.colors-container > #color1');
  color2Element = $('.colors-container > #color2');
  color3Element = $('.colors-container > #color3');
  color4Element = $('.colors-container > #color4');
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

  let playingColorTypeAudio = new Audio(audioFileName);
  playingAudios[playingAudios.length] = playingColorTypeAudio;
  let playingShowAudio = new Audio("sounds/show.ogg");
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
  const $resultDivElem = $('div.result');
  if (isValidAnswer) {
    rightAnswers++;
    $resultDivElem.find('img').attr("src","img/smileFace.png");
    $resultDivElem.fadeIn(1000);
    let playingCorrectAnswerAudio = new Audio("sounds/correct.ogg");
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
    $resultDivElem.find('img').attr("src","img/sadFace.png");
    $resultDivElem.toggle("shake");
    let playingWrongAnswerAudio = new Audio("sounds/wrong.ogg");
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
