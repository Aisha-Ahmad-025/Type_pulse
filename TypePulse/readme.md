# ⌨️ TypePulse

**Discover your typing rhythm.**

TypePulse is a front-end web app that goes beyond simple WPM tracking. It analyzes the *timing* between your keystrokes — bursts, pauses, and flow — to reveal your unique typing personality.

---

## ✨ Features

- **Live Typing Arena** — Type a randomly selected passage while TypePulse tracks your performance in real time.
- **Real-Time Metrics** — Timer, WPM (words per minute), accuracy, and rhythm status update as you type.
- **Live Analysis Panel** — Watch your current flow, last pause duration, keystroke count, and rhythm score evolve live.
- **Typing Personality Engine** — After each session, your keystroke timing and accuracy are analyzed to assign you one of several typing personalities:
  - 🐎 The Wild Typer
  - 🎯 The Precision Mind
  - 💥 The Burst Typer
  - 🌊 The Steady Flow
  - 🧠 The Deep Thinker
  - 🔀 The Adaptive Typer
- **Session History** — Every completed session is saved locally, with a history page showing all past sessions plus summary stats (best WPM, average accuracy, best score).
- **Clear History** — Wipe your saved session data anytime.
- **Fully Responsive UI** — Clean, dark, futuristic design that adapts across desktop, tablet, and mobile.

---

## 🗂️ Project Structure

```
typepulse/
├── html/ (or root)
│   ├── index.html        # Landing page
│   ├── arena.html        # Typing arena (main experience)
│   └── history.html      # Session history page
├── css/
│   ├── style.css         # Global styles, variables, navbar
│   ├── home.css          # Landing page styles
│   ├── arena.css         # Arena page styles
│   └── history.css       # History page styles
├── js/
│   ├── arena.js          # Typing logic, metrics, personality analysis
│   └── history.js        # History rendering & summary stats
└── README.md
```

> Note: HTML files reference stylesheets/scripts via `../css/` and `../js/`, so keep the folder structure above (or update the paths to match your own layout).

---

## 🚀 Getting Started

TypePulse is a pure HTML/CSS/JavaScript project — no build tools, frameworks, or dependencies required.

1. **Clone or download** this repository.
2. Make sure the folder structure matches the paths referenced in the HTML files (`css/` and `js/` folders alongside the HTML, or update the `href`/`src` paths).
3. Open `index.html` in your browser.

That's it — no `npm install`, no server required. (Optionally, serve it with a local dev server like VS Code's Live Server for a smoother experience.)

---

## 🕹️ How It Works

1. **Type** — Head to the Arena and type the given passage naturally, without trying to game the system.
2. **Analyze** — As you type, TypePulse measures the time between every keystroke, flags pauses over 1 second, and tracks correctness against the passage.
3. **Discover** — Once you finish the passage, TypePulse calculates your WPM, accuracy, and rhythm score, then reveals your typing personality along with descriptive tags.
4. **Track Progress** — Every session is saved to your browser's local storage and viewable on the History page.

---

## 📊 How Metrics Are Calculated

| Metric | Description |
|---|---|
| **WPM** | `(characters typed / 5) / minutes elapsed` |
| **Accuracy** | Percentage of typed characters matching the passage at each position |
| **Rhythm Status** | `BURST` (<150ms between keys), `PAUSED` (>1000ms), or `ACTIVE` (in between) |
| **Current Flow** | Rolling average of the last 5 keystroke intervals — `BURSTING`, `FLOWING`, `STEADY`, or `PAUSED` |
| **Rhythm Score** | Starts at 100, minus 3 points per pause (>1s) and minus 10 if average keystroke interval exceeds 500ms |
| **Typing Personality** | Derived from a combination of accuracy, average keystroke interval, and pause count |

---

## 💾 Data Storage

TypePulse uses the browser's `localStorage` to persist data — no backend or database needed:

- `typepulseHistory` — array of all completed session results
- `typepulseLastPassage` — the last shown passage, used to avoid repeats

Your data stays entirely on your device and can be cleared anytime via the **Clear History** button on the History page.

---

## 🛠️ Built With

- **HTML5**
- **CSS3** (custom properties, Grid, Flexbox, animations)
- **Vanilla JavaScript** (no frameworks or libraries)

---



---

*TypePulse © 2026 — Built with HTML, CSS & JavaScript*