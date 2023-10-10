import { ActivityCore } from './activityCore.js'

// on page load
jQuery(() => {
	new HumanBodyComplex();
});

class HumanBodyComplex extends ActivityCore {
	constructor() {
		super();

		this.userSelectedElem;
		this.challengeItem;
		this.currentActivityItems;
	
		this.clickSrcContainers = $('#clickSrcContainersId');
	
		this.activityItems;
	}

	initActivityItems() {
		let humanBodyActivityItems;
		if (humanBodyPart === 'head') {
			humanBodyActivityItems = new HeadActivityItems(humanBodySubject);
		} else if (humanBodyPart === 'body') {
			humanBodyActivityItems = new BodyActivityItems(humanBodySubject);
		} else {
			alert("ERROR: no items class defind");
		}
		this.activityItems = humanBodyActivityItems.activityItems;
	}

	generateChallengeItems() {
		let objInstance = this;

		// load dest resource
		$('#clickDestContainerId > svg').load(destImagePath, function() {
			Array.from(document.getElementsByClassName('covered')).forEach(function(item) {
				$(item).bind('mousedown', function(event) {
					event.stopPropagation();
					objInstance.validateChallenge(event);
				});
			});
		});

		// generate selectable items
		this.currentActivityItems = Object.assign([], this.activityItems); // clone the array
		shuffleArray(this.currentActivityItems); // shuffle items

		this.currentActivityItems.forEach(function(item) {
			let clickSrcHtmlElem = document.createElement('div');
			clickSrcHtmlElem.id = `${item.name}SrcId`;
			clickSrcHtmlElem.setAttribute('name', `${item.name}`);
			clickSrcHtmlElem.style.backgroundImage = `url('${item.image}')`;
			clickSrcHtmlElem.classList.add('clickable-src-container', 'pointer-cursor');
			objInstance.clickSrcContainers.append(clickSrcHtmlElem);

			$(clickSrcHtmlElem).bind('mousedown', function(event) {
				objInstance.sourceSelected(event);
			});
		});

		this.selectValidChallengeItem();
	}

	selectValidChallengeItem() {
		// select the valid challenge item, save it to be checked later
		const validItemIndex = Math.floor((Math.random() * this.currentActivityItems.length));
		this.challengeItem = this.clickSrcContainers.children()[validItemIndex];

		this.activitySoundList = [];
		this.activitySoundList.push('../sounds/match.ogg'); // potriveste
		const correctItem = this.currentActivityItems[validItemIndex];
		this.activitySoundList.push(correctItem.soundItem.soundPath);

		this.currentActivityItems.splice(validItemIndex, 1);

		this.playShowItemAudio();
	}

	sourceSelected(ev) {
		let clickedElem = ev.currentTarget;
		let clickedElemJQ = $(clickedElem);
		if (!this.userSelectedElem) {
			if (clickedElem.getAttribute('name') === this.challengeItem.getAttribute('name')) {
				clickedElem.classList.add('selected');
				clickedElem.classList.remove('pointer-cursor');
				this.userSelectedElem = clickedElem;

				this.handleValidAnswer(false, false, false);
			} else {
				this.handleInvalidAnswer(true);
				// in order to have the animation of the error-indicator play after repeatedly clicking on this element
				clickedElemJQ.replaceWith(clickedElemJQ.clone(true).addClass('error-indicator'));
			}
		}
	}

	validateChallenge(ev) {
		let clickedElemJQ = $(ev.currentTarget);
		if (this.userSelectedElem) {
			const userSelectedItemAttrName = this.userSelectedElem.getAttribute('name');
			const challengeItemAttrName = this.challengeItem.getAttribute('name');
			if (clickedElemJQ.attr('id') === `gr_${userSelectedItemAttrName}` && userSelectedItemAttrName === challengeItemAttrName) {
				// uncover the item on the head
				clickedElemJQ.unbind('mousedown').removeClass('covered pointer-cursor');

				// remove uncovered item from source clickable list
				this.userSelectedElem.remove();
				this.userSelectedElem = undefined;

				// check progress
				this.checkActivityProgress();
			} else {
				this.handleInvalidAnswer(true);
			}
		}
	}

	checkActivityProgress() {
		// no more clickable items?
		if (this.clickSrcContainers.children().length <= 0) {
			this.checkValidAnswer(true);
		} else {
			this.handleValidAnswer(false, false, false);

			this.selectValidChallengeItem();
		}
	}
}

class SoundItem {
	/**
	 *
	 * @param soundBaseFileName
	 * @param soundArticle: Indefinite, Definite, Possessive
	 */
	constructor(soundBaseFileName, soundArticle = '') {
		const sndPath = "../sounds/humanBody/";
		this.soundPath = `${sndPath}${soundBaseFileName}${soundArticle}.ogg`;
	}

}

class BodyActivityItems {
	constructor(humanBodySubject) {
		this.imgPath = "../images/humanBody/";
		this.initActivityItems(humanBodySubject);
	}


	initActivityItems(humanBodySubject) {
		this.activityItems = [];

		// head
		let head = {};
		head.name = 'head';
		head.image = this.imgPath + `head_item_${humanBodySubject}.svg`;
		head.soundItem = new SoundItem('head');
		this.activityItems.push(head);

		// shoulders
		let shoulders = {};
		shoulders.name = 'shoulders';
		shoulders.image = this.imgPath + `shoulders_${humanBodySubject}.svg`;
		shoulders.soundItem = new SoundItem('shoulders');
		this.activityItems.push(shoulders);

		// arms
		let arms = {};
		arms.name = 'arms';
		arms.image = this.imgPath + `arms_${humanBodySubject}.svg`;
		arms.soundItem = new SoundItem('arms');
		this.activityItems.push(arms);

		// chest
		let chest = {};
		chest.name = 'chest';
		chest.image = this.imgPath + `chest_${humanBodySubject}.svg`;
		chest.soundItem = new SoundItem('chest');
		this.activityItems.push(chest);

		// belly
		let belly = {};
		belly.name = 'belly';
		belly.image = this.imgPath + `belly_${humanBodySubject}.svg`;
		belly.soundItem = new SoundItem('belly');
		this.activityItems.push(belly);

		// palms
		let palms = {};
		palms.name = 'palms';
		palms.image = this.imgPath + `palms_${humanBodySubject}.svg`;
		palms.soundItem = new SoundItem('palms');
		this.activityItems.push(palms);

		// legs
		let legs = {};
		legs.name = 'legs';
		legs.image = this.imgPath + `legs_${humanBodySubject}.svg`;
		legs.soundItem = new SoundItem('legs');
		this.activityItems.push(legs);

		// knees
		let knees = {};
		knees.name = 'knees';
		knees.image = this.imgPath + `knees_${humanBodySubject}.svg`;
		knees.soundItem = new SoundItem('knees');
		this.activityItems.push(knees);
	}
}

class HeadActivityItems {
	constructor(humanBodySubject) {
		this.imgPath = "../images/humanBody/";
		this.initActivityItems(humanBodySubject);
	}


	initActivityItems(humanBodySubject) {
		this.activityItems = [];

		// hair
		let hair = {};
		hair.name = 'hair';
		hair.image = this.imgPath + `hair_${humanBodySubject}.svg`;
		hair.soundItem = new SoundItem('hair', 'I');
		this.activityItems.push(hair);

		// eyeBrows
		let eyeBrows = {};
		eyeBrows.name = 'eyebrows';
		eyeBrows.image = this.imgPath + `eyebrows_${humanBodySubject}.svg`;
		eyeBrows.soundItem = new SoundItem('eyebrows', 'I');
		this.activityItems.push(eyeBrows);

		// eyes
		let eyes = {};
		eyes.name = 'eyes';
		eyes.image = this.imgPath + `eyes_${humanBodySubject}.svg`;
		eyes.soundItem = new SoundItem('eyes', 'I');
		this.activityItems.push(eyes);

		// ears
		let ears = {};
		ears.name = 'ears';
		ears.image = this.imgPath + `ears_${humanBodySubject}.svg`;
		ears.soundItem = new SoundItem('ears', 'I');
		this.activityItems.push(ears);

		// nose
		let nose = {};
		nose.name = 'nose';
		nose.image = this.imgPath + `nose_${humanBodySubject}.svg`;
		nose.soundItem = new SoundItem('nose', 'I');
		this.activityItems.push(nose);

		// mouth
		let mouth = {};
		mouth.name = 'mouth';
		mouth.image = this.imgPath + `mouth_${humanBodySubject}.svg`;
		mouth.soundItem = new SoundItem('mouth', 'I');
		this.activityItems.push(mouth);
	}
}