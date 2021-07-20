let sec = 0, displayActivityTimer = getDisplayActivityTimer();

const startTimer = () => {
  jQuery('body').prepend(`<div id="timerId" style="display: ${(displayActivityTimer ? 'block' : 'none')};"><span id="minutes">00</span>:<span id="seconds">00</span></div>`);

  const pad = (val) => {
    return val > 9 ? val : "0" + val;
  }

  setInterval(() => {
    if (!dlResultsModalPanel || !dlResultsModalPanel.is(":visible")) {
      jQuery("#timerId > #seconds").html(pad(++sec % 60));
      jQuery("#timerId > #minutes").html(pad(parseInt(sec / 60, 10)));
    }
  }, 1000);
}

document.querySelector('div.start-activity').addEventListener('click', startTimer);
