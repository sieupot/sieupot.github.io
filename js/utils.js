/**
 *  check to see if there are any duplicate characters in the string
 * @param str the string to check for duplicate chars
 * @returns {boolean} true if duplicate chars were found, false otherwise
 */
const isIsogram = (str) => !/(.).*\1/.test(str);

/**
 * get url param value
 * @param sParam the name of the url param
 * @returns {boolean|string}
 */
const getUrlParameter = (sParam) => {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  let i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

/**
 * Navigate to a page location
 * @param pageLocation location of the page to navigate to
 * @param includeUrlParams include url params
 */
const navigateTo = (pageLocation, includeUrlParams = true) => {
  if (includeUrlParams) {
	if (pageLocation.indexOf('?') >= 0) {
	  // if pageLocation already contains params, append window..ocation.search params without the "?" delimiter but replace it with the "&" delimiter
	  pageLocation += '&' + window.location.search.substring(1);	
	}
  }
  
  window.location = pageLocation;
}

/**
 * parses the string in search for #{someJsToEval(params)} patterns, executes the found JS functions and reconstructs the string based on the values returned by the JS functions
 * source string example: Some text #{jsFunctionThatReturnsVal1(params)} some other text #{jsFunctionThatReturnsVal2(params)}
 * which produces result: Some text 3 some other text js result
 * @param sParam
 * @returns {string}
 */
const parseDynamicJsString = (sParam) => {
  const sParamTokens = sParam.split(' ');
  sParamTokens.forEach((token, curIndex) => {
    if (token.indexOf('#{') >= 0) {
      sParamTokens[curIndex] = eval(token.substring(2, token.length - 1));
    }
  });

  return sParamTokens.join(' ');
}

// extract entry from array and splice the array
const extractRandomEntryAndSplice = (entryArray) => {
  const entryIndex = Math.floor(Math.random() * entryArray.length);
  const entryRet = entryArray[entryIndex]; // true or false
  entryArray.splice(entryIndex, 1); // remove the selected answer from the array
  return entryRet;
}

const removeAttributes = (element, ...attrs) => {
  attrs.forEach(attr => element.removeAttribute(attr))
}

const removeContent = (...containerIds) => {
  containerIds.forEach(containerId => document.getElementById(containerId).innerHTML = '')
}

const isNumberKey = (evt) => {
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  return !(charCode === 32 || charCode > 57);
}

const getNbDistractors = () => {
  let nbDistractorsRet = Number(getUrlParameter('dst'));

  // what level is this? Init number of distractors used to render the number of activity items
  nbDistractorsRet = (!nbDistractorsRet || nbDistractorsRet > 4) ? 2 : nbDistractorsRet;

  return nbDistractorsRet;
}

const pad = (val) => {
  return val > 9 ? val : "0" + val;
}

// shuffles the elements in an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
