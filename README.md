# Personal Portfolio Website

A modern, responsive portfolio website built with React and Vite. Features a beautiful UI with smooth animations and a clean design.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive layout
- 🚀 Fast performance with Vite
- 🎯 Smooth scroll navigation
- 💼 Sections: Hero, About, Skills, Projects, Contact
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

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
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

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace placeholder projects with your own
   - Update GitHub and demo links

5. **Contact Section** (`src/components/Contact.jsx`):
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
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
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

<img src="/images/image.png" alt="Chatbot Icon" className="chatbot-icon" />
