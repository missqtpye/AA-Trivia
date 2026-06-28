const { ALL_QUESTIONS, shuffle, genCode } = require("../lib/questions");
const { setRoom } = require("../lib/store");
const { broadcast } = require("../lib/pusher");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { numQ = 10, timePerQ = 20 } = req.body || {};
  const code = genCode();

  const state = {
    code,
    phase: "lobby",
    players: [],
    questions: shuffle(ALL_QUESTIONS).slice(0, numQ),
    currentQ: 0,
    answers: {},
    scores: {},
    correctAnswerers: [],
    timeLeft: timePerQ,
    timePerQ,
    createdAt: Date.now(),
  };

  await setRoom(code, state);
  await broadcast(code, state);

  res.status(200).json({ code, state });
};
