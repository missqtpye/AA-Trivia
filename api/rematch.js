const { ALL_QUESTIONS, shuffle } = require("../lib/questions");
const { getRoom, setRoom, clearTimer } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body || {};
  const room = await getRoom(code?.toUpperCase());
  if (!room) return res.status(404).json({ error: "Room not found" });

  clearTimer(code);
  room.phase            = "lobby";
  room.currentQ         = 0;
  room.answers          = {};
  room.correctAnswerers = [];
  room.questions        = shuffle(ALL_QUESTIONS).slice(0, room.questions.length);
  room.timeLeft         = room.timePerQ;
  room.scores           = {};
  room.players.forEach(p => { room.scores[p.id] = 0; });

  await setRoom(code, room);
  await broadcast(code, room);

  res.status(200).json({ ok: true, state: room });
};
