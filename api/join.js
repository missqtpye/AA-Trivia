const { getRoom, setRoom } = require("../lib/redis");
const { broadcast } = require("../lib/pusher");

const EMOJIS = ["👑","🎤","🎵","🏆","⭐","🔥","💎","✨"];

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { code, name } = req.body || {};
  const ucode = (code || "").toUpperCase();
  const room  = await getRoom(ucode);
  if (!room)                    return res.status(404).json({ error: "Room not found. Check the code!" });
  if (room.phase !== "lobby")   return res.status(400).json({ error: "Game already started!" });
  if (room.players.length >= 8) return res.status(400).json({ error: "Room is full!" });

  const player = {
    id:    "p_" + Date.now(),
    name:  (name || "Player").slice(0, 20),
    emoji: EMOJIS[room.players.length % 8],
  };
  room.players.push(player);
  room.scores[player.id] = 0;
  await setRoom(ucode, room);
  await broadcast(ucode, room);
  res.status(200).json({ player, state: room });
};
