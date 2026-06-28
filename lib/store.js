/**
 * In-memory game room store.
 * Vercel Serverless functions share memory within the same instance,
 * which works perfectly for a local game session.
 */

const rooms  = {};   // code -> gameState
const timers = {};   // code -> timeoutId

function getRoom(code) {
  return rooms[code] || null;
}

function setRoom(code, state) {
  rooms[code] = state;
}

function deleteRoom(code) {
  clearTimeout(timers[code]);
  delete rooms[code];
  delete timers[code];
}

function getTimer(code) {
  return timers[code];
}

function setTimer(code, id) {
  timers[code] = id;
}

function clearTimer(code) {
  clearTimeout(timers[code]);
  delete timers[code];
}

module.exports = { getRoom, setRoom, deleteRoom, getTimer, setTimer, clearTimer };
