// Serves the Pusher public credentials to the frontend.
// This way the frontend never needs hardcoded keys — it fetches them on load.
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    key:     process.env.PUSHER_KEY,
    cluster: process.env.PUSHER_CLUSTER,
  });
};
