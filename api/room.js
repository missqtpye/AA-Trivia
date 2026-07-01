const { QUESTIONS, shuffle } = require("../lib/questions");
const { getRoom, setRoom } = require("../lib/redis");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { code } = req.body || {};
  const ucode = (code || "").toUpperCase();
  const room  = await getRoom(ucode);
  if (!room) return res.status(404).json({ error: "Room not found" });
  room.phase = "lobby";
  room.currentQ = 0;
  room.answers = {};
  room.correctAnswerers = [];
  room.questions = shuffle(QUESTIONS).slice(0, room.questions.length);
  room.timeLeft = room.timePerQ;
  room.scores = {};
  room.players.forEach(p => { room.scores[p.id] = 0; });
  await setRoom(ucode, room);
  await broadcast(ucode, room);
  res.status(200).json({ ok: true, state: room });
};
