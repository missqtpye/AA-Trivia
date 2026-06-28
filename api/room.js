const { getRoom } = require("../lib/store");

module.exports = async (req, res) => {
  const code = (req.query.code || "").toUpperCase();
  const room = await getRoom(code);
  if (!room) return res.status(404).json({ error: "Room not found" });
  res.status(200).json({ state: room });
};
