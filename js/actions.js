import { ActivityCore } from './activityCore.js'

// on page load
$(() => {
	new Actions();
});

class Actions extends ActivityCore {
	constructor() {
		super();

		this.activityObjElemArray.push($('#actionContainer1Id'));
		this.activityObjElemArray.push($('#actionContainer2Id'));

		this.activityItems = [];
	}

	initActivityItems() {
		const imgPath = "../images/actions/";
		let actionsActivityItems;
		if (actionsType === 'simple') {
			actionsActivityItems = new ActionsSimpleActivityItems(imgPath);
		} else if (actionsType === 'complex') {
			actionsActivityItems = new ActionsComplexActivityItems(imgPath);
		} else {
			alert("ERROR: no items class defind");
		}
		this.activityItems = actionsActivityItems.activityItems;
	}

	generateChallengeItems() {
		// generate answer options
		this.answerOptionValues = this.getAnswerOptions(); // [true, false, (false)..]

		this.activitySoundList.push('../sounds/show.ogg');

		// extract the first activityItem
		let selectedActivityItem1 = this.activityItems[Math.floor((Math.random() * this.activityItems.length))];
		this.setupAnswer(this.activityObjElemArray[0], selectedActivityItem1);

		let selectedActivityItem1Name = selectedActivityItem1.name;

		let inSameGrouping = false;

		// extract the second activityItem
		// loop until different name
		let selectedActivityItem2;
		do {
			selectedActivityItem2 = this.activityItems[Math.floor((Math.random() * this.activityItems.length))];

			inSameGrouping = selectedActivityItem1.grouping && selectedActivityItem2.grouping && (selectedActivityItem1.grouping === selectedActivityItem2.grouping);
		} while (selectedActivityItem1Name === selectedActivityItem2.name || inSameGrouping);
		this.setupAnswer(this.activityObjElemArray[1], selectedActivityItem2);

		this.playShowItemAudio();
	}

	setupAnswer(objElem, selectedActivityItem) {
		// extract the image to display for this first activity item
		let imagePath = selectedActivityItem.images[Math.floor((Math.random() * selectedActivityItem.images.length))];
		// randomly determine whether this is the correct answer or not
		let isCorrectAnswer = extractRandomEntryAndSplice(this.answerOptionValues);
		if (isCorrectAnswer) {
			this.activitySoundList = this.activitySoundList.concat(selectedActivityItem.soundItems);
			this.challengeCorrectItemName = selectedActivityItem.name;
		}
		objElem.css('background-image', 'url(' + imagePath + ')');
		// objElem.attr('src', imagePath);
		objElem.off('mousedown').mousedown(() => {
			this.checkAnswer(isCorrectAnswer);
		});
	}
}

class SoundItem {
	/**
	 *
	 * @param soundBaseFileName
	 * @param soundArticle: Indefinite, Definite, Possessive
	 * @param sharedSound: some sounds are shared by the spatial positioning activities
	 */
	constructor(soundBaseFileName, soundArticle = '', sharedSound = false) {
		this.sndCommonPath = "../sounds/common/";
		this.sndPath = "../sounds/actions/";

		this.soundPath = `${sharedSound ? this.sndCommonPath : this.sndPath}${soundBaseFileName}${soundArticle}.ogg`;
	}
}

class ActionsSoundItems {
	// verbs
	static clapsSoundItem = new SoundItem('claps');
	static drawsSoundItem = new SoundItem('draws');
	static drinksSoundItem = new SoundItem('drinks');
	static makesSoundItem = new SoundItem('makes');
	static playsSoundItem = new SoundItem('plays');
	static singsSoundItem = new SoundItem('sings');
	static throwsSoundItem = new SoundItem('throws');
	static washesSoundItem = new SoundItem('washes');
	static writesSoundItem = new SoundItem('writes');
	static blowsSoundItem = new SoundItem('blows');
	static sleepsSoundItem = new SoundItem('sleeps');
	static walksSoundItem = new SoundItem('walks');
	static readsSoundItem = new SoundItem('reads');
	static looksSoundItem = new SoundItem('looks');
	static climbsSoundItem = new SoundItem('climbs');
	static smellsSoundItem = new SoundItem('smells');
	static runsSoundItem = new SoundItem('runs');
	static dancesSoundItem = new SoundItem('dances');
	static dressesSoundItem = new SoundItem('dresses');
	static putsShoesOnSoundItem = new SoundItem('putsShoesOn');
	static combsSoundItem = new SoundItem('combs');
	static criesSoundItem = new SoundItem('cries');
	static broomsSoundItem = new SoundItem('brooms');
	static listensSoundItem = new SoundItem('listens');
	static laughsSoundItem = new SoundItem('laughs');
	static jumpsSoundItem = new SoundItem('jumps');
	static eatsSoundItem = new SoundItem('eats');

	// nouns
	static boyArtDSoundItem = new SoundItem('boy', 'D');
	static girlArtDSoundItem = new SoundItem('girl', 'D');
	// +
	static palmsISoundItem = new SoundItem('palms', "I");
	static handsISoundItem = new SoundItem('hands', "I");
	static waterISoundItem = new SoundItem('water', "I");
	static balloonsISoundItem = new SoundItem('balloons', "I");
	static pianoISoundItem = new SoundItem('piano', "I");
	static ballDSoundItem = new SoundItem('ball', "D");
	static basketISoundItem = new SoundItem('basket', "I");
	static faceISoundItem = new SoundItem('face', "I");
	static bathISoundItem = new SoundItem('bath', "I");
	static candlesISoundItem = new SoundItem('candles', "I");
	static watchISoundItem = new SoundItem('watch', "I");
	static flowerDSoundItem = new SoundItem('flower', "D");
	static musicISoundItem = new SoundItem('music', "I");

	// se (articol reflexiv)
	static thirdSgReflexiveArtSoundItem = new SoundItem('thirdSgReflexiveArt', '', true);
	// pe
	static aboveSoundItem = new SoundItem('above', '', true);
	// din
	static fromSoundItem = new SoundItem('from', '', true);
	// la
	static atSoundItem = new SoundItem('at', '', true);
	static inSoundItem = new SoundItem('in', '', true);
}

class ActionsSimpleActivityItems {
	constructor(imgPath) {
		this.initActivityItems(imgPath);
	}

	initActivityItems(imgPath) {
		this.activityItems = [];

		// BOY CLAPS HANDS
		let boyClapsHands = {};
		boyClapsHands.name = 'boyClapsHands';
		boyClapsHands.images = [imgPath + "boyClapsHands.jpg"];
		boyClapsHands.soundItems = [ActionsSoundItems.clapsSoundItem.soundPath, ActionsSoundItems.fromSoundItem.soundPath, ActionsSoundItems.palmsISoundItem.soundPath];
		boyClapsHands.grouping = 'clapsHands';
		this.activityItems.push(boyClapsHands);
		// GIRL CLAPS HANDS
		let girlClapsHands = {};
		girlClapsHands.name = 'girlClapsHands';
		girlClapsHands.images = [imgPath + "girlClapsHands.jpg"];
		girlClapsHands.soundItems = [ActionsSoundItems.clapsSoundItem.soundPath, ActionsSoundItems.fromSoundItem.soundPath, ActionsSoundItems.palmsISoundItem.soundPath];
		girlClapsHands.grouping = 'clapsHands';
		this.activityItems.push(girlClapsHands);

		// BOY DRAWS
		let boyDraws = {};
		boyDraws.name = 'boyDraws';
		boyDraws.images = [imgPath + "boyDraws.jpg"];
		boyDraws.soundItems = [ActionsSoundItems.drawsSoundItem.soundPath];
		boyDraws.grouping = 'draws';
		this.activityItems.push(boyDraws);
		// GIRL DRAWS
		let girlDraws = {};
		girlDraws.name = 'girlDraws';
		girlDraws.images = [imgPath + "girlDraws.jpg"];
		girlDraws.soundItems = [ActionsSoundItems.drawsSoundItem.soundPath];
		girlDraws.grouping = 'draws';
		this.activityItems.push(girlDraws);

		// BOY DRINKS WATER
		let boyDrinksWater = {};
		boyDrinksWater.name = 'boyDrinksWater';
		boyDrinksWater.images = [imgPath + "boyDrinksWater.jpg"];
		boyDrinksWater.soundItems = [ActionsSoundItems.drinksSoundItem.soundPath, ActionsSoundItems.waterISoundItem.soundPath];
		boyDrinksWater.grouping = 'drinksWater';
		this.activityItems.push(boyDrinksWater);
		// GIRL DRINKS WATER
		let girlDrinksWater = {};
		girlDrinksWater.name = 'girlDrinksWater';
		girlDrinksWater.images = [imgPath + "girlDrinksWater.jpg"];
		girlDrinksWater.soundItems = [ActionsSoundItems.drinksSoundItem.soundPath, ActionsSoundItems.waterISoundItem.soundPath];
		girlDrinksWater.grouping = 'drinksWater';
		this.activityItems.push(girlDrinksWater);

		// BOY MAKES SOAP BALLOONS
		let boyMakesSoapBalloons = {};
		boyMakesSoapBalloons.name = 'boyMakesSoapBalloons';
		boyMakesSoapBalloons.images = [imgPath + "boyMakesSoapBalloons.jpg"];
		boyMakesSoapBalloons.soundItems = [ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.balloonsISoundItem.soundPath];
		boyMakesSoapBalloons.grouping = 'makesSoapBalloons';
		this.activityItems.push(boyMakesSoapBalloons);
		// GIRL MAKES SOAP BALLOONS
		let girlMakesSoapBalloons = {};
		girlMakesSoapBalloons.name = 'girlMakesSoapBalloons';
		girlMakesSoapBalloons.images = [imgPath + "girlMakesSoapBalloons.jpg"];
		girlMakesSoapBalloons.soundItems = [ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.balloonsISoundItem.soundPath];
		girlMakesSoapBalloons.grouping = 'makesSoapBalloons';
		this.activityItems.push(girlMakesSoapBalloons);

		// BOY PLAYS
		let boyPlays = {};
		boyPlays.name = 'boyPlays';
		boyPlays.images = [imgPath + "boyPlays.jpg"];
		boyPlays.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.playsSoundItem.soundPath];
		boyPlays.grouping = 'plays';
		this.activityItems.push(boyPlays);
		// GIRL PLAYS
		let girlPlays = {};
		girlPlays.name = 'girlPlays';
		girlPlays.images = [imgPath + "girlPlays.jpg"];
		girlPlays.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.playsSoundItem.soundPath];
		girlPlays.grouping = 'plays';
		this.activityItems.push(girlPlays);

		// BOY PLAYS THE PIANO
		let boyPlaysThePiano = {};
		boyPlaysThePiano.name = 'boyPlaysThePiano';
		boyPlaysThePiano.images = [imgPath + "boyPlaysPiano.jpg"];
		boyPlaysThePiano.soundItems = [ActionsSoundItems.singsSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.pianoISoundItem.soundPath];
		boyPlaysThePiano.grouping = 'playsThePiano';
		this.activityItems.push(boyPlaysThePiano);
		// GIRL PLAYS THE PIANO
		let girlPlaysThePiano = {};
		girlPlaysThePiano.name = 'girlPlaysThePiano';
		girlPlaysThePiano.images = [imgPath + "girlPlaysPiano.jpg"];
		girlPlaysThePiano.soundItems = [ActionsSoundItems.singsSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.pianoISoundItem.soundPath];
		girlPlaysThePiano.grouping = 'playsThePiano';
		this.activityItems.push(girlPlaysThePiano);

		// BOY THROWS BALL AT BASKET
		let boyThrowsBallAtBasket = {};
		boyThrowsBallAtBasket.name = 'boyThrowsBallAtBasket';
		boyThrowsBallAtBasket.images = [imgPath + "boyThrowsBallAtBasket.jpg"];
		boyThrowsBallAtBasket.soundItems = [ActionsSoundItems.throwsSoundItem.soundPath, ActionsSoundItems.ballDSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.basketISoundItem.soundPath];
		boyThrowsBallAtBasket.grouping = 'throwsBallAtBasket';
		this.activityItems.push(boyThrowsBallAtBasket);
		// GIRL THROWS BALL AT BASKET
		let girlThrowsBallAtBasket = {};
		girlThrowsBallAtBasket.name = 'girlThrowsBallAtBasket';
		girlThrowsBallAtBasket.images = [imgPath + "girlThrowsBallAtBasket.jpg"];
		girlThrowsBallAtBasket.soundItems = [ActionsSoundItems.throwsSoundItem.soundPath, ActionsSoundItems.ballDSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.basketISoundItem.soundPath];
		girlThrowsBallAtBasket.grouping = 'throwsBallAtBasket';
		this.activityItems.push(girlThrowsBallAtBasket);

		// BOY WASHES FACE
		let boyWashesFace = {};
		boyWashesFace.name = 'boyWashesFace';
		boyWashesFace.images = [imgPath + "boyWashesFace.jpg"];
		boyWashesFace.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.faceISoundItem.soundPath];
		boyWashesFace.grouping = 'washesFace';
		this.activityItems.push(boyWashesFace);
		// GIRL WASHES FACE
		let girlWashesFace = {};
		girlWashesFace.name = 'girlWashesFace';
		girlWashesFace.images = [imgPath + "girlWashesFace.jpg"];
		girlWashesFace.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.faceISoundItem.soundPath];
		girlWashesFace.grouping = 'washesFace';
		this.activityItems.push(girlWashesFace);

		// BOY WASHES HANDS
		let boyWashesHands = {};
		boyWashesHands.name = 'boyWashesHands';
		boyWashesHands.images = [imgPath + "boyWashesHands.jpg"];
		boyWashesHands.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.handsISoundItem.soundPath];
		boyWashesHands.grouping = 'washesHands';
		this.activityItems.push(boyWashesHands);
		// GIRL WASHES HANDS
		let girlWashesHands = {};
		girlWashesHands.name = 'girlWashesHands';
		girlWashesHands.images = [imgPath + "girlWashesHands.jpg"];
		girlWashesHands.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.handsISoundItem.soundPath];
		girlWashesHands.grouping = 'washesHands';
		this.activityItems.push(girlWashesHands);

		// BOY WRITES
		let boyWrites = {};
		boyWrites.name = 'boyWrites';
		boyWrites.images = [imgPath + "boyWrites.jpg"];
		boyWrites.soundItems = [ActionsSoundItems.writesSoundItem.soundPath];
		boyWrites.grouping = 'writes';
		this.activityItems.push(boyWrites);
		// GIRL WRITES
		let girlWrites = {};
		girlWrites.name = 'girlWrites';
		girlWrites.images = [imgPath + "girlWrites.jpg"];
		girlWrites.soundItems = [ActionsSoundItems.writesSoundItem.soundPath];
		girlWrites.grouping = 'writes';
		this.activityItems.push(girlWrites);

		// BOY TAKES A BATH
		let boyTakesABath = {};
		boyTakesABath.name = 'boyTakesABath';
		boyTakesABath.images = [imgPath + "boyTakesABath.jpg"];
		boyTakesABath.soundItems = [ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.bathISoundItem.soundPath];
		boyTakesABath.grouping = 'takesABath';
		this.activityItems.push(boyTakesABath);
		// GIRL TAKES A BATH
		let girlTakesABath = {};
		girlTakesABath.name = 'girlTakesABath';
		girlTakesABath.images = [imgPath + "girlTakesABath.jpg"];
		girlTakesABath.soundItems = [ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.bathISoundItem.soundPath];
		girlTakesABath.grouping = 'takesABath';
		this.activityItems.push(girlTakesABath);

		// BOY BLOWS THE CANDLES
		let boyBlowsTheCandles = {};
		boyBlowsTheCandles.name = 'boyBlowsTheCandles';
		boyBlowsTheCandles.images = [imgPath + "boyBlowsTheCandles.jpg"];
		boyBlowsTheCandles.soundItems = [ActionsSoundItems.blowsSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.candlesISoundItem.soundPath];
		boyBlowsTheCandles.grouping = 'blowsTheCandles';
		this.activityItems.push(boyBlowsTheCandles);
		// GIRL BLOWS THE CANDLES
		let girlBlowsTheCandles = {};
		girlBlowsTheCandles.name = 'girlBlowsTheCandles';
		girlBlowsTheCandles.images = [imgPath + "girlBlowsTheCandles.jpg"];
		girlBlowsTheCandles.soundItems = [ActionsSoundItems.blowsSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.candlesISoundItem.soundPath];
		girlBlowsTheCandles.grouping = 'blowsTheCandles';
		this.activityItems.push(girlBlowsTheCandles);

		// BOY SLEEPS
		let boySleeps = {};
		boySleeps.name = 'boySleeps';
		boySleeps.images = [imgPath + "boySleeps.jpg"];
		boySleeps.soundItems = [ActionsSoundItems.sleepsSoundItem.soundPath];
		boySleeps.grouping = 'sleeps';
		this.activityItems.push(boySleeps);
		// GIRL SLEEPS
		let girlSleeps = {};
		girlSleeps.name = 'girlSleeps';
		girlSleeps.images = [imgPath + "girlSleeps.jpg"];
		girlSleeps.soundItems = [ActionsSoundItems.sleepsSoundItem.soundPath];
		girlSleeps.grouping = 'sleeps';
		this.activityItems.push(girlSleeps);

		// BOY WALKS
		let boyWalks = {};
		boyWalks.name = 'boyWalks';
		boyWalks.images = [imgPath + "boyWalks.jpg"];
		boyWalks.soundItems = [ActionsSoundItems.walksSoundItem.soundPath];
		boyWalks.grouping = 'walks';
		this.activityItems.push(boyWalks);
		// GIRL WALKS
		let girlWalks = {};
		girlWalks.name = 'girlWalks';
		girlWalks.images = [imgPath + "girlWalks.jpg"];
		girlWalks.soundItems = [ActionsSoundItems.walksSoundItem.soundPath];
		girlWalks.grouping = 'walks';
		this.activityItems.push(girlWalks);

		// BOY READS
		let boyReads = {};
		boyReads.name = 'boyReads';
		boyReads.images = [imgPath + "boyReads.jpg"];
		boyReads.soundItems = [ActionsSoundItems.readsSoundItem.soundPath];
		boyReads.grouping = 'reads';
		this.activityItems.push(boyReads);
		// GIRL READS
		let girlReads = {};
		girlReads.name = 'girlReads';
		girlReads.images = [imgPath + "girlReads.jpg"];
		girlReads.soundItems = [ActionsSoundItems.readsSoundItem.soundPath];
		girlReads.grouping = 'reads';
		this.activityItems.push(girlReads);

		// BOY LOOKS AT THE WATCH
		let boyLooksAtTheWatch = {};
		boyLooksAtTheWatch.name = 'boyLooksAtTheWatch';
		boyLooksAtTheWatch.images = [imgPath + "boyLooksAtTheWatch.jpg"];
		boyLooksAtTheWatch.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.looksSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.watchISoundItem.soundPath];
		boyLooksAtTheWatch.grouping = 'looksAtTheWatch';
		this.activityItems.push(boyLooksAtTheWatch);
		// GIRL LOOKS AT THE WATCH
		let girlLooksAtTheWatch = {};
		girlLooksAtTheWatch.name = 'girlLooksAtTheWatch';
		girlLooksAtTheWatch.images = [imgPath + "girlLooksAtTheWatch.jpg"];
		girlLooksAtTheWatch.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.looksSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.watchISoundItem.soundPath];
		girlLooksAtTheWatch.grouping = 'looksAtTheWatch';
		this.activityItems.push(girlLooksAtTheWatch);

		// BOY CLIMBS
		let boyClimbs = {};
		boyClimbs.name = 'boyClimbs';
		boyClimbs.images = [imgPath + "boyClimbs.jpg"];
		boyClimbs.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.climbsSoundItem.soundPath];
		boyClimbs.grouping = 'climbs';
		this.activityItems.push(boyClimbs);
		// GIRL CLIMBS
		let girlClimbs = {};
		girlClimbs.name = 'girlClimbs';
		girlClimbs.images = [imgPath + "girlClimbs.jpg"];
		girlClimbs.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.climbsSoundItem.soundPath];
		girlClimbs.grouping = 'climbs';
		this.activityItems.push(girlClimbs);

		// BOY SMELLS THE FLOWER
		let boySmellsTheFlower = {};
		boySmellsTheFlower.name = 'boySmellsTheFlower';
		boySmellsTheFlower.images = [imgPath + "boySmellsTheFlower.jpg"];
		boySmellsTheFlower.soundItems = [ActionsSoundItems.smellsSoundItem.soundPath, ActionsSoundItems.flowerDSoundItem.soundPath];
		boySmellsTheFlower.grouping = 'smellsTheFlower';
		this.activityItems.push(boySmellsTheFlower);
		// GIRL SMELLS THE FLOWER
		let girlSmellsTheFlower = {};
		girlSmellsTheFlower.name = 'girlSmellsTheFlower';
		girlSmellsTheFlower.images = [imgPath + "girlSmellsTheFlower.jpg"];
		girlSmellsTheFlower.soundItems = [ActionsSoundItems.smellsSoundItem.soundPath, ActionsSoundItems.flowerDSoundItem.soundPath];
		girlSmellsTheFlower.grouping = 'smellsTheFlower';
		this.activityItems.push(girlSmellsTheFlower);

		// BOY RUNS
		let boyRuns = {};
		boyRuns.name = 'boyRuns';
		boyRuns.images = [imgPath + "boyRuns.jpg"];
		boyRuns.soundItems = [ActionsSoundItems.runsSoundItem.soundPath];
		boyRuns.grouping = 'runs';
		this.activityItems.push(boyRuns);
		// GIRL RUNS
		let girlRuns = {};
		girlRuns.name = 'girlRuns';
		girlRuns.images = [imgPath + "girlRuns.jpg"];
		girlRuns.soundItems = [ActionsSoundItems.runsSoundItem.soundPath];
		girlRuns.grouping = 'runs';
		this.activityItems.push(girlRuns);

		// BOY DANCES
		let boyDances = {};
		boyDances.name = 'boyDances';
		boyDances.images = [imgPath + "boyDances.jpg"];
		boyDances.soundItems = [ActionsSoundItems.dancesSoundItem.soundPath];
		boyDances.grouping = 'dances';
		this.activityItems.push(boyDances);
		// GIRL DANCES
		let girlDances = {};
		girlDances.name = 'girlDances';
		girlDances.images = [imgPath + "girlDances.jpg"];
		girlDances.soundItems = [ActionsSoundItems.dancesSoundItem.soundPath];
		girlDances.grouping = 'dances';
		this.activityItems.push(girlDances);

		// BOY DRESSES
		let boyDresses = {};
		boyDresses.name = 'boyDresses';
		boyDresses.images = [imgPath + "boyDresses.jpg"];
		boyDresses.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.dressesSoundItem.soundPath];
		boyDresses.grouping = 'dresses';
		this.activityItems.push(boyDresses);
		// GIRL DRESSES
		let girlDresses = {};
		girlDresses.name = 'girlDresses';
		girlDresses.images = [imgPath + "girlDresses.jpg"];
		girlDresses.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.dressesSoundItem.soundPath];
		girlDresses.grouping = 'dresses';
		this.activityItems.push(girlDresses);

		// BOY PUTS SHOES ON
		let boyPutsShoesOn = {};
		boyPutsShoesOn.name = 'boyPutsShoesOn';
		boyPutsShoesOn.images = [imgPath + "boyPutsShoesOn.jpg"];
		boyPutsShoesOn.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.putsShoesOnSoundItem.soundPath];
		boyPutsShoesOn.grouping = 'putsShoesOn';
		this.activityItems.push(boyPutsShoesOn);
		// GIRL PUTS SHOES ON
		let girlPutsShoesOn = {};
		girlPutsShoesOn.name = 'girlPutsShoesOn';
		girlPutsShoesOn.images = [imgPath + "girlPutsShoesOn.jpg"];
		girlPutsShoesOn.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.putsShoesOnSoundItem.soundPath];
		girlPutsShoesOn.grouping = 'putsShoesOn';
		this.activityItems.push(girlPutsShoesOn);

		// BOY COMBS
		let boyCombs = {};
		boyCombs.name = 'boyCombs';
		boyCombs.images = [imgPath + "boyCombs.jpg"];
		boyCombs.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.combsSoundItem.soundPath];
		boyCombs.grouping = 'combs';
		this.activityItems.push(boyCombs);
		// GIRL COMBS
		let girlCombs = {};
		girlCombs.name = 'girlCombs';
		girlCombs.images = [imgPath + "girlCombs.jpg"];
		girlCombs.soundItems = [ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.combsSoundItem.soundPath];
		girlCombs.grouping = 'combs';
		this.activityItems.push(girlCombs);

		// BOY CRIES
		let boyCries = {};
		boyCries.name = 'boyCries';
		boyCries.images = [imgPath + "boyCries.jpg"];
		boyCries.soundItems = [ActionsSoundItems.criesSoundItem.soundPath];
		boyCries.grouping = 'cries';
		this.activityItems.push(boyCries);
		// GIRL CRIES
		let girlCries = {};
		girlCries.name = 'girlCries';
		girlCries.images = [imgPath + "girlCries.jpg"];
		girlCries.soundItems = [ActionsSoundItems.criesSoundItem.soundPath];
		girlCries.grouping = 'cries';
		this.activityItems.push(girlCries);

		// BOY BROOMS
		let boyBrooms = {};
		boyBrooms.name = 'boyBrooms';
		boyBrooms.images = [imgPath + "boyBrooms.jpg"];
		boyBrooms.soundItems = [ActionsSoundItems.broomsSoundItem.soundPath];
		boyBrooms.grouping = 'brooms';
		this.activityItems.push(boyBrooms);
		// GIRL BROOMS
		let girlBrooms = {};
		girlBrooms.name = 'girlBrooms';
		girlBrooms.images = [imgPath + "girlBrooms.jpg"];
		girlBrooms.soundItems = [ActionsSoundItems.broomsSoundItem.soundPath];
		girlBrooms.grouping = 'brooms';
		this.activityItems.push(girlBrooms);

		// BOY LISTENS TO MUSIC
		let boyListensToMusic = {};
		boyListensToMusic.name = 'boyListensToMusic';
		boyListensToMusic.images = [imgPath + "boyListensToMusic.jpg"];
		boyListensToMusic.soundItems = [ActionsSoundItems.listensSoundItem.soundPath, ActionsSoundItems.musicISoundItem.soundPath];
		boyListensToMusic.grouping = 'listensToMusic';
		this.activityItems.push(boyListensToMusic);
		// GIRL LISTENS TO MUSIC
		let girlListensToMusic = {};
		girlListensToMusic.name = 'girlListensToMusic';
		girlListensToMusic.images = [imgPath + "girlListensToMusic.jpg"];
		girlListensToMusic.soundItems = [ActionsSoundItems.listensSoundItem.soundPath, ActionsSoundItems.musicISoundItem.soundPath];
		girlListensToMusic.grouping = 'listensToMusic';
		this.activityItems.push(girlListensToMusic);

		// BOY LAUGHS
		let boyLaughs = {};
		boyLaughs.name = 'boyLaughs';
		boyLaughs.images = [imgPath + "boyLaughs.jpg"];
		boyLaughs.soundItems = [ActionsSoundItems.laughsSoundItem.soundPath];
		boyLaughs.grouping = 'laughs';
		this.activityItems.push(boyLaughs);
		// GIRL LAUGHS
		let girlLaughs = {};
		girlLaughs.name = 'girlLaughs';
		girlLaughs.images = [imgPath + "girlLaughs.jpg"];
		girlLaughs.soundItems = [ActionsSoundItems.laughsSoundItem.soundPath];
		girlLaughs.grouping = 'laughs';
		this.activityItems.push(girlLaughs);

		// BOY SINGS
		let boySings = {};
		boySings.name = 'boySings';
		boySings.images = [imgPath + "boySings.jpg"];
		boySings.soundItems = [ActionsSoundItems.singsSoundItem.soundPath];
		boySings.grouping = 'sings';
		this.activityItems.push(boySings);
		// GIRL SINGS
		let girlSings = {};
		girlSings.name = 'girlSings';
		girlSings.images = [imgPath + "girlSings.jpg"];
		girlSings.soundItems = [ActionsSoundItems.singsSoundItem.soundPath];
		girlSings.grouping = 'sings';
		this.activityItems.push(girlSings);

		// BOY JUMPS
		let boyJumps = {};
		boyJumps.name = 'boyJumps';
		boyJumps.images = [imgPath + "boyJumps.jpg"];
		boyJumps.soundItems = [ActionsSoundItems.jumpsSoundItem.soundPath];
		boyJumps.grouping = 'jumps';
		this.activityItems.push(boyJumps);
		// GIRL JUMPS
		let girlJumps = {};
		girlJumps.name = 'girlJumps';
		girlJumps.images = [imgPath + "girlJumps.jpg"];
		girlJumps.soundItems = [ActionsSoundItems.jumpsSoundItem.soundPath];
		girlJumps.grouping = 'jumps';
		this.activityItems.push(girlJumps);

		// BOY EATS
		let boyEats = {};
		boyEats.name = 'boyEats';
		boyEats.images = [imgPath + "boyEats.jpg"];
		boyEats.soundItems = [ActionsSoundItems.eatsSoundItem.soundPath];
		boyEats.grouping = 'eats';
		this.activityItems.push(boyEats);
		// GIRL EATS
		let girlEats = {};
		girlEats.name = 'girlEats';
		girlEats.images = [imgPath + "girlEats.jpg"];
		girlEats.soundItems = [ActionsSoundItems.eatsSoundItem.soundPath];
		girlEats.grouping = 'eats';
		this.activityItems.push(girlEats);
	}
}

class ActionsComplexActivityItems {
	constructor(imgPath) {
		this.initActivityItems(imgPath);
	}

	initActivityItems(imgPath) {
		this.activityItems = [];

		// BOY CLAPS HANDS
		let boyClapsHands = {};
		boyClapsHands.name = 'boyClapsHands';
		boyClapsHands.images = [imgPath + "boyClapsHands.jpg"];
		boyClapsHands.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.clapsSoundItem.soundPath, ActionsSoundItems.fromSoundItem.soundPath, ActionsSoundItems.palmsISoundItem.soundPath];
		this.activityItems.push(boyClapsHands);
		// GIRL CLAPS HANDS
		let girlClapsHands = {};
		girlClapsHands.name = 'girlClapsHands';
		girlClapsHands.images = [imgPath + "girlClapsHands.jpg"];
		girlClapsHands.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.clapsSoundItem.soundPath, ActionsSoundItems.fromSoundItem.soundPath, ActionsSoundItems.palmsISoundItem.soundPath];
		this.activityItems.push(girlClapsHands);

		// BOY DRAWS
		let boyDraws = {};
		boyDraws.name = 'boyDraws';
		boyDraws.images = [imgPath + "boyDraws.jpg"];
		boyDraws.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.drawsSoundItem.soundPath];
		this.activityItems.push(boyDraws);
		// GIRL DRAWS
		let girlDraws = {};
		girlDraws.name = 'girlDraws';
		girlDraws.images = [imgPath + "girlDraws.jpg"];
		girlDraws.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.drawsSoundItem.soundPath];
		this.activityItems.push(girlDraws);

		// BOY DRINKS WATER
		let boyDrinksWater = {};
		boyDrinksWater.name = 'boyDrinksWater';
		boyDrinksWater.images = [imgPath + "boyDrinksWater.jpg"];
		boyDrinksWater.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.drinksSoundItem.soundPath, ActionsSoundItems.waterISoundItem.soundPath];
		this.activityItems.push(boyDrinksWater);
		// GIRL DRINKS WATER
		let girlDrinksWater = {};
		girlDrinksWater.name = 'girlDrinksWater';
		girlDrinksWater.images = [imgPath + "girlDrinksWater.jpg"];
		girlDrinksWater.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.drinksSoundItem.soundPath, ActionsSoundItems.waterISoundItem.soundPath];
		this.activityItems.push(girlDrinksWater);

		// BOY MAKES SOAP BALLOONS
		let boyMakesSoapBalloons = {};
		boyMakesSoapBalloons.name = 'boyMakesSoapBalloons';
		boyMakesSoapBalloons.images = [imgPath + "boyMakesSoapBalloons.jpg"];
		boyMakesSoapBalloons.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.balloonsISoundItem.soundPath];
		this.activityItems.push(boyMakesSoapBalloons);
		// GIRL MAKES SOAP BALLOONS
		let girlMakesSoapBalloons = {};
		girlMakesSoapBalloons.name = 'girlMakesSoapBalloons';
		girlMakesSoapBalloons.images = [imgPath + "girlMakesSoapBalloons.jpg"];
		girlMakesSoapBalloons.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.balloonsISoundItem.soundPath];
		this.activityItems.push(girlMakesSoapBalloons);

		// BOY PLAYS
		let boyPlays = {};
		boyPlays.name = 'boyPlays';
		boyPlays.images = [imgPath + "boyPlays.jpg"];
		boyPlays.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.playsSoundItem.soundPath];
		this.activityItems.push(boyPlays);
		// GIRL PLAYS
		let girlPlays = {};
		girlPlays.name = 'girlPlays';
		girlPlays.images = [imgPath + "girlPlays.jpg"];
		girlPlays.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.playsSoundItem.soundPath];
		this.activityItems.push(girlPlays);

		// BOY PLAYS THE PIANO
		let boyPlaysThePiano = {};
		boyPlaysThePiano.name = 'boyPlaysThePiano';
		boyPlaysThePiano.images = [imgPath + "boyPlaysPiano.jpg"];
		boyPlaysThePiano.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.singsSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.pianoISoundItem.soundPath];
		this.activityItems.push(boyPlaysThePiano);
		// GIRL PLAYS THE PIANO
		let girlPlaysThePiano = {};
		girlPlaysThePiano.name = 'girlPlaysThePiano';
		girlPlaysThePiano.images = [imgPath + "girlPlaysPiano.jpg"];
		girlPlaysThePiano.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.singsSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.pianoISoundItem.soundPath];
		this.activityItems.push(girlPlaysThePiano);

		// BOY THROWS BALL AT BASKET
		let boyThrowsBallAtBasket = {};
		boyThrowsBallAtBasket.name = 'boyThrowsBallAtBasket';
		boyThrowsBallAtBasket.images = [imgPath + "boyThrowsBallAtBasket.jpg"];
		boyThrowsBallAtBasket.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.throwsSoundItem.soundPath, ActionsSoundItems.ballDSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.basketISoundItem.soundPath];
		this.activityItems.push(boyThrowsBallAtBasket);
		// GIRL THROWS BALL AT BASKET
		let girlThrowsBallAtBasket = {};
		girlThrowsBallAtBasket.name = 'girlThrowsBallAtBasket';
		girlThrowsBallAtBasket.images = [imgPath + "girlThrowsBallAtBasket.jpg"];
		girlThrowsBallAtBasket.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.throwsSoundItem.soundPath, ActionsSoundItems.ballDSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.basketISoundItem.soundPath];
		this.activityItems.push(girlThrowsBallAtBasket);

		// BOY WASHES FACE
		let boyWashesFace = {};
		boyWashesFace.name = 'boyWashesFace';
		boyWashesFace.images = [imgPath + "boyWashesFace.jpg"];
		boyWashesFace.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.faceISoundItem.soundPath];
		this.activityItems.push(boyWashesFace);
		// GIRL WASHES FACE
		let girlWashesFace = {};
		girlWashesFace.name = 'girlWashesFace';
		girlWashesFace.images = [imgPath + "girlWashesFace.jpg"];
		girlWashesFace.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.faceISoundItem.soundPath];
		this.activityItems.push(girlWashesFace);

		// BOY WASHES HANDS
		let boyWashesHands = {};
		boyWashesHands.name = 'boyWashesHands';
		boyWashesHands.images = [imgPath + "boyWashesHands.jpg"];
		boyWashesHands.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.handsISoundItem.soundPath];
		this.activityItems.push(boyWashesHands);
		// GIRL WASHES HANDS
		let girlWashesHands = {};
		girlWashesHands.name = 'girlWashesHands';
		girlWashesHands.images = [imgPath + "girlWashesHands.jpg"];
		girlWashesHands.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.washesSoundItem.soundPath, ActionsSoundItems.aboveSoundItem.soundPath, ActionsSoundItems.handsISoundItem.soundPath];
		this.activityItems.push(girlWashesHands);

		// BOY WRITES
		let boyWrites = {};
		boyWrites.name = 'boyWrites';
		boyWrites.images = [imgPath + "boyWrites.jpg"];
		boyWrites.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.writesSoundItem.soundPath];
		this.activityItems.push(boyWrites);
		// GIRL WRITES
		let girlWrites = {};
		girlWrites.name = 'girlWrites';
		girlWrites.images = [imgPath + "girlWrites.jpg"];
		girlWrites.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.writesSoundItem.soundPath];
		this.activityItems.push(girlWrites);

		// BOY TAKES A BATH
		let boyTakesABath = {};
		boyTakesABath.name = 'boyTakesABath';
		boyTakesABath.images = [imgPath + "boyTakesABath.jpg"];
		boyTakesABath.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.bathISoundItem.soundPath];
		this.activityItems.push(boyTakesABath);
		// GIRL TAKES A BATH
		let girlTakesABath = {};
		girlTakesABath.name = 'girlTakesABath';
		girlTakesABath.images = [imgPath + "girlTakesABath.jpg"];
		girlTakesABath.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.makesSoundItem.soundPath, ActionsSoundItems.bathISoundItem.soundPath];
		this.activityItems.push(girlTakesABath);

		// BOY BLOWS THE CANDLES
		let boyBlowsTheCandles = {};
		boyBlowsTheCandles.name = 'boyBlowsTheCandles';
		boyBlowsTheCandles.images = [imgPath + "boyBlowsTheCandles.jpg"];
		boyBlowsTheCandles.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.blowsSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.candlesISoundItem.soundPath];
		this.activityItems.push(boyBlowsTheCandles);
		// GIRL BLOWS THE CANDLES
		let girlBlowsTheCandles = {};
		girlBlowsTheCandles.name = 'girlBlowsTheCandles';
		girlBlowsTheCandles.images = [imgPath + "girlBlowsTheCandles.jpg"];
		girlBlowsTheCandles.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.blowsSoundItem.soundPath, ActionsSoundItems.inSoundItem.soundPath, ActionsSoundItems.candlesISoundItem.soundPath];
		this.activityItems.push(girlBlowsTheCandles);

		// BOY SLEEPS
		let boySleeps = {};
		boySleeps.name = 'boySleeps';
		boySleeps.images = [imgPath + "boySleeps.jpg"];
		boySleeps.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.sleepsSoundItem.soundPath];
		this.activityItems.push(boySleeps);
		// GIRL SLEEPS
		let girlSleeps = {};
		girlSleeps.name = 'girlSleeps';
		girlSleeps.images = [imgPath + "girlSleeps.jpg"];
		girlSleeps.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.sleepsSoundItem.soundPath];
		this.activityItems.push(girlSleeps);

		// BOY WALKS
		let boyWalks = {};
		boyWalks.name = 'boyWalks';
		boyWalks.images = [imgPath + "boyWalks.jpg"];
		boyWalks.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.walksSoundItem.soundPath];
		this.activityItems.push(boyWalks);
		// GIRL WALKS
		let girlWalks = {};
		girlWalks.name = 'girlWalks';
		girlWalks.images = [imgPath + "girlWalks.jpg"];
		girlWalks.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.walksSoundItem.soundPath];
		this.activityItems.push(girlWalks);

		// BOY READS
		let boyReads = {};
		boyReads.name = 'boyReads';
		boyReads.images = [imgPath + "boyReads.jpg"];
		boyReads.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.readsSoundItem.soundPath];
		this.activityItems.push(boyReads);
		// GIRL READS
		let girlReads = {};
		girlReads.name = 'girlReads';
		girlReads.images = [imgPath + "girlReads.jpg"];
		girlReads.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.readsSoundItem.soundPath];
		this.activityItems.push(girlReads);

		// BOY LOOKS AT THE WATCH
		let boyLooksAtTheWatch = {};
		boyLooksAtTheWatch.name = 'boyLooksAtTheWatch';
		boyLooksAtTheWatch.images = [imgPath + "boyLooksAtTheWatch.jpg"];
		boyLooksAtTheWatch.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.looksSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.watchISoundItem.soundPath];
		this.activityItems.push(boyLooksAtTheWatch);
		// GIRL LOOKS AT THE WATCH
		let girlLooksAtTheWatch = {};
		girlLooksAtTheWatch.name = 'girlLooksAtTheWatch';
		girlLooksAtTheWatch.images = [imgPath + "girlLooksAtTheWatch.jpg"];
		girlLooksAtTheWatch.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.looksSoundItem.soundPath, ActionsSoundItems.atSoundItem.soundPath, ActionsSoundItems.watchISoundItem.soundPath];
		this.activityItems.push(girlLooksAtTheWatch);

		// BOY CLIMBS
		let boyClimbs = {};
		boyClimbs.name = 'boyClimbs';
		boyClimbs.images = [imgPath + "boyClimbs.jpg"];
		boyClimbs.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.climbsSoundItem.soundPath];
		this.activityItems.push(boyClimbs);
		// GIRL CLIMBS
		let girlClimbs = {};
		girlClimbs.name = 'girlClimbs';
		girlClimbs.images = [imgPath + "girlClimbs.jpg"];
		girlClimbs.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.climbsSoundItem.soundPath];
		this.activityItems.push(girlClimbs);

		// BOY SMELLS THE FLOWER
		let boySmellsTheFlower = {};
		boySmellsTheFlower.name = 'boySmellsTheFlower';
		boySmellsTheFlower.images = [imgPath + "boySmellsTheFlower.jpg"];
		boySmellsTheFlower.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.smellsSoundItem.soundPath, ActionsSoundItems.flowerDSoundItem.soundPath];
		this.activityItems.push(boySmellsTheFlower);
		// GIRL SMELLS THE FLOWER
		let girlSmellsTheFlower = {};
		girlSmellsTheFlower.name = 'girlSmellsTheFlower';
		girlSmellsTheFlower.images = [imgPath + "girlSmellsTheFlower.jpg"];
		girlSmellsTheFlower.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.smellsSoundItem.soundPath, ActionsSoundItems.flowerDSoundItem.soundPath];
		this.activityItems.push(girlSmellsTheFlower);

		// BOY RUNS
		let boyRuns = {};
		boyRuns.name = 'boyRuns';
		boyRuns.images = [imgPath + "boyRuns.jpg"];
		boyRuns.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.runsSoundItem.soundPath];
		this.activityItems.push(boyRuns);
		// GIRL RUNS
		let girlRuns = {};
		girlRuns.name = 'girlRuns';
		girlRuns.images = [imgPath + "girlRuns.jpg"];
		girlRuns.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.runsSoundItem.soundPath];
		this.activityItems.push(girlRuns);

		// BOY DANCES
		let boyDances = {};
		boyDances.name = 'boyDances';
		boyDances.images = [imgPath + "boyDances.jpg"];
		boyDances.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.dancesSoundItem.soundPath];
		this.activityItems.push(boyDances);
		// GIRL DANCES
		let girlDances = {};
		girlDances.name = 'girlDances';
		girlDances.images = [imgPath + "girlDances.jpg"];
		girlDances.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.dancesSoundItem.soundPath];
		this.activityItems.push(girlDances);

		// BOY DRESSES
		let boyDresses = {};
		boyDresses.name = 'boyDresses';
		boyDresses.images = [imgPath + "boyDresses.jpg"];
		boyDresses.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.dressesSoundItem.soundPath];
		this.activityItems.push(boyDresses);
		// GIRL DRESSES
		let girlDresses = {};
		girlDresses.name = 'girlDresses';
		girlDresses.images = [imgPath + "girlDresses.jpg"];
		girlDresses.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.dressesSoundItem.soundPath];
		this.activityItems.push(girlDresses);

		// BOY PUTS SHOES ON
		let boyPutsShoesOn = {};
		boyPutsShoesOn.name = 'boyPutsShoesOn';
		boyPutsShoesOn.images = [imgPath + "boyPutsShoesOn.jpg"];
		boyPutsShoesOn.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.putsShoesOnSoundItem.soundPath];
		this.activityItems.push(boyPutsShoesOn);
		// GIRL PUTS SHOES ON
		let girlPutsShoesOn = {};
		girlPutsShoesOn.name = 'girlPutsShoesOn';
		girlPutsShoesOn.images = [imgPath + "girlPutsShoesOn.jpg"];
		girlPutsShoesOn.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.putsShoesOnSoundItem.soundPath];
		this.activityItems.push(girlPutsShoesOn);

		// BOY COMBS
		let boyCombs = {};
		boyCombs.name = 'boyCombs';
		boyCombs.images = [imgPath + "boyCombs.jpg"];
		boyCombs.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.combsSoundItem.soundPath];
		this.activityItems.push(boyCombs);
		// GIRL COMBS
		let girlCombs = {};
		girlCombs.name = 'girlCombs';
		girlCombs.images = [imgPath + "girlCombs.jpg"];
		girlCombs.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.thirdSgReflexiveArtSoundItem.soundPath, ActionsSoundItems.combsSoundItem.soundPath];
		this.activityItems.push(girlCombs);

		// BOY CRIES
		let boyCries = {};
		boyCries.name = 'boyCries';
		boyCries.images = [imgPath + "boyCries.jpg"];
		boyCries.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.criesSoundItem.soundPath];
		this.activityItems.push(boyCries);
		// GIRL CRIES
		let girlCries = {};
		girlCries.name = 'girlCries';
		girlCries.images = [imgPath + "girlCries.jpg"];
		girlCries.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.criesSoundItem.soundPath];
		this.activityItems.push(girlCries);

		// BOY BROOMS
		let boyBrooms = {};
		boyBrooms.name = 'boyBrooms';
		boyBrooms.images = [imgPath + "boyBrooms.jpg"];
		boyBrooms.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.broomsSoundItem.soundPath];
		this.activityItems.push(boyBrooms);
		// GIRL BROOMS
		let girlBrooms = {};
		girlBrooms.name = 'girlBrooms';
		girlBrooms.images = [imgPath + "girlBrooms.jpg"];
		girlBrooms.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.broomsSoundItem.soundPath];
		this.activityItems.push(girlBrooms);

		// BOY LISTENS TO MUSIC
		let boyListensToMusic = {};
		boyListensToMusic.name = 'boyListensToMusic';
		boyListensToMusic.images = [imgPath + "boyListensToMusic.jpg"];
		boyListensToMusic.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.listensSoundItem.soundPath, ActionsSoundItems.musicISoundItem.soundPath];
		this.activityItems.push(boyListensToMusic);
		// GIRL LISTENS TO MUSIC
		let girlListensToMusic = {};
		girlListensToMusic.name = 'girlListensToMusic';
		girlListensToMusic.images = [imgPath + "girlListensToMusic.jpg"];
		girlListensToMusic.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.listensSoundItem.soundPath, ActionsSoundItems.musicISoundItem.soundPath];
		this.activityItems.push(girlListensToMusic);

		// BOY LAUGHS
		let boyLaughs = {};
		boyLaughs.name = 'boyLaughs';
		boyLaughs.images = [imgPath + "boyLaughs.jpg"];
		boyLaughs.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.laughsSoundItem.soundPath];
		this.activityItems.push(boyLaughs);
		// GIRL LAUGHS
		let girlLaughs = {};
		girlLaughs.name = 'girlLaughs';
		girlLaughs.images = [imgPath + "girlLaughs.jpg"];
		girlLaughs.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.laughsSoundItem.soundPath];
		this.activityItems.push(girlLaughs);

		// BOY SINGS
		let boySings = {};
		boySings.name = 'boySings';
		boySings.images = [imgPath + "boySings.jpg"];
		boySings.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.singsSoundItem.soundPath];
		this.activityItems.push(boySings);
		// GIRL SINGS
		let girlSings = {};
		girlSings.name = 'girlSings';
		girlSings.images = [imgPath + "girlSings.jpg"];
		girlSings.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.singsSoundItem.soundPath];
		this.activityItems.push(girlSings);

		// BOY JUMPS
		let boyJumps = {};
		boyJumps.name = 'boyJumps';
		boyJumps.images = [imgPath + "boyJumps.jpg"];
		boyJumps.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.jumpsSoundItem.soundPath];
		this.activityItems.push(boyJumps);
		// GIRL JUMPS
		let girlJumps = {};
		girlJumps.name = 'girlJumps';
		girlJumps.images = [imgPath + "girlJumps.jpg"];
		girlJumps.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.jumpsSoundItem.soundPath];
		this.activityItems.push(girlJumps);

		// BOY EATS
		let boyEats = {};
		boyEats.name = 'boyEats';
		boyEats.images = [imgPath + "boyEats.jpg"];
		boyEats.soundItems = [ActionsSoundItems.boyArtDSoundItem.soundPath, ActionsSoundItems.eatsSoundItem.soundPath];
		this.activityItems.push(boyEats);
		// GIRL EATS
		let girlEats = {};
		girlEats.name = 'girlEats';
		girlEats.images = [imgPath + "girlEats.jpg"];
		girlEats.soundItems = [ActionsSoundItems.girlArtDSoundItem.soundPath, ActionsSoundItems.eatsSoundItem.soundPath];
		this.activityItems.push(girlEats);
	}
}