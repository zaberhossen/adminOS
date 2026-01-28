# 🎓 StudyOS

> A PostHog-inspired desktop operating system interface for modern student learning.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange)](https://github.com/pmndrs/zustand)

StudyOS transforms the traditional learning platform into an immersive desktop OS experience. Every page becomes a draggable, resizable window in a retro-inspired interface that makes learning feel like exploring a computer from the golden age of software.

![StudyOS Desktop](https://github.com/user-attachments/assets/e2d8337a-69b9-4e6c-83f4-98bb09588beb)

## ✨ Features

### 🪟 Full Desktop Experience
- **Draggable Windows** - Move windows freely across the desktop
- **Resizable Windows** - Adjust window size with min/max constraints
- **Window Snapping** - Snap windows to left/right half of screen
- **Minimize/Maximize** - Full window management controls
- **Focus Management** - Click any window to bring it to front
- **Smooth Animations** - Framer Motion powered transitions

### 🎨 Customization
- **7 Beautiful Wallpapers** - From retro gradients to classic Bliss
- **Theme Switching** - Light, dark, and system themes
- **Draggable Icons** - Customize your desktop layout
- **Persistent Settings** - Your preferences are saved locally

### ⌨️ Keyboard Shortcuts
- `Cmd/Ctrl + W` - Close focused window
- `Cmd/Ctrl + M` - Minimize focused window
- `Cmd/Ctrl + Shift + M` - Maximize focused window
- `Cmd/Ctrl + Shift + W` - Close all windows

### 📱 Responsive Design
- **Desktop Mode** - Full OS experience on larger screens
- **Boring Mode** - Traditional navigation fallback
- **Mobile Optimized** - Automatic mode switching

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/zaberhossen/studyos.git
cd studyos

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Architecture

StudyOS uses a custom windowing system built with Zustand and Framer Motion:

```
Desktop Wrapper (Fixed Container)
├── Menu Bar (macOS-style top bar)
├── Desktop Area (Window container)
│   ├── Desktop Icons (Draggable)
│   └── Windows (Multiple, managed)
│       ├── Window Chrome (Title bar, controls)
│       ├── Window Content (Page content)
│       └── Resize Handles (8-direction resize)
└── Taskbar (Active window list)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 📚 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Smooth animations |
| **Tailwind CSS v4** | Utility-first styling |
| **Radix UI** | Accessible component primitives |
| **Lucide React** | Modern icon system |

## 🎯 Design Philosophy

StudyOS follows a **Neobrutalist-Industrial** aesthetic:

- **High Contrast**: Sharp edges and bold borders
- **Glassmorphism**: Subtle blur effects for depth
- **Retro Chrome**: Windows 95/XP-inspired window decorations
- **Typography**: Plus Jakarta Sans + JetBrains Mono

### Color Palette

```css
--background: #050505  /* Deep Black */
--surface: #111111     /* Elevated Black */
--primary: #F54E00     /* PostHog Orange */
--muted: #A1A1AA       /* Zinc-400 */
--border: #242424      /* Dark Border */
```

## 📖 Usage

### Creating a New Page Window

```tsx
"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function MyPage() {
  const { addWindow } = useDesktop()
  
  useEffect(() => {
    addWindow({
      id: `my-page-${Date.now()}`,
      path: "/my-page",
      title: "My Page",
      icon: "🎯",
      element: (
        <div className="p-8">
          <h1>Hello from window!</h1>
        </div>
      )
    })
  }, [addWindow])
  
  return null
}
```

### Adding a Desktop Icon

```typescript
// src/components/desktop/desktop-icons.tsx
export const DESKTOP_ICONS: DesktopIcon[] = [
  {
    id: "my-app",
    label: "My App",
    icon: "🎯",
    path: "/my-page",
  },
  // ... more icons
]
```

### Configuring Window Behavior

```typescript
// src/stores/desktop-store.ts
const APP_SETTINGS: Record<string, AppSettings> = {
  "/my-page": {
    size: {
      min: { width: 600, height: 400 },
      max: { width: 1000, height: 800 },
    },
    position: { center: true },
  },
}
```

## 🗂️ Project Structure

```
studyos/
├── src/
│   ├── app/
│   │   ├── (desktop)/       # Desktop-enabled pages
│   │   │   ├── courses/
│   │   │   ├── library/
│   │   │   ├── notes/
│   │   │   └── ...
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── desktop/         # Desktop environment
│   │   ├── menu-bar/        # Top menu bar
│   │   ├── taskbar/         # Bottom taskbar
│   │   ├── window/          # Window components
│   │   └── ui/              # Shadcn UI
│   ├── hooks/
│   │   ├── use-desktop.ts
│   │   └── use-keyboard-shortcuts.ts
│   ├── stores/
│   │   └── desktop-store.ts # Zustand state
│   └── types/
│       ├── window.ts
│       └── desktop.ts
├── public/
├── ARCHITECTURE.md
└── package.json
```

## 🎨 Available Pages

- **Home** (`/`) - Welcome page with feature overview
- **Courses** (`/courses`) - Course catalog with cards
- **Library** (`/library`) - Resource library with sidebar
- **Notes** (`/notes`) - Note-taking interface
- **Blog** (`/blog`) - Blog posts and articles
- **Store** (`/store`) - Learning materials store
- **Settings** (`/settings`) - Theme and preference settings
- **Display** (`/display`) - Wallpaper and visual settings

## 🐛 Debugging

### Windows Not Appearing

1. Check browser console for errors
2. Verify `desktop-wrapper` has `position: fixed`
3. Ensure html/body have `h-full` classes
4. Check window positioning calculations

### Layout Issues

1. Verify `menuBarHeight` (44px) in calculations
2. Check `taskbarHeight` (44px) in calculations  
3. Inspect element positions in DevTools
4. Test on different screen sizes

### State Problems

1. Use React DevTools to inspect Zustand store
2. Check for duplicate window prevention
3. Verify `useEffect` dependencies
4. Clear localStorage if settings are corrupted

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow existing component patterns
- Add proper TypeScript types
- Test on multiple screen sizes
- Ensure SEO compatibility
- Document new features

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **PostHog** - Inspiration for the desktop OS interface ([posthog.com](https://posthog.com))
- **Vercel** - Next.js framework and hosting
- **Tailwind Labs** - Tailwind CSS
- **Radix UI** - Accessible components
- **Framer** - Motion animation library

## 📬 Contact

- **GitHub**: [@zaberhossen](https://github.com/zaberhossen)
- **Project**: [studyos](https://github.com/zaberhossen/studyos)

## 🔮 Roadmap

- [ ] Multiple virtual desktops
- [ ] Window grouping/tabbing
- [ ] More keyboard shortcuts
- [ ] Touch gestures for mobile
- [ ] Session restore
- [ ] Custom window themes
- [ ] Screen reader support
- [ ] Real-time collaboration features

---

Built with ❤️ for students who love retro computing and modern learning.
