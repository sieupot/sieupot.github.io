/**
 *
 * @param inMillis - if TRUE return in milliseconds
 *                   else return in seconds
 * @returns {number}
 */
const getCommandRepeatInterval = (inMillis) => {
  let sessionCmdRepeatInterval = sessionStorage.getItem('commandRepeatInterval');
  const commandRepeatInterval = (sessionCmdRepeatInterval ? sessionCmdRepeatInterval : 15);

  console.log(`Interval repetare comanda: ${commandRepeatInterval} secunde.`);
  return inMillis ? (commandRepeatInterval * 1000) : commandRepeatInterval;
}

const setSessionCommandRepeatInterval = (nbSeconds) => {
  sessionStorage.commandRepeatInterval = nbSeconds;
}
