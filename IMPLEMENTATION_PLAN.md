# StudyOS - PostHog-Inspired OS Interface Implementation Plan

## Project Overview
Transform StudyOS into a desktop OS-like learning application inspired by PostHog.com's architecture, using Next.js 15, Zustand, and Shadcn UI.

## Tech Stack
- **Framework**: Next.js 15.5 (App Router)
- **State Management**: Zustand
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture Overview

### Core System Components

#### 1. **State Management (Zustand Store)**
Replaces PostHog's React Context with Zustand for better performance and simpler state management.

**Store Structure:**
```typescript
interface WindowState {
  id: string
  key: string
  path: string
  title: string
  element: ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  appSettings: AppSettings
}

interface DesktopStore {
  // Windows
  windows: WindowState[]
  focusedWindow: WindowState | null
  addWindow: (config) => void
  closeWindow: (id) => void
  minimizeWindow: (id) => void
  maximizeWindow: (id) => void
  bringToFront: (id) => void
  updateWindowPosition: (id, position) => void
  updateWindowSize: (id, size) => void
  
  // Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings) => void
  
  // UI State
  wallpaperIndex: number
  setWallpaperIndex: (index) => void
  startMenuOpen: boolean
  toggleStartMenu: () => void
}
```

#### 2. **Layout System**
- `app/layout.tsx` - Root layout with global providers
- `components/desktop-wrapper.tsx` - Main desktop environment wrapper
- `components/desktop.tsx` - Desktop background and icons
- `components/taskbar.tsx` - Bottom/top taskbar with menu

#### 3. **Window System**
- `components/window/window.tsx` - Individual window component
- `components/window/window-chrome.tsx` - Window title bar and controls
- `components/window/window-content.tsx` - Window content area
- Features:
  - Drag & drop positioning
  - Resize handles
  - Snap to edges
  - Minimize/maximize/close
  - Focus management
  - Window stacking (z-index)

#### 4. **App Templates**
Following PostHog's pattern, create reusable templates for different content types:

**Reader Template** - For documentation and long-form content
- Sidebar navigation
- Table of contents
- Reading progress
- Dark/light mode

**Editor Template** - For interactive content creation
- Toolbar
- Canvas area
- Property panel

**Explorer Template** - For browsing collections
- File tree/grid view
- Preview panel
- Search and filters

**Inbox Template** - For Q&A and discussions
- List view
- Detail view
- Compose panel

**Presentation Template** - For course slides
- Slide navigation
- Full-screen mode
- Progress indicator

#### 5. **Routing System**
Since Next.js doesn't have Gatsby's wrapPageElement, we'll use:
- App Router with route groups
- `(desktop)` route group for windowed pages
- `(fullscreen)` route group for standalone pages
- Middleware for window state management

**Route Structure:**
```
app/
├── (desktop)/
│   ├── layout.tsx          # Desktop wrapper
│   ├── page.tsx            # Home/desktop
│   ├── courses/
│   │   └── page.tsx        # Courses app
│   ├── library/
│   │   └── page.tsx        # Library app
│   ├── notes/
│   │   └── page.tsx        # Notes app
│   └── settings/
│       └── page.tsx        # Settings app
└── (fullscreen)/
    └── auth/
        └── page.tsx        # Login (no desktop UI)
```

#### 6. **Navigation System**
- Top menu bar (macOS-style)
- Desktop icons with drag positioning
- Start menu with app launcher
- Taskbar with active windows
- Quick actions

## Implementation Phases

### Phase 1: Foundation (Tasks 1-4)
1. **Install Dependencies**
   - Zustand
   - Additional Shadcn components
   - @radix-ui primitives

2. **Setup State Management**
   - Create Zustand store structure
   - Implement window management actions
   - Add persistence (localStorage)

3. **Desktop Layout**
   - Create desktop wrapper component
   - Implement wallpaper system
   - Add desktop icons with positioning

4. **Basic Window System**
   - Refactor existing window component
   - Add drag & resize functionality
   - Implement z-index management

### Phase 2: Core Features (Tasks 5-6)
5. **Enhanced Window Features**
   - Window snapping to edges
   - Maximize/minimize animations
   - Multiple monitor support (future)
   - Window constraints

6. **App Templates**
   - Create base template component
   - Implement Reader template
   - Implement Editor template
   - Implement Explorer template
   - Implement Inbox template
   - Implement Presentation template

### Phase 3: Integration (Tasks 7-8)
7. **Routing System**
   - Setup route groups
   - Create window-aware navigation
   - Implement deep linking
   - Handle browser back/forward

8. **Navigation & Menus**
   - Top menu bar component
   - Desktop icon system
   - Start menu with launcher
   - Context menus
   - Keyboard shortcuts

### Phase 4: Polish (Tasks 9-10)
9. **Accessibility & UX**
   - Keyboard navigation
   - Screen reader support
   - Focus management
   - Keyboard shortcuts (Cmd+K, etc.)
   - Window animations

10. **Content & Demo**
    - Create sample courses
    - Add demo lessons
    - Setup library content
    - Create onboarding flow

## Key Features to Implement

### Window Management
- [x] Basic window rendering (already exists)
- [ ] Drag windows
- [ ] Resize windows (8 resize handles)
- [ ] Minimize to taskbar
- [ ] Maximize to full screen
- [ ] Snap to edges (left/right half, corners)
- [ ] Focus management
- [ ] Window stacking (z-index)
- [ ] Window constraints (min/max size)
- [ ] Remember window positions

### Desktop Features
- [x] Wallpaper system (already exists)
- [ ] Desktop icons with grid positioning
- [ ] Icon drag & drop
- [ ] Icon double-click to open
- [ ] Icon context menu
- [ ] Desktop context menu
- [ ] Multiple wallpapers

### Taskbar
- [ ] Show active windows
- [ ] Click to focus/minimize window
- [ ] Window preview on hover
- [ ] System tray
- [ ] Clock
- [ ] Start menu button

### Menu Bar (macOS-style)
- [ ] File menu
- [ ] Edit menu
- [ ] View menu
- [ ] Window menu
- [ ] Help menu
- [ ] Search (Cmd+K)

### Keyboard Shortcuts
- [ ] `Cmd+K` - Search
- [ ] `Cmd+W` - Close window
- [ ] `Cmd+M` - Minimize window
- [ ] `Cmd+Option+F` - Maximize window
- [ ] `Cmd+Tab` - Switch windows
- [ ] `Shift+Arrow` - Snap window to edge
- [ ] `Cmd+,` - Settings
- [ ] `Cmd+N` - New window

### Settings
- [ ] Wallpaper selection
- [ ] Theme (light/dark)
- [ ] Animations on/off
- [ ] Cursor style
- [ ] Desktop icon size
- [ ] Window behavior

## Student Learning Features

### Core Apps
1. **Courses** - Browse and enroll in courses
2. **Library** - Access learning materials
3. **Notes** - Take and organize notes
4. **Assignments** - Track and submit work
5. **Calendar** - Schedule and deadlines
6. **Progress** - Learning analytics
7. **Community** - Discussion forums
8. **Resources** - Additional materials

### Educational Features
- Course catalog
- Video lessons
- Interactive quizzes
- Progress tracking
- Achievements/badges
- Study groups
- Note-taking tools
- Flashcards
- Resource library

## Design Principles

1. **Retro Aesthetic**
   - Windows 95/XP inspired chrome
   - Classic Mac OS elements
   - Pixel-perfect borders
   - Retro color palette

2. **Modern UX**
   - Smooth animations
   - Responsive design
   - Touch-friendly (mobile fallback)
   - Keyboard accessible

3. **Performance**
   - Virtual scrolling for long lists
   - Lazy load content
   - Optimize animations
   - Code splitting

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus indicators
   - High contrast mode

## File Structure

```
src/
├── app/
│   ├── (desktop)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── courses/
│   │   ├── library/
│   │   ├── notes/
│   │   └── settings/
│   └── layout.tsx
├── components/
│   ├── desktop/
│   │   ├── desktop-wrapper.tsx
│   │   ├── desktop.tsx
│   │   ├── desktop-icon.tsx
│   │   └── wallpaper.tsx
│   ├── window/
│   │   ├── window.tsx
│   │   ├── window-chrome.tsx
│   │   ├── window-content.tsx
│   │   └── resize-handles.tsx
│   ├── taskbar/
│   │   ├── taskbar.tsx
│   │   ├── taskbar-item.tsx
│   │   └── start-menu.tsx
│   ├── menu-bar/
│   │   ├── menu-bar.tsx
│   │   └── menu-item.tsx
│   ├── templates/
│   │   ├── reader.tsx
│   │   ├── editor.tsx
│   │   ├── explorer.tsx
│   │   ├── inbox.tsx
│   │   └── presentation.tsx
│   └── ui/
│       └── [shadcn components]
├── stores/
│   ├── desktop-store.ts
│   ├── window-store.ts
│   └── settings-store.ts
├── hooks/
│   ├── use-desktop.ts
│   ├── use-window.ts
│   └── use-keyboard-shortcuts.ts
├── lib/
│   ├── window-manager.ts
│   ├── keyboard-shortcuts.ts
│   └── utils.ts
└── types/
    ├── window.ts
    ├── desktop.ts
    └── app.ts
```

## Success Metrics

- [ ] All windows draggable and resizable
- [ ] Smooth animations (60fps)
- [ ] Keyboard accessible
- [ ] Mobile responsive fallback
- [ ] Fast initial load (<3s)
- [ ] Works without JavaScript (SSR)
- [ ] Cross-browser compatible

## Next Steps

1. Start with Phase 1 - Foundation
2. Implement Zustand store
3. Refactor existing components to use store
4. Build enhanced window system
5. Create app templates
6. Implement routing
7. Add content

## References

- PostHog.com technical architecture
- PostHog.com Storybook
- Zustand documentation
- Shadcn UI components
- Framer Motion docs
