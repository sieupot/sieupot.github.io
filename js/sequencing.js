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

const cleanupSq = (...containerIds) => {
  for (const containerId of containerIds) {
    const myNode = document.getElementById(containerId);
    myNode.innerHTML = '';
  }
}

const generateDroppableHtmlElem = (j) => {
  const droppableHtmlElem = `<div id="droppable${j}" class="activity-item droppable"
       onDrop="drop(event)"
       onDragOver="allowDrop(event)"
       onDragEnter="highlightArea(event, true)"
       onMouseOut="highlightArea(event, false)"
       onDragLeave="highlightArea(event, false)">
  </div>`;
  dropContainers.prepend(droppableHtmlElem);
}

const generateDraggableHtmlElem = (index, imagePath) => {
  const draggableHtmlElem = `<div id="draggable${index}" class="draggable-container drag-item" style="background-image: url('${imagePath}');" draggable="true" ondragstart="startDrag(event)" ondragend="endDrag(event);">
        </div>`;
  dragContainers.prepend(draggableHtmlElem);
}

generateChallengeItems = () => {
  cleanupSq(dropContainers.attr('id'), dragContainers.attr('id'));
  activitySoundList[activitySoundList.length] = `${sndPath}sequence.ogg`;

  // extract the activity sequence
  let selectedActivitySq = activityItems[Math.floor((Math.random() * activityItems.length))];

  let sequenceSize = selectedActivitySq.length;
  for (let j = sequenceSize; j >= 1; j--) {
    generateDroppableHtmlElem(j);
  }

  while (selectedActivitySq.length > 0) {
    let entryObj = extractRandomEntryAndSplice(selectedActivitySq);

    generateDraggableHtmlElem(entryObj.index, entryObj.imagePath);
  }

  playShowItemAudio(false);
}

function checkActivityProgress() {
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

    const draggableElemIndex = draggedElemId.replace(/[^\d.-]/g, '');
    const dropElemIndex = dropElem.id.replace(/[^\d.-]/g, '');
    if (draggableElemIndex === dropElemIndex) {
      dropElem.appendChild(draggableElem);
      // don't allow source to be draggable anymore
      removeAttributes(draggableElem, 'draggable');
      draggableElem.style.cursor = 'default';
      draggableElem.classList.remove('hide-src-while-dragging', 'draggable-container');
      // don't allow occupied target to allow dropping anymore
      removeAttributes(dropElem, 'ondrop', 'ondragover', 'ondragenter', 'onmouseout', 'ondragleave');
      // hide the counter indicator
      dropElem.classList.add('hidden-content');
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

const removeAttributes = (element, ...attrs) => {
  attrs.forEach(attr => element.removeAttribute(attr))
}
