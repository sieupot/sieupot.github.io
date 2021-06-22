// on page load
jQuery(() => {
  // declared in the html file
  initActivityItems();

  modalPanel = jQuery('#dialogDiv');
  resultDivElem = jQuery('div.result');

  // show the start icon and let the user manually start the activity
  resultDivElem.fadeIn(300);
  modalPanel.dialog(dialogOptions);
});

let itemsContainerId = jQuery('#itemsContainerId');

const cleanupSq = (...containerIds) => {
  for (const containerId of containerIds) {
    const myNode = document.getElementById(containerId);
    myNode.innerHTML = '';
  }
}

const generateDraggableHtmlElem = (index, imagePath) => {
  const draggableHtmlElem = `<div id="draggable${index}" class="draggable-container drag-item" style="background-image: url('${imagePath}');" draggable="true" ondragstart="startDrag(event)" ondragend="endDrag(event);">
        </div>`;
  itemsContainerId.append(draggableHtmlElem);
}

generateChallengeItems = () => {
  // remove previous HTML content from the itemsContainerId div (new content will be generated below)
  cleanupSq(itemsContainerId.attr('id'));

  activitySoundList[activitySoundList.length] = `${sndPath}sequence.ogg`;

  // extract the activity sequence
  const indexAct = Math.floor((Math.random() * activityItems.length));
  let selectedActivitySq = Object.assign([], activityItems[indexAct]); // clone the array, or else the extractRandomEntryAndSplice will empty the source array

  while (selectedActivitySq.length > 0) {
    let entryObj = extractRandomEntryAndSplice(selectedActivitySq);

    generateDraggableHtmlElem(entryObj.index, entryObj.imagePath);
  }

  playShowItemAudio(false);
}

function checkActivityProgress() {
  // no more draggable items?
  if (condition) {
    checkValidAnswer(true);
  }
}

/* used in the DRAG AND DROP logic */
let draggedElemId;

const drop = (ev) => {
  ev.preventDefault();
  const draggableElem = document.getElementById(draggedElemId);
  if (draggableElem && draggableElem.getAttribute('draggable')) {
    const dropElem = ev.target;

    // remove alphas from draggableId (i.e.: draggable1 -> 1, etc)
    const draggableElemIndex = draggedElemId.replace(/[^\d.-]/g, '');
    // remove alphas from droppableId (i.e.: droppable1 -> 1, etc)
    const dropElemIndex = dropElem.id.replace(/[^\d.-]/g, '');
    if (draggableElemIndex === dropElemIndex) {
      dropElem.appendChild(draggableElem);
      // don't allow source to be draggable anymore
      removeAttributes(draggableElem, 'draggable');
      draggableElem.style.cursor = 'default';
      draggableElem.classList.remove('hide-src-while-dragging', 'draggable-container');
      // don't allow occupied dropElem to accept dropping anymore
      removeAttributes(dropElem, 'ondrop', 'ondragover', 'ondragenter', 'onmouseout', 'ondragleave');
      // hide the counter indicator
      dropElem.classList.add('hidden-content', 'success-indicator');
      dropElem.style.backgroundColor = "";
      checkActivityProgress();
    } else {
      modalPanel.dialog(dialogOptions);
      handleInvalidAnswer(false);
      dropElem.style.backgroundColor = '';
      dropElem.classList.add('error-indicator');
    }
  }
}

const removeAttributes = (element, ...attrs) => {
  attrs.forEach(attr => element.removeAttribute(attr))
}
