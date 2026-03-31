# Hey Stella — Personal Portfolio

A modern portfolio website built with React + Vite, including **Stella AIChat** in **always-on fallback mode**.

Stella answers from local structured knowledge (`stellaKnowledge`) so the site works reliably on both local development and static hosting (GitHub Pages) without requiring external LLM/API calls.

## Highlights

- 🎨 Modern responsive UI with smooth interactions
- 🤖 Stella AIChat with always-on local fallback answers
- 📚 Structured knowledge store with tags + metadata
- ⚡ Fast static build using Vite
- 🚀 GitHub Pages deployment via `gh-pages`

## Current AIChat Architecture

Stella supports two runtime paths:

1. **Local API mode** (when `local-api-server.mjs` is running)
   - Frontend calls `/api/chat`
   - API retrieves and ranks chunks from `src/data/stellaKnowledge.json`
   - API returns human-friendly fallback responses

2. **Static/GitHub Pages mode** (no Node server)
   - API call fails/unavailable on static host
   - `AIChat.jsx` automatically falls back to **client-side retrieval** from `stellaKnowledge`
   - Stella still answers (contact, experience, skills, etc.)

This design keeps Stella usable on GitHub Pages where server routes do not exist.

## Tech Stack

- React 18
- Vite 5
- React Icons
- Custom CSS
- `gh-pages` for static deploy

## Project Structure

```text
portfolio/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── AIChat.jsx
│   │   ├── AIChat.css
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── stellaKnowledge.json
│   ├── App.jsx
│   └── main.jsx
├── local-api-server.mjs
├── vite.config.js
├── package.json
└── README.md
```

## NPM Scripts

```bash
npm run dev        # Vite dev server (frontend only)
npm run dev:web    # Same as dev
npm run dev:api    # Local fallback API server on API_PORT (default 8787)
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run deploy     # Build + publish dist/ to gh-pages
```

## Environment Variables

Copy template:

```bash
cp .env.example .env
```

Supported vars (optional):

```bash
API_PORT=8787
MAX_REQUESTS_PER_WINDOW=20
VITE_API_URL=
```

- Keep `VITE_API_URL` empty for local Vite proxy usage.
- Set `VITE_API_URL` only if frontend and API are hosted on different domains.

## Local Development

### Option A — Full local (frontend + API)

Terminal 1:

```bash
npm run dev:api
```

Terminal 2:

```bash
npm run dev:web
```

Open:

```text
http://localhost:5173/Hey_Stella/
```

### Option B — Frontend only

```bash
npm run dev:web
```

Even without API running, Stella still answers using client-side fallback from local knowledge.

## API Endpoints (Local Server)

Base: `http://localhost:8787`

- `GET /api/health`
  - Returns status + fallback mode metadata

- `POST /api/chat`
  - Body:
    ```json
    { "message": "tell me sameer contact" }
    ```
  - Returns:
    ```json
    {
      "response": "...",
      "sources": ["Contact Details", "Profile Summary"],
      "fallbackActive": true
    }
    ```

## Knowledge Base (`stellaKnowledge`)

File: `src/data/stellaKnowledge.json`

Each chunk supports:

```json
{
  "id": "unique-id",
  "title": "Chunk title",
  "content": "Short factual text",
  "tags": ["contact", "experience"],
  "metadata": {
    "source": "resume",
    "section": "work-experience",
    "period": "May 2025 - present"
  }
}
```

### Authoring tips

- Keep `content` concise and factual.
- Add useful `tags` to improve retrieval quality.
- Use one idea per chunk for better matching.
- Update contact chunk whenever email/phone/social links change.

## GitHub Pages Deployment

This repository is configured for Pages with Vite base path:

- `vite.config.js` → `base: '/Hey_Stella/'`
- `npm run deploy` publishes `dist/` to `gh-pages`

Deploy command:

```bash
npm run deploy
```

Live URL:

```text
https://5ameer.github.io/Hey_Stella/
```

> Note: GitHub Pages is static hosting. `local-api-server.mjs` does **not** run there.
> Stella works on Pages via built-in client-side fallback retrieval.

## Troubleshooting

### 1) Stella not answering on Pages

- Hard refresh: `Cmd + Shift + R`
- Open in Incognito
- Confirm latest `gh-pages` publish completed

### 2) Local API port already in use

```bash
lsof -iTCP:8787 -sTCP:LISTEN -n -P
pkill -f "local-api-server.mjs"
npm run dev:api
```

### 3) Fallback badge always visible

Expected behavior by design in current architecture.

## Security Notes

- `.env` is ignored and should never be committed.
- No external LLM API calls are required in current always-on fallback mode.

## License

This project is open source and available under the MIT License.
