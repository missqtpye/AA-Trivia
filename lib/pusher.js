const Pusher = require("pusher");

const pusher = new Pusher({
  appId:   process.env.PUSHER_APP_ID,
  key:     process.env.PUSHER_KEY,
  secret:  process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS:  true,
});

/**
 * Broadcast the full game state to everyone in a room.
 * Channel name: "room-{CODE}"
 * Event name:   "state"
 */
async function broadcast(code, state) {
  await pusher.trigger(`room-${code}`, "state", { state });
}

module.exports = { pusher, broadcast };
