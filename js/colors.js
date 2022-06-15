import { ActivityCore } from './activityCore.js'

// on page load
jQuery(() => {
	new Colors();
});

class Colors extends ActivityCore {
	constructor() {
		super(true);
	}

	activityItems;
	initActivityItems = () => {
		this.activityItems = this.getActivityItems();

		this.initActivity('color');
	}

	getActivityItems = () => {
		const sndPath = "../sounds/colors/";
		const activityType = getUrlParameter('at');
		const activityItemsBasic = [
			{ name: 'red', audioPath: sndPath + 'red.ogg' },
			{ name: 'green', audioPath: sndPath + 'green.ogg' },
			{ name: 'blue', audioPath: sndPath + 'blue.ogg' },
			{ name: 'yellow', audioPath: sndPath + 'yellow.ogg' },
		];

		let activityItemsAdvanced = [];
		if (activityType === 'c') {
			activityItemsAdvanced = [
				{ name: 'pink', audioPath: sndPath + 'pink.ogg' },
				{ name: 'orange', audioPath: sndPath + 'orange.ogg' },
				{ name: 'violet', audioPath: sndPath + 'violet.ogg' },
				{ name: 'brown', audioPath: sndPath + 'brown.ogg' },
				{ name: 'gray', audioPath: sndPath + 'gray.ogg' },
				{ name: 'black', audioPath: sndPath + 'black.ogg' },
			];
		}

		return activityItemsBasic.concat(activityItemsAdvanced);
	};

	generateChallengeItems = () => {
		this.answerOptionValues = this.getAnswerOptions(); // [true, false, (false)..]

		// setup the containing DOM elements
		let currSelectedItems = []; // items selected in the current iteration of the activity
		this.activitySoundList.push('../sounds/show.ogg');
		for (let objElem of this.activityObjElemArray) {
			// randomly determine whether this is the correct answer or not
			const isCorrectAnswer = extractRandomEntryAndSplice(this.answerOptionValues);

			// randomly find "nbDistractors" items to be displayed, from the list of available items
			let item;
			while (true) {
				item = this.activityItems[Math.floor((Math.random() * this.activityItems.length))];

				// make sure it was not already generated for the current iteration
				if (!currSelectedItems.some(cso => cso.name === item.name)) {
					currSelectedItems.push(item);
					break;
				}
			}

			// display the item
			objElem.removeClass().addClass('color pointer-cursor ' + item.name);
			// unbind previously bound mousedown handler; bind the mousedown event function
			objElem.off('mousedown').mousedown(() => {
				this.checkValidAnswer(isCorrectAnswer);
			});

			if (isCorrectAnswer) {
				this.activitySoundList.push(item.audioPath);
				this.challengeCorrectItemName = item.name;
			}
		}

		this.playShowItemAudio();
	}
}