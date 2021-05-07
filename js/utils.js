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
const getUrlParameter = function (sParam) {
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
const navigateTo = function (pageLocation, includeUrlParams = true) {
  window.location = pageLocation + (includeUrlParams ? window.location.search: '');
}

/**
 * parses the string in search for #{someJsToEval(params)} patterns, executes the found JS functions and reconstructs the string based on the values returned by the JS functions
 * source string example: Some text #{jsFunctionThatReturnsVal1(params)} some other text #{jsFunctionThatReturnsVal2(params)}
 * which produces result: Some text 3 some other text js result
 * @param sParam
 * @returns {string}
 */
const parseDynamicJsString = function (sParam) {
  const sParamTokens = sParam.split(' ');
  let sRet = '';
  for (i = 0; i < sParamTokens.length; i++) {
    if (sParamTokens[i].indexOf('#{') >= 0) {
      sParamTokens[i] = eval(sParamTokens[i].substring(2, sParamTokens[i].length - 1));
    }
    sRet += sParamTokens[i] + " ";
  }

  return sRet.substring(0, sRet.length - 1);
}
