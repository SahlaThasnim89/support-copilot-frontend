# 🖥️ Support Copilot — Frontend

React frontend for the RAG-based Support Copilot system.
Allows support agents to get AI-suggested replies grounded in past support tickets.

---

## 🌐 Live URLs

| | URL |
|---|---|
| 🖥️ Frontend | `https://your-frontend.netlify.app` |
| ⚙️ Backend Repo | `https://github.com/SahlaThasnim89/support-copilot-backend.git` |
| ⚙️ Backend API | `https://support-copilot-backend.onrender.com` |
| 📖 API Docs | `https://support-copilot-backend.onrender.com/docs` |


---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Plain CSS (no framework) |
| Hosting | Netlify |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                   ← Root component, manages state
│   ├── index.css                 ← All styles
│   ├── main.jsx                  ← React entry point
│   ├── api/
│   │   └── copilot.js            ← API calls to FastAPI backend
│   └── components/
│       ├── QueryInput.jsx        ← Input box + example query chips
│       ├── SuggestedReply.jsx    ← AI reply display + 👍👎 feedback
│       ├── Citations.jsx         ← Retrieved past tickets display
│       └── LoadingState.jsx      ← Animated 3-step loading indicator
├── public/
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## ✨ Features

- **Query input** — type any customer message and get an AI-suggested reply
- **Example chips** — quick-try buttons for common support queries
- **Suggested reply** — AI-generated response grounded in past tickets
- **Citations** — shows exactly which past tickets were used with similarity scores
- **Loading state** — animated 3-step indicator showing embedding → retrieval → generation
- **👍 👎 Feedback** — rate suggestions to help improve the system
- **Copy reply** — one-click copy of the suggested reply
- **Fallback notice** — shows when Groq fallback was used instead of Gemini

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Backend API running (see [backend repo](https://github.com/SahlaThasnim89/support-copilot-backend.git))

---

### Step 1 — Clone and Install

```bash
git clone https://github.com/SahlaThasnim89/support-copilot-frontend.git
cd support-copilot-frontend
npm install
```

---

### Step 2 — Configure Environment

```bash
cp .env.example .env
```

Fill in your `.env`:
```env
VITE_API_URL=http://localhost:8000
```

> For production, set this to your deployed backend URL:
> `VITE_API_URL=https://your-backend.onrender.com`

---

### Step 3 — Run Dev Server

```bash
npm run dev
```

Opens at `http://localhost:5173`

---

### Step 4 — Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

---

## 🚀 Deployment on Netlify
 
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
3. Connect your GitHub repo
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variable under **Site settings → Environment variables**:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.onrender.com`
6. Click **Deploy site**
> **Note:** For client-side routing, add a `_redirects` file inside the `public/` folder with:
> ```
> /* /index.html 200
> ```
 
---

## 🔌 API Integration

All backend calls are in `src/api/copilot.js`:

| Function | Endpoint | Description |
|---|---|---|
| `suggestReply(message)` | `POST /suggest-reply` | Get AI reply + citations |
| `submitFeedback(data)` | `POST /feedback` | Submit 👍👎 rating |

The backend URL is read from `VITE_API_URL` environment variable.

---

## 🖼️ UI Overview

```
┌────────────────────────────────────────┐
│  🤖 Support Copilot                    │
│  AI-powered reply suggestions          │
├────────────────────────────────────────┤
│  Customer Query                        │
│  ┌──────────────────────────────────┐  │
│  │ Type customer message here...    │  │
│  └──────────────────────────────────┘  │
│  [example chip] [example chip]         │
│                    [Get Suggestion →]  │
├────────────────────────────────────────┤
│   Loading (animated steps)           │
│   Embedding your query...            │
│   Searching past tickets...          │
│   Generating reply...                │
├────────────────────────────────────────┤
│  💬 Suggested Reply      👍 👎         │
│  ┌──────────────────────────────────┐  │
│  │ AI-generated reply text here...  │  │
│  └──────────────────────────────────┘  │
│  [📋 Copy Reply]                       │
├────────────────────────────────────────┤
│  📎 Retrieved Tickets (3 found)        │
│  ┌──────────────────────────────────┐  │
│  │ #1 Ticket abc123  billing  91%   │  │
│  │ Q: I was charged twice...        │  │
│  │ A: Refund within 3-5 days...     │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## ⚠️ Known Limitations

- No authentication — open to anyone with the URL
- No conversation history — each query is independent
- Requires backend to be running and seeded with tickets
