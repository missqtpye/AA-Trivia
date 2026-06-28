const { getRoom } = require("../lib/store");

module.exports = (req, res) => {
  const code = (req.query.code || "").toUpperCase();
  const room = getRoom(code);
  if (!room) return res.status(404).json({ error: "Room not found" });
  res.status(200).json({ state: room });
};
