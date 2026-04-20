# Dark Mode Theme Switcher

A modern, interactive dark mode theme switcher application built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with smooth animations, multiple theme presets, and a live preview section.

## Features

- Dark mode and light mode themes with smooth transitions
- Multiple color presets (Luna, Midnight, Ocean, and more)
- Smooth animations with Framer Motion
- Fully responsive and mobile-optimized design
- Live theme preview
- Built with Vite for blazing-fast development
- Professional UI components from Radix UI and shadcn
- Type-safe with TypeScript

## Tech Stack

- Frontend: React 19 + TypeScript
- Styling: Tailwind CSS 3.4 + CSS Animations
- UI Components: Radix UI + shadcn/ui (40+ components)
- Animations: Framer Motion 12.38
- Build Tool: Vite 7.2
- Forms: React Hook Form + Zod validation
- State Management: React Context API
- Icons: Lucide React
- Router: React Router v7

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000/` (or next available port)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── ui/                    # shadcn/ui component library
│   ├── ColorSwatch.tsx
│   ├── FeatureCard.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── sections/                  # Page sections
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── LivePreviewSection.tsx
│   ├── HowItWorksSection.tsx
│   └── ThemePresetsSection.tsx
├── hooks/                     # Custom React hooks
│   ├── useTheme.tsx
│   └── useScrollPosition.ts
├── pages/                     # Page components
│   └── Home.tsx
├── lib/                       # Utility functions
│   └── utils.ts
├── App.tsx                    # Root component
├── App.css                    # App-specific styles
├── index.css                  # Global styles + theme variables
└── main.tsx                   # Entry point
```

## Theme System

The application features a comprehensive theme system with:

- Light Mode: Clean, bright interface (Luna theme)
- Dark Mode: Eye-friendly dark interface
- Multiple Presets: Midnight, Ocean, and more
- Persistent Storage: Theme preference saved to localStorage
- System Preference Detection: Auto-detects OS dark mode setting
- Smooth Transitions: All theme changes animate smoothly

## Connect

- GitHub: [@huncho-dev](https://github.com/felladaniel36-hash)

## Author

Huncho.Dev - Modern web development

Created for modern web applications with attention to detail and performance.

## License

MIT

---

Last Updated: April 2026
