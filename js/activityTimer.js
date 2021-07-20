class ActivityTimer {
  constructor(displayActivityTimer) {
    this.activityTimeSeconds = 0;
    this.displayActivityTimer = displayActivityTimer;
    this.activityName = document.title;
    this.nbDistractors = nbDistractors;
    this.answerReactionTimeItems = [];

    document.querySelector('div.start-activity').addEventListener('click', this.startTimer);
  }

  startTimer = () => {
    jQuery('body').prepend(`<div id="timerId" style="display: ${(this.displayActivityTimer ? 'block' : 'none')};"><span id="minutes">00</span>:<span id="seconds">00</span></div>`);

    setInterval(() => {
      if (!dlResultsModalPanel || !dlResultsModalPanel.is(":visible")) {
        jQuery("#timerId > #seconds").html(pad(++this.activityTimeSeconds % 60));
        jQuery("#timerId > #minutes").html(pad(Math.floor(this.activityTimeSeconds / 60)));
      }
    }, 1000);

  }

  addAnswerReactionTimeItem = (startDateTime, challengeName) => {
    const answerReactionTimeItem = new AnswerReactionTimeItem(startDateTime, challengeName);
    this.answerReactionTimeItems.push(answerReactionTimeItem);
  }

  updateFailuresCurrentAnswerReactionTimeItem() {
    ++this.answerReactionTimeItems[this.answerReactionTimeItems.length - 1].nbFailures;
  }

  completeCurrentActionReactionTimeItem = (endDateTime) => {
    this.answerReactionTimeItems[this.answerReactionTimeItems.length - 1].challengeEndDateTime = endDateTime;
  }

  buildExportReactionTimesHTMLRows = () => {
    let rows = `<tr><td colspan="2">Nume activitate:</td><td colspan="4">${this.activityName}</td></tr>`;
    if (hasDistractors) {
      rows += `<tr><td colspan="2">Numar distractori:</td><td>${this.nbDistractors}</td></tr>`;
    }
    rows += '<tr/>';
    rows += '<tr><td colspan="2">DENUMIRE SARCINA</td><td colspan="4">DURATA INDEPLINIRE SARCINA (min:sec)</td><td colspan="4">NUMAR RASPUNSURI GRESITE/SARCINA</td></tr>';
    for (const answerReactionTimeItem of this.answerReactionTimeItems) {
      if (answerReactionTimeItem.isComplete()) {
        rows += answerReactionTimeItem.buildExportHTMLRow();
      }
    }
    return rows;
  }
}

class AnswerReactionTimeItem {
  constructor(challengeStartDateTime, challengeName) {
    this.challengeName = challengeName;
    this.challengeStartDateTime = challengeStartDateTime;
    this.challengeEndDateTime = 0;
    this.nbFailures = 0; // how many wrong answers were given until the correct answer was chosen
  }

  buildExportHTMLRow = () => {
    return `<tr><td colspan="2">${this.challengeName}</td><td colspan="4">${this.getMinutesSecondsDelta()}</td><td colspan="4">${this.nbFailures}</td></tr>`;
  }

  isComplete = () => {
    return this.challengeEndDateTime > this.challengeStartDateTime;
  }

  getMinutesSecondsDelta = () => {
    const deltaDate = new Date(this.challengeEndDateTime - this.challengeStartDateTime);
    return `${pad(deltaDate.getMinutes())}:${pad(deltaDate.getSeconds())}`;
  }
}
