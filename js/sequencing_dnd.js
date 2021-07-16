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

let dropContainers = jQuery('#dropContainersId');
let dragContainers = jQuery('#dragContainersId');

const generateDroppableHtmlElem = (j) => {
  const droppableHtmlElem = `<div id="droppable${j}" class="activity-item droppable"
       onDrop="drop(event)"
       onDragOver="allowDrop(event)"
       onDragEnter="highlightArea(event, true)"
       onMouseOut="highlightArea(event, false)"
       onDragLeave="highlightArea(event, false)">
  </div>`;
  dropContainers.append(droppableHtmlElem);
}

const generateDraggableHtmlElem = (index, imagePath) => {
  const draggableHtmlElem = `<div id="draggable${index}" class="draggable-container drag-item" style="background-image: url('${imagePath}');" draggable="true" ondragstart="startDrag(event)" ondragend="endDrag(event);">
        </div>`;
  dragContainers.append(draggableHtmlElem);
}

const generateChallengeItems = () => {
  // remove previous HTML content from the dropContainersId div (new content will be generated below)
  removeContent(dropContainers.attr('id'));

  activitySoundList.push(`${sndPath}sequence.ogg`);

  // extract the activity sequence
  const indexAct = Math.floor((Math.random() * activityItems.length));
  let selectedActivitySq = Object.assign([], activityItems[indexAct]); // clone the array, or else the extractRandomEntryAndSplice will empty the source array

  for (index in selectedActivitySq) {
    generateDroppableHtmlElem(parseInt(index) + 1);
  }

  while (selectedActivitySq.length > 0) {
    let entryObj = extractRandomEntryAndSplice(selectedActivitySq);

    generateDraggableHtmlElem(entryObj.index, entryObj.imagePath);
  }

  playShowItemAudio(false);
}

const checkActivityProgress = () => {
  // no more draggable items?
  if (dragContainers.children().length === 0) {
    checkValidAnswer(true);
  }
}

/* used in the DRAG AND DROP logic */
let draggedElemId;

const allowDrop = (ev) => {
  ev.preventDefault();
}

const startDrag = (ev) => {
  const draggableElem = document.getElementById(ev.target.id);
  if (draggableElem.getAttribute('draggable')) {
    draggableElem.classList.add('hide-src-while-dragging');
    draggedElemId = ev.target.id;
  }
}
const endDrag = (ev) => {
  document.getElementById(ev.target.id).classList.remove('hide-src-while-dragging');
  draggedElemId = null;
}

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

const highlightArea = (ev, isTrue) => {
  if (draggedElemId) {
    const dropElem = document.getElementById(ev.target.id);
    const draggableElem = document.getElementById(draggedElemId);
    if (dropElem && draggableElem) {
      dropElem.classList.remove('error-indicator');
      dropElem.style.backgroundColor = (isTrue && draggableElem.hasAttribute('draggable') ? 'yellow' : "");
    }
  }
}
