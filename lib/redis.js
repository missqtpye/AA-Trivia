const URL   = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const TTL   = 60 * 60 * 2; // 2 hours

async function cmd(...args) {
  const res = await fetch(
    `${URL}/${args.map(a => encodeURIComponent(a)).join("/")}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const data = await res.json();
  return data.result;
}

async function getRoom(code) {
  const raw = await cmd("GET", `room:${code}`);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

async function setRoom(code, state) {
  await cmd("SET", `room:${code}`, JSON.stringify(state), "EX", String(TTL));
}

module.exports = { getRoom, setRoom };
