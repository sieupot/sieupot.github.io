// used for the PWA registration of the service worker
/*if ('serviceWorker' in navigator) {
  // register service worker
  let swVersion = '1.0';
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log(`Service Worker ${swVersion} registered!`)
  }).catch(error => {
    console.error(`Service Worker ${swVersion} registration failed!`, error)
  });
}*/

/**
 *
 * @param inMillis - if TRUE return in milliseconds
 *                   else return in seconds
 * @returns {number}
 */
const getCommandRepeatInterval = (inMillis = true) => {
  const sessionCmdRepeatIntervalSeconds = sessionStorage.getItem('commandRepeatIntervalSeconds');
  const commandRepeatIntervalSeconds = (sessionCmdRepeatIntervalSeconds ? sessionCmdRepeatIntervalSeconds : 15);

  return inMillis ? (commandRepeatIntervalSeconds * 1000) : commandRepeatIntervalSeconds;
}

/**
 *
 * @returns {string|boolean}
 */
const getDisplayActivityTimer = () => {
  const displayActivityTimer = sessionStorage.getItem('displayActivityTimer');
  return displayActivityTimer === true || displayActivityTimer === 'true';
}

const setSessionProperty = (property, value) => {
  sessionStorage[property] = value;
}
