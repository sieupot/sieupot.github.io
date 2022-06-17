import { Score } from './modules/score.js';
import { Footer } from './modules/footer.js';
import { ActivityTimer } from './modules/activityTimer.js';

export class ActivityCore {
	constructor(hasDistractors = false) {
		this.hasDistractors = hasDistractors;

		// add element content on page
		new Footer();

		// initialize score object and add score content on page
		this.score = new Score(this.hasDistractors, this.nbDistractors);

		// initialize timer object
		this.activityTimer = new ActivityTimer(this.score);

		this.modalPanel = $('#dialogDiv');
		this.resultDivElem = $('div.result');

		let objInstance = this;
		$("div.start-activity").bind('mousedown', function() {
			objInstance.startActivity();
		});

		// show the start icon and let the user manually start the activity
		this.resultDivElem.fadeIn(300);
		this.modalPanel.dialog(this.dialogOptions);
	}

	nbDistractors = getNbDistractors();

	activityObjElemArray = []; // list of the JQUERY items actively displayed in the page
	activitySoundList = [];
	showItemSoundInterval;
	playingAudios = [];
	rightAnswers = 0;
	wrongAnswers = 0;

	challengeCorrectItemName = '';

	dialogOptions = {
		dialogClass: 'ui-dialog-no-close-button',
		show: {
			effect: 'fade',
			duration: 200
		},
		hide: {
			effect: 'fade',
			duration: 200
		},
	};

	modalPanel;
	resultDivElem;

	initActivity = (itemClass = 'item') => {
		this.modalPanel = $('#dialogDiv');
		this.resultDivElem = $('div.result');

		// INIT CONTAINER ELEMENTS: inject item containing img nodes into the page and create the JQUERY itemElements
		for (let i = 1; i <= this.nbDistractors; i++) {
			let itemContainerId = `itemContainer${i}`;
			$('#contentPanel').append(`<div id="${itemContainerId}" class="${itemClass} pointer-cursor"></div>`);

			let objElem = $(`#${itemContainerId}`);
			this.activityObjElemArray.push(objElem);
		}

		// show the start icon and let the user manually start the activity
		this.resultDivElem.fadeIn(300);
		this.modalPanel.dialog(this.dialogOptions);
	}

	generateChallengeItems = () => { alert(5)/*overridden*/ };
	initActivityItems = () => { alert(0);/*overridden*/ };

	startNewChallenge = () => {
		this.generateChallengeItems();

		// initialize a new reaction time item
		this.score.addAnswerReactionTimeItem(new Date(), this.challengeCorrectItemName);
	}

	/**
	 * triggered when the user manually chooses to start the activity
	 */
	startActivity = () => {
		this.activityTimer.startTimer();

		this.resultDivElem.find('div').unbind('mousedown').removeClass('pointer-cursor');

		this.initActivityItems();

		this.activitySoundList = [];
		this.startNewChallenge();
	}

	getAnswerOptions = () => {
		let answerOptionValues = []; // [true, false, (false)..]
		this.activityObjElemArray.forEach(() => answerOptionValues.push(!answerOptionValues.length || answerOptionValues.length === 0));
		return answerOptionValues;
	}

	checkValidAnswer = (isValidAnswer) => {
		this.resetActivityItems();
		this.modalPanel.dialog(this.dialogOptions);

		if (isValidAnswer) {
			this.handleValidAnswer(true, true, true);
		} else {
			this.handleInvalidAnswer(true);
		}
	}

	handleValidAnswer = (doShowSmileFace, doPlayCorrectItemAudio, doStartNewChallenge) => {
		this.rightAnswers++;
		if (doShowSmileFace) {
			// ------------------------------------------v display success smaller and top right so that children can see the correct item they have chosen (on a tablet, for the human body activities)
			this.resultDivElem.css('opacity', .5).find('div').addClass('action-feedback').css('background-image', 'url(../images/smileFace.png)');
			this.resultDivElem.fadeIn(500);
		}
		if (doPlayCorrectItemAudio) {
			let playingCorrectAnswerAudio = new Audio('../sounds/correct.ogg');
			this.playingAudios.push(playingCorrectAnswerAudio);
			playingCorrectAnswerAudio.addEventListener('ended', () => {
				this.resultDivElem.css('opacity', 1).hide().find('div').removeClass('action-feedback');

				this.activitySoundList = [];
				if (doStartNewChallenge) {
					this.startNewChallenge();
				}
			});
			playingCorrectAnswerAudio.play();
		} else if (doStartNewChallenge) {
			this.startNewChallenge();
		}

		$('#scoreGood > div').html(this.rightAnswers);
		$('#scoreGood').effect('highlight', { color: '#acffa3' }, 500);

		this.score.completeCurrentActionReactionTimeItem(new Date());
	}

	handleInvalidAnswer = (doPlayShowItemAudio) => {
		this.wrongAnswers++;
		this.resultDivElem.css('opacity', .5).find('div').css('background-image', 'url(../images/sadFace.png)');
		this.resultDivElem.fadeIn(500);
		let playingWrongAnswerAudio = new Audio('../sounds/wrong.ogg');
		playingWrongAnswerAudio.addEventListener('ended', () => {
			this.resultDivElem.css('opacity', 1).hide();
			this.modalPanel.dialog('close');
			if (doPlayShowItemAudio) {
				this.playShowItemAudio();
			}
		});
		playingWrongAnswerAudio.play();
		this.playingAudios.push(playingWrongAnswerAudio);
		$('#scoreBad > div').html(this.wrongAnswers);
		$('#scoreBad').effect('highlight', { color: '#ff9c9c' }, 500);

		this.score.updateFailuresCurrentAnswerReactionTimeItem();
	}

	resetActivityItems = () => {
		this.resetSounds();
	}

	resetSounds = () => {
		window.clearInterval(this.showItemSoundInterval);
		this.showItemSoundInterval = null;
	}

	playShowItemAudio = (repeat = true) => {
		this.resetActivityItems();

		if (Score.dlResultsModalPanel && Score.dlResultsModalPanel.is(":visible")) {
			// don't repeat the command and reschedule next repeat
			if (repeat && !this.showItemSoundInterval) {
				this.showItemSoundInterval = setInterval(this.playShowItemAudio, getCommandRepeatInterval());
			}
		} else {
			this.resultDivElem.find('div').css('background-image', 'url(../images/pause.svg)');
			this.resultDivElem.fadeIn(300);
			this.modalPanel.dialog(this.dialogOptions);

			let audio = new Audio(),
				i = 0;
			audio.addEventListener('ended', () => {
				if (++i === this.activitySoundList.length) {
					this.resultDivElem.hide();
					this.modalPanel.dialog('close');

					// schedule next repeat after the last sound has been played
					if (repeat && !this.showItemSoundInterval) {
						this.showItemSoundInterval = setInterval(this.playShowItemAudio, getCommandRepeatInterval());
					}
					return;
				}

				audio.src = this.activitySoundList[i];
				audio.play();
			}, true);
			audio.src = this.activitySoundList[0];
			audio.play();
		}
	}
}
