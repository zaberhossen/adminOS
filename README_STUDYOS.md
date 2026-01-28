# StudyOS - Retro Desktop Learning Platform

<div align="center">

**An open-source student learning application with a nostalgic desktop OS interface**

Built with Next.js 15, Zustand, Shadcn UI, and Framer Motion

[Demo](http://localhost:3000) · [Documentation](#features) · [Report Bug](#troubleshooting)

</div>

---

## 🎯 Overview

StudyOS is a unique student learning platform that combines modern web technologies with a retro desktop operating system aesthetic inspired by PostHog.com. Instead of traditional web pages, StudyOS presents everything as draggable, resizable windows on a desktop interface.

### Key Features

- 🪟 **Full Desktop OS Experience** - Windows you can drag, resize, minimize, maximize, and snap
- 🎨 **Multiple Wallpapers** - 7 beautiful wallpapers including retro classics
- ⌨️ **Keyboard Shortcuts** - Power user shortcuts for window management
- 📱 **Responsive Design** - Desktop mode with mobile fallback
- 🎯 **State Persistence** - Remembers your wallpaper and icon positions
- 🚀 **Fast & Modern** - Built with Next.js 15 and Turbopack
- 🎭 **Retro Aesthetic** - Windows 95/XP inspired UI with modern UX

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd studyos

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

---

## 🏗️ Architecture

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **Zustand** | Lightweight state management |
| **Shadcn UI** | Beautiful, accessible components |
| **Framer Motion** | Smooth animations |
| **Tailwind CSS 4** | Utility-first styling |
| **TypeScript** | Type safety |

### Project Structure

```
studyos/
├── src/
│   ├── app/
│   │   ├── (desktop)/              # Desktop route group
│   │   │   ├── layout.tsx          # Desktop wrapper layout
│   │   │   ├── page.tsx            # Home page (opens home window)
│   │   │   ├── courses/            # Courses page
│   │   │   ├── library/            # Library page
│   │   │   ├── notes/              # Notes app
│   │   │   ├── blog/               # Blog page
│   │   │   ├── store/              # Store page
│   │   │   ├── settings/           # Settings
│   │   │   └── display/            # Display options
│   │   └── layout.tsx              # Root layout
│   ├── components/
│   │   ├── desktop/                # Desktop components
│   │   │   ├── desktop-wrapper.tsx # Main desktop wrapper
│   │   │   ├── desktop.tsx         # Desktop with icons
│   │   │   ├── desktop-icons.tsx   # Icon configuration
│   │   │   └── wallpapers.ts       # Wallpaper definitions
│   │   ├── window/                 # Window system
│   │   │   ├── window.tsx          # Main window component
│   │   │   ├── window-chrome.tsx   # Title bar and controls
│   │   │   └── resize-handles.tsx  # Resize functionality
│   │   ├── taskbar/                # Taskbar components
│   │   │   ├── taskbar.tsx         # Bottom taskbar
│   │   │   └── start-menu.tsx      # Start menu
│   │   ├── menu-bar/               # Top menu bar
│   │   │   └── menu-bar.tsx
│   │   ├── desktop-icon.tsx        # Desktop icon component
│   │   └── ui/                     # Shadcn components
│   ├── stores/
│   │   └── desktop-store.ts        # Zustand store
│   ├── hooks/
│   │   ├── use-desktop.ts          # Desktop hooks
│   │   └── use-keyboard-shortcuts.ts
│   ├── types/
│   │   ├── window.ts               # Window types
│   │   └── desktop.ts              # Desktop types
│   └── lib/
│       └── utils.ts                # Utility functions
├── IMPLEMENTATION_PLAN.md          # Detailed implementation plan
└── README_STUDYOS.md               # This file
```

---

## 💡 How It Works

### Window Management System

StudyOS uses Zustand for global state management, replacing PostHog's React Context approach:

```typescript
// Add a window
addWindow({
  id: "unique-id",
  path: "/courses",
  title: "Courses",
  icon: "📚",
  element: <YourComponent />
})

// Window actions
closeWindow(id)
minimizeWindow(id)
maximizeWindow(id)
bringToFront(id)
```

### Routing System

Unlike PostHog's Gatsby-based routing, StudyOS uses Next.js App Router with a `(desktop)` route group:

1. All pages in `app/(desktop)/` automatically open as windows
2. Each page calls `addWindow()` in a `useEffect` hook
3. The actual page content is passed as the `element` prop
4. The `DesktopWrapper` renders all windows

### Desktop Icons

Desktop icons are defined in `components/desktop/desktop-icons.tsx`:

```typescript
{
  id: "courses",
  label: "Courses",
  icon: "📚",
  path: "/courses",  // Opens this route as a window
}
```

Double-clicking an icon navigates to the path and opens it as a window.

### Wallpapers

Wallpapers are defined in `components/desktop/wallpapers.ts` and can be:
- Solid colors
- Gradients
- Images (local or remote)
- Patterns

Users can change wallpapers from:
- Display Options window
- Start Menu
- Settings page

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + W` | Close focused window |
| `Cmd/Ctrl + M` | Minimize focused window |
| `Cmd/Ctrl + Shift + M` | Maximize focused window |
| `Cmd/Ctrl + Shift + W` | Close all windows |
| `Drag to edge` | Snap window to half screen |
| `Double-click title` | Maximize/restore window |

---

## 🎨 Features

### Window Features

- ✅ **Drag & Drop** - Drag windows by title bar
- ✅ **Resize** - 8-point resize handles (corners + edges)
- ✅ **Snap to Edges** - Drag to left/right edge to snap
- ✅ **Minimize** - Minimize to taskbar
- ✅ **Maximize** - Full-screen mode
- ✅ **Focus Management** - Click to bring to front
- ✅ **Z-Index Stacking** - Proper window layering
- ✅ **Window Constraints** - Min/max size per window
- ✅ **Smooth Animations** - Framer Motion animations

### Desktop Features

- ✅ **Desktop Icons** - Draggable icons with grid positioning
- ✅ **Icon Persistence** - Remembers icon positions
- ✅ **Multiple Wallpapers** - 7 pre-configured wallpapers
- ✅ **Wallpaper Persistence** - Remembers your choice
- ✅ **Double-click to Open** - Standard desktop behavior
- ✅ **Icon Selection** - Click to select (blue highlight)

### System Features

- ✅ **Top Menu Bar** - macOS-style menu bar
- ✅ **Taskbar** - Shows active windows
- ✅ **Start Menu** - Quick app launcher
- ✅ **Settings** - Theme, animations, experience mode
- ✅ **Display Options** - Wallpaper gallery
- ✅ **Keyboard Shortcuts** - Power user features

### Apps Included

1. **Home** - Welcome and quick start
2. **Courses** - Course catalog with cards
3. **Library** - Resource browser with sidebar
4. **Notes** - Note-taking app with editor
5. **Blog** - Blog posts
6. **Store** - Products and pricing
7. **Settings** - System preferences
8. **Display** - Wallpaper selector

---

## 🎓 Inspiration: PostHog.com

This project is inspired by [PostHog.com's desktop OS interface](https://posthog.com/blog/why-os), but adapted for Next.js instead of Gatsby:

### Key Differences from PostHog

| Feature | PostHog | StudyOS |
|---------|---------|---------|
| **Framework** | Gatsby | Next.js 15 |
| **State** | React Context | Zustand |
| **Routing** | `wrapPageElement` | App Router + Route Groups |
| **Components** | Custom Radix wrappers | Shadcn UI |
| **Build** | Static SSG | SSR/SSG with Turbopack |

### What We Kept

- Desktop OS metaphor
- Window management patterns
- Retro aesthetic
- Wallpaper system
- Desktop icons
- Taskbar and menu bar

### What We Improved

- **Simpler State**: Zustand is lighter than Context
- **Better DX**: Next.js App Router is more intuitive
- **Type Safety**: Full TypeScript throughout
- **Component Library**: Shadcn UI is production-ready
- **Performance**: Turbopack for faster builds

---

## 🛠️ Development

### Adding a New Page

1. Create a new page in `app/(desktop)/your-page/page.tsx`:

```typescript
"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function YourPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `your-page-${Date.now()}`,
      key: `your-page-${Date.now()}`,
      path: "/your-page",
      title: "Your Page",
      icon: "🎯",
      element: (
        <div className="p-8">
          <h1>Your Content Here</h1>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
```

2. Add an icon in `components/desktop/desktop-icons.tsx`:

```typescript
{
  id: "your-page",
  label: "Your Page",
  icon: "🎯",
  path: "/your-page",
}
```

3. Optionally configure window settings in `stores/desktop-store.ts`:

```typescript
const APP_SETTINGS: Record<string, AppSettings> = {
  "/your-page": {
    size: {
      min: { width: 600, height: 400 },
      max: { width: 1200, height: 900 },
    },
    position: { center: true },
  },
}
```

### Adding a Wallpaper

Add to `components/desktop/wallpapers.ts`:

```typescript
{
  id: "my-wallpaper",
  name: "My Wallpaper",
  bgColor: "#your-color",
  bgImage: "url('your-image-url')",
  bgSize: "cover",
  bgPosition: "center",
}
```

### Customizing Window Behavior

Window settings per app:

```typescript
appSettings: {
  resizable: true,        // Can user resize?
  minimizable: true,      // Show minimize button?
  maximizable: true,      // Show maximize button?
  closable: true,         // Show close button?
}
```

---

## 🐛 Troubleshooting

### Windows not appearing?

Check that:
1. You're calling `addWindow()` in `useEffect`
2. The path matches your route
3. You're returning `null` from the page component

### Desktop icons not draggable?

Check that:
1. `iconPositions` is being populated
2. `dragConstraints` is set correctly
3. Framer Motion is imported

### Styling issues?

Check that:
1. Tailwind CSS 4 is properly configured
2. `globals.css` is imported
3. You're using the `cn()` utility for conditional classes

### State not persisting?

Check that:
1. LocalStorage is available (not SSR)
2. Zustand persist middleware is configured
3. Storage key is unique

---

## 📚 Resources

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Detailed technical plan
- [PostHog Architecture](https://posthog.com/handbook/engineering/posthog-com/technical-architecture)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🤝 Contributing

This is an open-source educational project. Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Share your customizations
- Fork and build your own version

---

## 📝 License

MIT License - feel free to use this project as inspiration or foundation for your own work.

---

## 🎉 Acknowledgments

- **PostHog.com** - For the brilliant desktop OS concept
- **Eli Kinsey** - Original designer/developer of PostHog's interface
- **Shadcn** - For the beautiful component library
- **Zustand** - For simple, powerful state management

---

## 🚀 What's Next?

Potential future enhancements:

- [ ] App templates (Reader, Editor, Explorer, Inbox)
- [ ] Context menus (right-click)
- [ ] Window tabs (multiple tabs per window)
- [ ] Multi-desktop support
- [ ] Window snapping to corners
- [ ] Screensaver
- [ ] Sound effects
- [ ] Custom cursor styles
- [ ] Mobile experience mode
- [ ] Dock (like macOS)
- [ ] Notifications system
- [ ] Search functionality (Cmd+K)
- [ ] Real course content integration
- [ ] User authentication
- [ ] Database persistence

---

<div align="center">

**Built with ❤️ for students everywhere**

[⭐ Star on GitHub](https://github.com/yourusername/studyos) · [🐛 Report Issue](#) · [💡 Request Feature](#)

</div>
