[README.md](https://github.com/user-attachments/files/26171104/README.md)
# One|Life Wellness — Client Resource App

A between-session mental health companion for One|Life Wellness clients. Built with React. Deployable to Vercel in minutes.

---

## 🌿 What This App Does

- Clients personalize their experience by selecting focus areas (Anxiety, Depression, Trauma, Relationships, Stress, Grief)
- 24 evidence-based tools are curated to their selections (CBT, DBT, ACT, EMDR, Gottman, MBSR, and more)
- Interactive exercises: Box Breathing (animated) and 5-4-3-2-1 Grounding
- Between-session usage guidance for every tool
- Crisis resources screen (988, Crisis Text Line, One|Life direct line)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/onelife-wellness-app.git
cd onelife-wellness-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at `http://localhost:3000`.

---

## ☁️ Deploy to Vercel (Free — Recommended)

Vercel gives you a live URL in under 2 minutes.

### Option A — GitHub Integration (easiest, auto-deploys on every push)

1. Push this repo to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Click **Deploy** — that's it

Every time you push to `main`, Vercel re-deploys automatically.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 📦 Push to GitHub

```bash
# Inside the project folder:
git init
git add .
git commit -m "Initial commit — One|Life Wellness App"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/onelife-wellness-app.git
git branch -M main
git push -u origin main
```

---

## 📁 Project Structure

```
onelife-wellness-app/
├── public/
│   └── index.html              # App shell
├── src/
│   ├── index.js                # React entry point
│   ├── index.css               # Global styles + fonts
│   ├── App.js                  # Root component
│   ├── components/
│   │   └── OneLifeApp.jsx      # Main app (all screens & UI)
│   └── data/
│       ├── tools.js            # ← Edit tools & focus areas here
│       └── theme.js            # ← Edit colors here
├── vercel.json                 # Vercel deployment config
├── package.json
├── .gitignore
└── README.md
```

---

## ✏️ How to Add or Edit Tools

Open `src/data/tools.js`. Each tool follows this shape:

```js
{
  id: "unique-id",
  type: "tool" | "exercise" | "interactive",
  title: "Tool Name",
  subtitle: "Brief Clinical Label",
  description: "What this tool does and why it works.",
  duration: "5–10 min",
  tag: "CBT-Based",          // shown as a badge
  icon: "📝",                // emoji icon
  betweenSessionTip: "How the client should use this between sessions.",
}
```

To add a new focus area, add an entry to `FOCUS_AREAS` and a matching key in `TOOLS`.

---

## 🎨 How to Update Colors / Branding

Open `src/data/theme.js` and update the `COLORS` object. Changes will reflect app-wide.

---

## 🔒 HIPAA Note

This app does **not** collect, store, or transmit any personal health information (PHI). It is a stateless, client-side tool — no backend, no database, no user accounts. It is safe to share with clients via URL.

---

## 📞 One|Life Wellness Contact

- **Phone:** 864.505.9198
- **Text:** 336.202.4674
- **Email:** nate@onelifeservices.org
- **Website:** [onelifeservices.org](https://onelifeservices.org)

---

*Built for One|Life Wellness LLC © 2025. All rights reserved.*
