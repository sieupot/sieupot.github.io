/**
 *
 * @param inMillis - if TRUE return in milliseconds
 *                   else return in seconds
 * @returns {number}
 */
const getCommandRepeatInterval = (inMillis = true) => {
  let sessionCmdRepeatIntervalSeconds = sessionStorage.getItem('commandRepeatIntervalSeconds');
  const commandRepeatIntervalSeconds = (sessionCmdRepeatIntervalSeconds ? sessionCmdRepeatIntervalSeconds : 15);

  return inMillis ? (commandRepeatIntervalSeconds * 1000) : commandRepeatIntervalSeconds;
}

const setSessionProperty = (property, nbSeconds) => {
  sessionStorage[property] = nbSeconds;
}
