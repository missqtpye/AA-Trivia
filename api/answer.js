const { getRoom, setRoom, clearTimer } = require("../lib/store");
const { broadcast } = require("../lib/pusher");
const { reveal } = require("./start");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code, playerId, answerIndex } = req.body || {};
  const room = getRoom(code?.toUpperCase());

  if (!room || room.phase !== "question")
    return res.status(400).json({ error: "Not in question phase" });

  // Ignore duplicate answers
  if (room.answers[playerId] !== undefined)
    return res.status(200).json({ ok: true });

  room.answers[playerId] = answerIndex;
  setRoom(code, room);
  await broadcast(code, room);

  // All players answered → reveal early
  if (Object.keys(room.answers).length >= room.players.length) {
    clearTimer(code);
    await reveal(code);
  }

  res.status(200).json({ ok: true });
};
