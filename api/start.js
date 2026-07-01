const { getRoom, setRoom } = require("../lib/redis");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { code } = req.body || {};
  const ucode = (code || "").toUpperCase();
  const room  = await getRoom(ucode);
  if (!room)                     return res.status(404).json({ error: "Room not found" });
  if (room.players.length === 0) return res.status(400).json({ error: "Need at least 1 player" });
  room.phase    = "question";
  room.timeLeft = room.timePerQ;
  await setRoom(ucode, room);
  await broadcast(ucode, room);
  res.status(200).json({ ok: true });
};
