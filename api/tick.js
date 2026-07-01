const { getRoom, setRoom } = require("../lib/redis");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { code } = req.body || {};
  const ucode = (code || "").toUpperCase();
  const room  = await getRoom(ucode);
  if (!room || room.phase !== "question")
    return res.status(200).json({ phase: room?.phase || "unknown" });

  // All answered or time ran out — reveal
  const allAnswered = room.players.length > 0 &&
    Object.keys(room.answers).length >= room.players.length;

  if (allAnswered || room.timeLeft <= 1) {
    const q = room.questions[room.currentQ];
    room.correctAnswerers = [];
    Object.entries(room.answers).forEach(([pid, ans]) => {
      if (ans === q.a) {
        const bonus = Math.floor((room.timeLeft / room.timePerQ) * 50);
        room.scores[pid] = (room.scores[pid] || 0) + q.pts + bonus;
        room.correctAnswerers.push(pid);
      }
    });
    room.phase = "reveal";
    await setRoom(ucode, room);
    await broadcast(ucode, room);
    return res.status(200).json({ phase: "reveal" });
  }

  // Normal tick
  room.timeLeft--;
  await setRoom(ucode, room);
  await broadcast(ucode, room);
  res.status(200).json({ phase: "question", timeLeft: room.timeLeft });
};
