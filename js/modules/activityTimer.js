export class ActivityTimer {
	constructor(score) {
		this.score = score;
		this.activityTimeSeconds = 0;
	}

	startTimer() {
		jQuery('body').prepend(`<div id="timerId" style="display: ${(getDisplayActivityTimer() ? 'block' : 'none')};"><span id="minutes">00</span>:<span id="seconds">00</span></div>`);

		setInterval(() => {
			if (!this.score.dlResultsModalPanel || !this.score.dlResultsModalPanel.is(":visible")) {
				jQuery("#timerId > #seconds").html(pad(++this.activityTimeSeconds % 60));
				jQuery("#timerId > #minutes").html(pad(Math.floor(this.activityTimeSeconds / 60)));
			}
		}, 1000);
	}
}
