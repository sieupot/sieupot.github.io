import { ActivityCore } from './activityCore.js'

// on page load
$(() => {
	$('body').load('0_item.inc.html', function() {
		new Items();
	});
});

class Items extends ActivityCore {
	constructor() {
		super(true);

		this.prevSelectedItems = [];
	}

	initActivityItems() {
		this.activityItems = getActivityItems();

		this.initActivity();
	}

	generateChallengeItems() {
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

				// make sure it was not already generated for the current iteration (/* can also limited to the previous iteration*/)
				if (!currSelectedItems.some(cso => cso.name === item.name)/* && !this.prevSelectedItems.some(pso => pso.name === item.name)*/) {
					currSelectedItems.push(item);
					break;
				}
			}

			// display the item
			objElem.css('background-image', `url(${item.imagePath})`).removeClass().addClass('item pointer-cursor');
			// objElem.attr('src', item.imagePath).removeClass().addClass('item pointer-cursor');
			// unbind previously bound mousedown handler; bind the mousedown event function
			objElem.off('mousedown').mousedown(() => {
				this.checkAnswer(isCorrectAnswer);
			});

			if (isCorrectAnswer) {
				this.activitySoundList.push(item.audioPath);
				this.challengeCorrectItemName = item.name;
			}
		}
		/*this.prevSelectedItems = currSelectedItems;*/

		this.playShowItemAudio();
	}
}