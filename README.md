# Personal Portfolio Website

A modern, responsive portfolio website built with React and Vite. Features a beautiful UI with smooth animations and a clean design.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive layout
- 🚀 Fast performance with Vite
- 🎯 Smooth scroll navigation
- 🤖 AIChat section powered by local always-on fallback knowledge mode
- 💼 Sections: Hero, About, AIChat, Skills, Projects, Contact
- 🌙 Dark theme with accent colors

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start API server (fallback mode):
```bash
npm run dev:api
```

3. Start the frontend:
```bash
npm run dev:web
```

4. Open your browser and navigate to `http://localhost:5173/Hey_Stella/`

### Environment Setup

1. Copy env template:
```bash
cp .env.example .env
```

2. Optional settings in `.env`:
```bash
API_PORT=8787
MAX_REQUESTS_PER_WINDOW=20
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## AIChat Backend (Local Fallback)

- API server: `local-api-server.mjs`
- Knowledge context: `src/data/stellaKnowledge.json`
- Frontend endpoint: `/api/chat` via Vite proxy

For split hosting (frontend and API on different domains), set:
```bash
VITE_API_URL=https://your-api-domain.example.com/api
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, role, and description
   - Add your social media links

2. **About Section** (`src/components/About.jsx`):
   - Update the about text
   - Modify the technologies list

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add or remove skill categories
   - Update skill icons and names

4. **AIChat Context** (`src/data/stellaKnowledge.json`):
   - Add factual profile/project snippets
   - Keep entries concise for better retrieval quality

5. **Projects Section** (`src/components/Projects.jsx`):
   - Replace placeholder projects with your own
   - Update GitHub and demo links

6. **Contact Section** (`src/components/Contact.jsx`):
   - Update email address
   - Add your social media links
   - Connect the form to a backend service (optional)

### Styling

- Main color scheme is defined in `src/index.css` under `:root` variables

## 📂 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── AIChat.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── stellaKnowledge.json
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── local-api-server.mjs
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- React 18
- Vite
- React Icons
- CSS3 (Custom properties, Grid, Flexbox)

## License

This project is open source and available under the MIT License.
