import { ActivityCore } from './activityCore.js'

const interact = require('interactjs')

// on page load
$(() => {
	const sequencingDND = new SequencingDND();

  window.dragMoveListener = sequencingDND.dragMoveListener;

  interact('.draggable-container.drag-item')
    .draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,
      listeners: { move: dragMoveListener }
    })
});

class SequencingDND extends ActivityCore {
	constructor() {
		super();

		this.dropContainers = $('#dropContainersId');
		this.dragContainers = $('#dragContainersId');
		this.assistAudio;

		this.imgPath = "../images/sequencing/";
		this.sndPath = "../sounds/sequencing/";

		/* used in the DRAG AND DROP logic */
		this.draggedElemId;
	}

	initActivityItems() {
		this.activityItems = [];

		// CATERPILLAR
		let caterpillarSq = {
			name: 'caterpillar', items: [{ index: 1, imagePath: `${this.imgPath}caterpillar1.jpg` },
										 { index: 2, imagePath: `${this.imgPath}caterpillar2.jpg` },
										 { index: 3, imagePath: `${this.imgPath}caterpillar3.jpg` }]
		};
		this.activityItems.push(caterpillarSq);

		// CHICKEN
		let chickenSq = {
			name: 'chicken', items: [{ index: 1, imagePath: `${this.imgPath}chicken1.jpg` },
									 { index: 2, imagePath: `${this.imgPath}chicken2.jpg` },
									 { index: 3, imagePath: `${this.imgPath}chicken3.jpg` }]
		};
		this.activityItems.push(chickenSq);

		// CUBES
		let cubesSq = {
			name: 'cubes', items: [{ index: 1, imagePath: `${this.imgPath}cubes1.jpg` },
								   { index: 2, imagePath: `${this.imgPath}cubes2.jpg` },
								   { index: 3, imagePath: `${this.imgPath}cubes3.jpg` }]
		};
		this.activityItems.push(cubesSq);

		// DRAWN BEAR
		let drawnBearSq = {
			name: 'drawBear', items: [{ index: 1, imagePath: `${this.imgPath}drawnBear1.jpg` },
									  { index: 2, imagePath: `${this.imgPath}drawnBear2.jpg` },
									  { index: 3, imagePath: `${this.imgPath}drawnBear3.jpg` }]
		};
		this.activityItems.push(drawnBearSq);

		// HOUSE
		let houseSq = {
			name: 'buildHouse', items: [{ index: 1, imagePath: `${this.imgPath}house1.jpg` },
										{ index: 2, imagePath: `${this.imgPath}house2.jpg` },
										{ index: 3, imagePath: `${this.imgPath}house3.jpg` },
										{ index: 4, imagePath: `${this.imgPath}house4.jpg` },
										{ index: 5, imagePath: `${this.imgPath}house5.jpg` },
										{ index: 6, imagePath: `${this.imgPath}house6.jpg` }]
		};
		this.activityItems.push(houseSq);

		// PLANT
		let plantSq = {
			name: 'growPlant', items: [{ index: 1, imagePath: `${this.imgPath}plant1.jpg` },
									   { index: 2, imagePath: `${this.imgPath}plant2.jpg` },
									   { index: 3, imagePath: `${this.imgPath}plant3.jpg` }]
		};
		this.activityItems.push(plantSq);

		// SEASON TREE
		let seasonTreeSq = {
			name: 'seasonTree', items: [{ index: 1, imagePath: `${this.imgPath}seasonTree1.jpg` },
										{ index: 2, imagePath: `${this.imgPath}seasonTree2.jpg` },
										{ index: 3, imagePath: `${this.imgPath}seasonTree3.jpg` },
										{ index: 4, imagePath: `${this.imgPath}seasonTree4.jpg` },
										{ index: 5, imagePath: `${this.imgPath}seasonTree5.jpg` },
										{ index: 6, imagePath: `${this.imgPath}seasonTree6.jpg` }]
		};
		this.activityItems.push(seasonTreeSq);

		// WAKEUP
		let wakeupSq = {
			name: 'wakeup', items: [{ index: 1, imagePath: `${this.imgPath}wakeup1.jpg` },
									{ index: 2, imagePath: `${this.imgPath}wakeup2.jpg` },
									{ index: 3, imagePath: `${this.imgPath}wakeup3.jpg` },
									{ index: 4, imagePath: `${this.imgPath}wakeup4.jpg` },
									{ index: 5, imagePath: `${this.imgPath}wakeup5.jpg` },
									{ index: 6, imagePath: `${this.imgPath}wakeup6.jpg` }]
		};
		this.activityItems.push(wakeupSq);
	}

	generateDroppableHtmlElem(index, nbItems) {
		let assistAudioPath = "../sounds/sequencing/";
		switch (index) {
			case 1:
				// first
				assistAudioPath += 'whatComesFirst.ogg';
				break;
			case (nbItems):
				// last
				assistAudioPath += 'whatComesLast.ogg';
				break;
			default:
				// then
				assistAudioPath += 'whatComesThen.ogg';
				break;
		}

		const objInstance = this;
		let droppableHtmlElem = document.createElement('div');
		droppableHtmlElem.id = `droppable${index}`;
		droppableHtmlElem.style.cursor = 'help';
		droppableHtmlElem.classList.add('activity-item', 'droppable');
		this.dropContainers.append(droppableHtmlElem);

		const droppableHtmlElemJQ = $(droppableHtmlElem);
		droppableHtmlElemJQ.bind('drop', function() {
			objInstance.drop(event);
		});
		droppableHtmlElemJQ.bind('dragover', function() {
			objInstance.allowDrop(event);
		});
		droppableHtmlElemJQ.bind('dragenter', function() {
			objInstance.highlightArea(event, true);
		});
		droppableHtmlElemJQ.bind('mouseout', function() {
			objInstance.highlightArea(event, false);
		});
		droppableHtmlElemJQ.bind('dragleave', function() {
			objInstance.highlightArea(event, false);
		});
		droppableHtmlElemJQ.bind('mousedown', function() {
			if (objInstance.assistAudio) {
				objInstance.assistAudio.pause();
			}
			objInstance.assistAudio = new Audio(assistAudioPath);
			objInstance.assistAudio.play();
		});
	}

	generateDraggableHtmlElem(index, imagePath) {
		const draggableHtmlElem = `<div id="draggable${index}" class="draggable-container drag-item" style="background-image: url('${imagePath}');" draggable="true">
          </div>`;
		this.dragContainers.append(draggableHtmlElem);

		/*const objInstance = this;
		$(`#draggable${index}`).bind("dragstart", function(ev) {
			objInstance.startDrag(ev);
		}).bind("dragend", function(ev) {
			objInstance.endDrag(ev);
		});*/
	}

	generateChallengeItems() {
		// remove previous HTML content from the dropContainersId div (new content will be generated below)
		removeContent(this.dropContainers.attr('id'));

		this.activitySoundList.push(`${this.sndPath}sequence.ogg`);

		// extract the activity sequence
		const indexAct = Math.floor((Math.random() * this.activityItems.length));
		const selectedActivitySq = this.activityItems[indexAct];

		this.challengeCorrectItemName = selectedActivitySq.name;

		const selectedActivitySqItems = Object.assign([], selectedActivitySq.items); // clone the array, or else the extractRandomEntryAndSplice will empty the source array
		for (let index in selectedActivitySqItems) {
			this.generateDroppableHtmlElem(parseInt(index) + 1, selectedActivitySqItems.length);
		}

		while (selectedActivitySqItems.length > 0) {
			const entryObj = extractRandomEntryAndSplice(selectedActivitySqItems);

			this.generateDraggableHtmlElem(entryObj.index, entryObj.imagePath);
		}

		this.playShowItemAudio(false);
	}

	checkActivityProgress() {
		// no more draggable items?
		if (this.dragContainers.children().length === 0) {
			this.checkAnswer(true);
		}
	}

	allowDrop(ev) {
		ev.preventDefault();
	}

	startDrag(ev) {
		const draggableElem = document.getElementById(ev.target.id);
		if (draggableElem.getAttribute('draggable')) {
			draggableElem.classList.add('hide-src-while-dragging');
			this.draggedElemId = ev.target.id;
		}
	}
	endDrag(ev) {
		document.getElementById(ev.target.id).classList.remove('hide-src-while-dragging');
		this.draggedElemId = null;
	}

	drop(ev) {
		ev.preventDefault();
		const draggableElemJQ = $(`#${this.draggedElemId}`);
		if (draggableElemJQ && draggableElemJQ.attr('draggable')) {
			const dropElemJQ = $(ev.target);

			// remove alphas from draggableId (i.e.: draggable1 -> 1, etc)
			const draggableElemIndex = this.draggedElemId.replace(/[^\d.-]/g, '');
			// remove alphas from droppableId (i.e.: droppable1 -> 1, etc)
			const dropElemIndex = dropElemJQ.attr('id').replace(/[^\d.-]/g, '');
			if (draggableElemIndex === dropElemIndex) {
				dropElemJQ.append(draggableElemJQ);
				// don't allow source to be draggable anymore
				draggableElemJQ.removeAttr('draggable').css({ 'cursor': 'default' }).removeClass('hide-src-while-dragging draggable-container');
				// don't allow occupied dropElem to accept dropping anymore

				// remove listeners and hide the counter indicator
				dropElemJQ.unbind('drop').unbind('dragover').unbind('dragenter').unbind('mouseout').unbind('mousedown').unbind('dragleave').css({ 'background-color': '', 'cursor': 'auto' }).addClass('hidden-content success-indicator');
				this.checkActivityProgress();
			} else {
				this.handleInvalidAnswer(false);
				dropElemJQ.css({ 'background-color': '' }).addClass('error-indicator');
			}
		}
	}

	highlightArea(ev, isTrue) {
		if (this.draggedElemId) {
			const dropElem = document.getElementById(ev.target.id);
			const draggableElem = document.getElementById(this.draggedElemId);
			if (dropElem && draggableElem) {
				dropElem.classList.remove('error-indicator');
				dropElem.style.backgroundColor = (isTrue && draggableElem.hasAttribute('draggable') ? 'yellow' : "");
			}
		}
	}

  dragMoveListener (event) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}
