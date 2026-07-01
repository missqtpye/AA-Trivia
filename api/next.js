const { getRoom, setRoom } = require("../lib/redis");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { code } = req.body || {};
  const ucode = (code || "").toUpperCase();
  const room  = await getRoom(ucode);
  if (!room) return res.status(404).json({ error: "Room not found" });

  const nextQ = room.currentQ + 1;
  if (nextQ >= room.questions.length) {
    room.phase = "final";
  } else {
    room.currentQ        = nextQ;
    room.answers         = {};
    room.correctAnswerers = [];
    room.timeLeft        = room.timePerQ;
    room.phase           = "question";
  }
  await setRoom(ucode, room);
  await broadcast(ucode, room);
  res.status(200).json({ phase: room.phase });
};
