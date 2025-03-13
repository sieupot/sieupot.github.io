import { ActivityCore } from '../js/activityCore.js'
let mainObjInstance;
// on page load
$(() => {
  mainObjInstance = new SequencingDND();
});

class SequencingDND extends ActivityCore {
  constructor() {
    super();

    this.dropContainers = $('#dropContainersId');
    this.dragContainers = $('#dragContainersId');
    this.assistAudio;

    this.imgPath = "../images/sequencing/";
    this.sndPath = "../sounds/sequencing/";
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

    $(droppableHtmlElem).bind('mousedown', () => {
      if (objInstance.assistAudio) {
        objInstance.assistAudio.pause();
      }
      objInstance.assistAudio = new Audio(assistAudioPath);
      objInstance.assistAudio.play();
    });
  }

  generateDraggableHtmlElem(index, imagePath) {
    const draggableHtmlElem = `<div id="draggable${index}" class="draggable-container drag-item" style="background-image: url('${imagePath}');" draggable="true"></div>`;
    this.dragContainers.append(draggableHtmlElem);
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
    this.init();
  }

  checkActivityProgress() {
    // no more draggable items?
    if (this.dragContainers.children().length === 0) {
      this.checkAnswer(true);
    }
  }

  init() {
    const draggables = document.querySelectorAll(".draggable-container");
    let droppables = document.querySelectorAll(".droppable");

    // === DESKTOP DRAG & DROP ===
    draggables.forEach(draggable => {
      draggable.addEventListener("dragstart", processDragStart);
      draggable.addEventListener("dragend", processDragEnd);
    });

    droppables.forEach(droppable => {
      droppable.addEventListener("dragover", processDragOver);
      droppable.addEventListener("dragenter", processDragEnter);
      droppable.addEventListener("dragleave", processDragLeave);
      droppable.addEventListener("drop", processDrop);
    });

    // === TOUCH EVENTS (FOR MOBILE) ===
    draggables.forEach(draggable => {
      draggable.addEventListener("touchstart", processTouchStart);
      draggable.addEventListener("touchmove", processTouchMove);
      draggable.addEventListener("touchend", processTouchEnd);

      let offsetX = 0, offsetY = 0;

      function processTouchStart(event) {
        const touch = event.touches[0];
        offsetX = touch.clientX - draggable.getBoundingClientRect().left;
        offsetY = touch.clientY - draggable.getBoundingClientRect().top;
      }
      function processTouchMove(event) {
        event.preventDefault(); // Prevent scrolling

        const touch = event.touches[0];
        draggable.style.left = `${touch.clientX - offsetX}px`;
        draggable.style.top = `${touch.clientY - offsetY}px`;

        droppables.forEach(dropzone => {
          const dropRect = dropzone.getBoundingClientRect();
          if (touch.clientX >= dropRect.left &&
            touch.clientX <= dropRect.right &&
            touch.clientY >= dropRect.top &&
            touch.clientY <= dropRect.bottom) {
            dropzone.classList.add("highlight");
          } else {
            dropzone.classList.remove("highlight");
          }
        });
      }
      function processTouchEnd(event) {
        const touch = event.changedTouches[0];

        for (const droppable of [...droppables]) {
          droppable.classList.remove("highlight");

          const dropRect = droppable.getBoundingClientRect();
          if (touch.clientX >= dropRect.left &&
            touch.clientX <= dropRect.right &&
            touch.clientY >= dropRect.top &&
            touch.clientY <= dropRect.bottom) {
            const draggableElemIndex = draggable.id.replace(/[^\d.-]/g, '');

            const dropElemIndex = droppable.id.replace(/[^\d.-]/g, '');

            let dropElemJQ = $(droppable);
            if (draggableElemIndex === dropElemIndex) { // is it the right position?
              draggable.style.position = "static"; // Reset position
              droppable.appendChild(draggable);
              let draggableElemJQ = $(draggable);
              draggableElemJQ.removeAttr('draggable').css({ 'cursor': 'default' }).removeClass('hide-src-while-dragging draggable-container');

              dropElemJQ.off('mousedown');
              draggable.removeEventListener("touchstart", processTouchStart);
              draggable.removeEventListener("touchmove", processTouchMove);
              draggable.removeEventListener("touchend", processTouchEnd);
              dropElemJQ.css({ 'background-color': '', 'cursor': 'auto' }).addClass('hidden-content success-indicator');

              droppables = droppables.filter(droppableInner => {
                return droppableInner.id !== droppable.id; // Keep elements that match the condition
              });

              mainObjInstance.checkActivityProgress();
            } else { // it's the wrong position
              // mark bad answer
              mainObjInstance.handleInvalidAnswer(false);
              dropElemJQ.css({ 'background-color': '' }).addClass('error-indicator');
              // move draggable back
              draggable.style.left = 0;
              draggable.style.top = 0;
            }
          } else {
            // move draggable back
            draggable.style.left = 0;
            draggable.style.top = 0;
          }
        }
      }
    });
  }
}

function processDragStart(event) {
  event.currentTarget.classList.add('hide-src-while-dragging');
  event.dataTransfer.setData("text", event.target.id);
}
function processDragEnd(event) {
  event.currentTarget.classList.remove('hide-src-while-dragging');
}

function processDragOver(event) {
  event.preventDefault();
}

function processDragEnter(event) {
  event.currentTarget.classList.remove('error-indicator');
  event.currentTarget.classList.add("highlight");
}

function processDragLeave(event) {
  event.currentTarget.classList.remove("highlight");
}
function processDrop(event) {
  event.preventDefault();
  let droppable = event.currentTarget;
  let draggable = document.getElementById(`${event.dataTransfer.getData("text")}`);
  droppable.classList.remove("highlight");

  let dropElemJQ = $(droppable);
  const draggableElemIndex = draggable.id.replace(/[^\d.-]/g, '');

  const dropElemIndex = dropElemJQ.attr('id').replace(/[^\d.-]/g, '');
  if (draggableElemIndex === dropElemIndex) {
    let draggableElemJQ = $(draggable);
    dropElemJQ.append(draggableElemJQ);
    draggableElemJQ.removeAttr('draggable').css({ 'cursor': 'default' }).removeClass('hide-src-while-dragging draggable-container');

    draggable.removeEventListener('dragstart', processDragStart);
    draggable.removeEventListener('dragend', processDragEnd);

    droppable.removeEventListener('drop', processDrop);
    dropElemJQ.off('mousedown');
    droppable.removeEventListener('dragover', processDragOver);
    droppable.removeEventListener('dragenter', processDragEnter);
    droppable.removeEventListener('dragleave', processDragLeave);
    dropElemJQ.css({ 'background-color': '', 'cursor': 'auto' }).addClass('hidden-content success-indicator');

    mainObjInstance.checkActivityProgress();
  } else {
    mainObjInstance.handleInvalidAnswer(false);
    dropElemJQ.css({ 'background-color': '' }).addClass('error-indicator');
  }
}


