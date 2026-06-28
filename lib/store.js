/**
 * Redis-backed game room store via Upstash REST API.
 * All Vercel serverless instances share the same Redis database,
 * so rooms created in one function are visible to all others.
 *
 * Rooms expire after 2 hours automatically (no cleanup needed).
 * Timers stay in-process (they're re-created on each start/tick call).
 */

const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const ROOM_TTL    = 60 * 60 * 2; // 2 hours in seconds

// In-process timer store (timers can't live in Redis — they're JS handles)
const timers = {};

// ─── REDIS HELPERS ────────────────────────────────────────────────────────────
async function redisCmd(...args) {
  const res = await fetch(`${REDIS_URL}/${args.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

// ─── ROOM CRUD ────────────────────────────────────────────────────────────────
async function getRoom(code) {
  const raw = await redisCmd("GET", `room:${code}`);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

async function setRoom(code, state) {
  await redisCmd("SET", `room:${code}`, JSON.stringify(state), "EX", String(ROOM_TTL));
}

async function deleteRoom(code) {
  clearTimer(code);
  await redisCmd("DEL", `room:${code}`);
}

// ─── TIMER HELPERS (in-process only) ─────────────────────────────────────────
function getTimer(code)   { return timers[code]; }
function setTimer(code, id) { timers[code] = id; }
function clearTimer(code) {
  clearTimeout(timers[code]);
  delete timers[code];
}

module.exports = { getRoom, setRoom, deleteRoom, getTimer, setTimer, clearTimer };
