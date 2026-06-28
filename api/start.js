const { getRoom, setRoom, setTimer, clearTimer } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

async function tick(code) {
  const room = await getRoom(code);
  if (!room || room.phase !== "question") return;

  if (room.timeLeft <= 1) {
    await reveal(code);
  } else {
    room.timeLeft--;
    await setRoom(code, room);
    await broadcast(code, room);
    const id = setTimeout(() => tick(code), 1000);
    setTimer(code, id);
  }
}

async function reveal(code) {
  const room = await getRoom(code);
  if (!room) return;

  const q       = room.questions[room.currentQ];
  const correct = q.a;
  room.correctAnswerers = [];

  Object.entries(room.answers).forEach(([pid, ans]) => {
    if (ans === correct) {
      const speedBonus = Math.floor((room.timeLeft / room.timePerQ) * 50);
      room.scores[pid] = (room.scores[pid] || 0) + q.pts + speedBonus;
      room.correctAnswerers.push(pid);
    }
  });

  room.phase = "reveal";
  await setRoom(code, room);
  await broadcast(code, room);

  const id = setTimeout(() => next(code), 5000);
  setTimer(code, id);
}

async function next(code) {
  const room = await getRoom(code);
  if (!room) return;

  const nextQ = room.currentQ + 1;
  if (nextQ >= room.questions.length) {
    room.phase = "final";
    await setRoom(code, room);
    await broadcast(code, room);
    return;
  }

  room.currentQ         = nextQ;
  room.answers          = {};
  room.correctAnswerers = [];
  room.timeLeft         = room.timePerQ;
  room.phase            = "question";
  await setRoom(code, room);
  await broadcast(code, room);

  const id = setTimeout(() => tick(code), 1000);
  setTimer(code, id);
}

module.exports.reveal = reveal;
module.exports.tick   = tick;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body || {};
  const room = await getRoom(code?.toUpperCase());
  if (!room) return res.status(404).json({ error: "Room not found" });
  if (room.players.length === 0) return res.status(400).json({ error: "Need at least 1 player" });

  clearTimer(code);
  room.phase    = "question";
  room.timeLeft = room.timePerQ;
  await setRoom(code, room);
  await broadcast(code, room);

  const id = setTimeout(() => tick(code), 1000);
  setTimer(code, id);

  res.status(200).json({ ok: true });
};
