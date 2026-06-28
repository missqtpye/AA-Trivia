[README.md](https://github.com/user-attachments/files/29426172/README.md)
# AA Trivia 🎵
African American Trivia Game — multiplayer, up to 8 players.
Hosted on Vercel · Real-time via Pusher · No local server needed.

---

## One-Time Setup (~15 minutes)

### Step 1 — Get a free Pusher account

1. Go to **pusher.com** and click **Sign Up** (free, no credit card)
2. After signing in, click **"Create app"**
3. Name it `aa-trivia`, pick any cluster close to you (e.g. `us2` if you're in the US)
4. Click **Create app**
5. Go to the **"App Keys"** tab — you'll see 4 values you need:
   - `app_id`
   - `key`
   - `secret`
   - `cluster`

Keep this tab open — you'll paste these into Vercel in Step 3.

---

### Step 2 — Add your files to GitHub

Upload these files to your `aa-trivia` repo in this exact structure.
On GitHub from your phone or laptop, use **Add file → Create new file**
and type the full path (e.g. `api/create.js`) — GitHub creates the folders for you.

```
aa-trivia/
├── package.json
├── vercel.json
├── README.md
├── api/
│   ├── create.js
│   ├── join.js
│   ├── start.js
│   ├── answer.js
│   ├── rematch.js
│   └── room.js
├── lib/
│   ├── questions.js
│   ├── store.js
│   └── pusher.js
└── public/
    └── index.html
```

---

### Step 3 — Deploy on Vercel

1. Go to **vercel.com** and sign in with GitHub
2. Click **"Add New Project"** → Import your `aa-trivia` repo
3. On the configuration screen:
   - **Framework Preset:** `Other`
   - **Root Directory:** leave as `/` (the repo root)
   - **Build Command:** leave blank
   - **Output Directory:** `public`
4. Open **Environment Variables** and add these 4 (from your Pusher App Keys tab):

   | Name | Value |
   |------|-------|
   | `PUSHER_APP_ID` | your app_id |
   | `PUSHER_KEY` | your key |
   | `PUSHER_SECRET` | your secret |
   | `PUSHER_CLUSTER` | your cluster (e.g. `us2`) |

5. Click **Deploy** — Vercel builds and deploys in about 30 seconds

---

### Step 4 — Add your Pusher key to the frontend

The frontend HTML needs your **Pusher key** and **cluster** hardcoded so the
browser can connect. Do this once after your first deploy:

1. In your `public/index.html`, find these two lines near the top of the `<script>`:
   ```js
   const PUSHER_KEY     = "PUSHER_KEY_PLACEHOLDER";
   const PUSHER_CLUSTER = "PUSHER_CLUSTER_PLACEHOLDER";
   ```
2. Replace the placeholders with your actual Pusher **key** and **cluster**
   (these are public-safe — only the secret stays on the server)
3. Commit and push — Vercel redeploys automatically

---

## Game Night

### TV / Host screen
1. Open your Vercel URL on your **TV's browser** (or screenshare from your laptop)
2. Click **📺 TV View** in the top right (or add `#tv` to the URL)
3. Pick rounds & time, click **Create Room**
4. A big 5-letter **room code** appears on screen

### Players (phones)
1. Everyone opens the **same Vercel URL** on their phone (any internet connection — no shared WiFi needed!)
2. The page defaults to **📱 Phone View**
3. Enter the room code + name → appear on the TV lobby screen

### Play
- Host taps **Start Game** when everyone's in
- **TV shows** the question + big answer choices + live scoreboard
- **Phones show** 4 giant buzzer buttons — tap to lock in your answer
- Answering faster = speed bonus points
- After each question: correct answer reveals on TV, phones show ✅ or ❌
- Final podium + full leaderboard at the end

---

## Troubleshooting

**"Room not found" error** — The server uses in-memory storage, which resets if Vercel cold-starts a new instance. Just create a new room. (For persistence across restarts, a free Redis add-on like Upstash can be added later.)

**Players not seeing updates** — Check that the Pusher key and cluster in `index.html` match what's in your Vercel environment variables exactly.

**Vercel deploy fails** — Make sure `vercel.json` is in the root of the repo and the `api/` folder is also at root level.
