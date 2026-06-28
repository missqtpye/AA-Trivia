const { getRoom, setRoom } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

const EMOJIS = ["👑","🎤","🎵","🏆","⭐","🔥","💎","✨"];
const COLORS  = ["#E63946","#FFD700","#06D6A0","#4CC9F0","#F77F00","#C77DFF","#FF6B6B","#A8DADC"];

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code, name } = req.body || {};
  const room = getRoom(code?.toUpperCase());

  if (!room)               return res.status(404).json({ error: "Room not found. Check the code!" });
  if (room.phase !== "lobby") return res.status(400).json({ error: "Game already started!" });
  if (room.players.length >= 8) return res.status(400).json({ error: "Room is full (8 players max)!" });

  const idx    = room.players.length;
  const player = {
    id:    "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
    name:  (name || "Player " + (idx + 1)).slice(0, 20),
    emoji: EMOJIS[idx % 8],
    color: COLORS[idx % 8],
  };

  room.players.push(player);
  room.scores[player.id] = 0;
  setRoom(code, room);

  await broadcast(code, room);
  res.status(200).json({ player, state: room });
};
