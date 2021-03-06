/**
 *  check to see if there are any duplicate characters in the string
 * @param str the string to check for duplicate chars
 * @returns {boolean} true if duplicate chars were found, false otherwise
 */
const isIsogram = function (str) {
  return !/(.).*\1/.test(str);
}

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
  window.location = pageLocation + (includeUrlParams ? window.location.search: '');
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

function isNumberKey(evt){
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  return !(charCode === 32 || charCode > 57);
}
