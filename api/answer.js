/**
 * /api/answer — records a player's answer.
 * Early reveal (all answered) is handled by the next /api/tick call
 * from the TV browser, keeping all timer logic in one place.
 */
const { getRoom, setRoom } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code, playerId, answerIndex } = req.body || {};
  const ucode = code?.toUpperCase();
  const room  = await getRoom(ucode);

  if (!room || room.phase !== "question")
    return res.status(400).json({ error: "Not in question phase" });

  // Ignore duplicate answers
  if (room.answers[playerId] !== undefined)
    return res.status(200).json({ ok: true });

  room.answers[playerId] = answerIndex;
  await setRoom(ucode, room);
  await broadcast(ucode, room);

  res.status(200).json({ ok: true });
};
