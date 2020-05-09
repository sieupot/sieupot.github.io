function loadActivity(activityName) {
  $('#actionPanel').load('pages/' + activityName + '.html');
}

function isIsogram (str) {
  // check to see if there are any duplicate characters in the string
  return !/(.).*\1/.test(str);
}

