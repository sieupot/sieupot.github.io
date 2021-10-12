activityTimeSeconds = 0;

startTimer = () => {
  jQuery('body').prepend(`<div id="timerId" style="display: ${(getDisplayActivityTimer() ? 'block' : 'none')};"><span id="minutes">00</span>:<span id="seconds">00</span></div>`);

  setInterval(() => {
    if (!dlResultsModalPanel || !dlResultsModalPanel.is(":visible")) {
      jQuery("#timerId > #seconds").html(pad(++activityTimeSeconds % 60));
      jQuery("#timerId > #minutes").html(pad(Math.floor(activityTimeSeconds / 60)));
    }
  }, 1000);
}

document.querySelector('div.start-activity').addEventListener('mousedown', startTimer);
