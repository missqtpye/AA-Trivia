/**
 * /api/start  — sets phase to "question" and broadcasts.
 * The timer is now driven by the TV browser (see index.html),
 * which calls /api/tick every second and /api/reveal when time runs out.
 * This avoids Vercel killing setTimeout when the function response returns.
 */
const { getRoom, setRoom } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body || {};
  const room = await getRoom(code?.toUpperCase());
  if (!room)                    return res.status(404).json({ error: "Room not found" });
  if (room.players.length === 0) return res.status(400).json({ error: "Need at least 1 player" });

  room.phase    = "question";
  room.timeLeft = room.timePerQ;
  await setRoom(code, room);
  await broadcast(code, room);

  res.status(200).json({ ok: true });
};
