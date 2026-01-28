# StudyOS Architecture Documentation

## Overview

StudyOS is a PostHog-inspired desktop operating system interface for student learning, built with Next.js, Zustand, and modern web technologies. Unlike a traditional website, StudyOS runs inside a desktop-style environment where every page is a draggable, resizable window.

## Core Architecture

StudyOS runs on Next.js 16 with a custom windowing system built using Zustand for state management and Framer Motion for animations. The entire application operates inside a desktop-like environment where traditional page navigation is replaced by window management.

### Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **State Management**: Zustand v5
- **UI Components**: Radix UI primitives  
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion v12
- **Icons**: Lucide React
- **Language**: TypeScript v5

## Key Components

### 1. Desktop Store (`src/stores/desktop-store.ts`)

The core state management system that handles all window operations and desktop settings.

**Key Responsibilities:**
- Window lifecycle management (create, close, minimize, maximize, restore)
- Z-index management for window stacking
- Window positioning and size calculations
- Desktop settings persistence (theme, wallpapers, icon positions)
- Start menu state

**Important Functions:**
```typescript
- addWindow() - Creates and adds new windows to state
- closeWindow() - Removes windows from state
- bringToFront() - Updates z-index for window focus
- minimizeWindow() - Sets minimized state
- maximizeWindow() - Maximizes window to full desktop area
- restoreWindow() - Restores window to previous size/position
- updateWindow() - Updates window properties (position, size, etc.)
- getDesktopCenterPosition() - Calculates centered window position
- getPositionDefaults() - Determines initial window position based on app settings
```

**Window State Management:**
```typescript
interface WindowState {
  id: string
  key: string
  path: string
  title: string
  element?: ReactNode
  position: WindowPosition
  size: WindowSize
  sizeConstraints: WindowSizeConstraints
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  appSettings: AppSettings
  icon?: string
  timestamp: number
}
```

### 2. Desktop Wrapper (`src/components/desktop/desktop-wrapper.tsx`)

The main container that renders the entire desktop environment.

**Structure:**
```tsx
<div className="fixed inset-0" style={{ position: 'fixed' }}>
  {/* Background Wallpaper */}
  <div className="overlay" />
  
  {/* Menu Bar (macOS-style) */}
  <MenuBar />
  
  {/* Desktop Area */}
  <div ref={constraintsRef} className="flex-1">
    {/* Desktop Icons */}
    <Desktop />
    
    {/* Windows */}
    <AnimatePresence>
      {windows.map(window => (
        <Window key={window.key} windowState={window} />
      ))}
    </AnimatePresence>
  </div>
  
  {/* Taskbar */}
  <Taskbar />
</div>
```

**Features:**
- Provides drag constraints for windows via `constraintsRef`
- Manages wallpaper backgrounds
- Coordinates between menu bar, desktop, and taskbar
- Supports "boring mode" fallback for traditional navigation

### 3. Window Component (`src/components/window/window.tsx`)

Individual window implementation with full OS-like functionality.

**Key Features:**
- **Dragging**: Windows can be dragged around the desktop using Framer Motion
- **Resizing**: Resize handles on all corners and edges
- **Snapping**: Windows snap to screen edges (left/right half)
- **Minimizing**: Windows minimize to taskbar
- **Maximizing**: Full-screen window mode
- **Focus Management**: Click to bring windows to front
- **Chrome**: Window controls (close, minimize, maximize buttons)

**Window Lifecycle:**
1. Creation - New window object added to Zustand store
2. Mounting - Component mounts with entrance animation
3. Interaction - User can drag, resize, minimize, close
4. Unmounting - Exit animation before removal from state

**Snap Behavior:**
```typescript
// Snap threshold: 50px from edge
if (mouseX < 50) {
  // Snap to left half
  updateWindow({ position: { x: 0, y: 0 }, size: { width: screenWidth / 2, height: screenHeight } })
} else if (mouseX > screenWidth - 50) {
  // Snap to right half
  updateWindow({ position: { x: screenWidth / 2, y: 0 }, size: { width: screenWidth / 2, height: screenHeight } })
}
```

### 4. App Settings Configuration

Window behavior is controlled by app-specific settings in `desktop-store.ts`:

```typescript
const APP_SETTINGS: Record<string, AppSettings> = {
  "/": {
    size: {
      min: { width: 700, height: 500 },
      max: { width: 800, height: 800 },
      fixed: false,
    },
    position: { center: true },
  },
  "/courses": {
    size: {
      min: { width: 900, height: 600 },
      max: { width: 1200, height: 900 },
    },
    position: { center: true },
  },
  // More route configurations...
}
```

**Configuration Options:**
- `size.min/max` - Minimum and maximum window dimensions
- `size.fixed` - Whether window can be resized
- `size.autoHeight` - Auto-adjust height to content
- `position.center` - Center window on screen
- `position.getPositionDefaults` - Custom positioning function

### 5. Desktop Icons (`src/components/desktop/desktop.tsx`)

Manages draggable desktop icons with persistence.

**Features:**
- Grid-based initial positioning
- Drag and drop to reposition
- Position persistence via localStorage
- Double-click to open windows
- Entrance animations

**Desktop Icons Configuration:**
```typescript
export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "home", label: "home.mdx", icon: "📄", path: "/" },
  { id: "courses", label: "courses", icon: "📚", path: "/courses" },
  { id: "library", label: "library", icon: "📖", path: "/library" },
  // ... more icons
]
```

### 6. Keyboard Shortcuts (`src/hooks/use-keyboard-shortcuts.ts`)

Global keyboard shortcuts for window management:

**Shortcuts:**
- `Cmd/Ctrl + W` - Close focused window
- `Cmd/Ctrl + M` - Minimize focused window
- `Cmd/Ctrl + Shift + M` - Maximize focused window
- `Cmd/Ctrl + Shift + W` - Close all windows
- `Esc` - Close start menu

## Page Routing

Every page in StudyOS is wrapped in the desktop layout using Next.js App Router:

```tsx
// src/app/(desktop)/layout.tsx
export default function DesktopLayout({ children }) {
  return (
    <>
      <DesktopWrapper />
      {/* Hidden container for Next.js pages */}
      <div className="hidden">{children}</div>
    </>
  )
}
```

**Page Pattern:**
Each page component:
1. Uses `useDesktop()` hook to access window management
2. Calls `addWindow()` in `useEffect` with page content
3. Returns `null` (content is rendered in window)

```tsx
export default function CoursesPage() {
  const { addWindow } = useDesktop()
  
  useEffect(() => {
    addWindow({
      id: `courses-${Date.now()}`,
      path: "/courses",
      title: "Courses",
      icon: "📚",
      element: <CourseContent />
    })
  }, [addWindow])
  
  return null
}
```

## Experience Modes

StudyOS supports two experience modes:

### 1. StudyOS Mode (Default)
Full desktop OS experience with windows, icons, and taskbar.

### 2. Boring Mode
Traditional website navigation. Enabled when:
- `siteSettings.experience === 'boring'`
- Mobile viewport (automatic fallback)
- User preference toggle

## Features

### Window Management
- ✅ Create, close, minimize, maximize, restore windows
- ✅ Drag windows around desktop
- ✅ Resize windows with constraints
- ✅ Snap to screen edges (left/right half)
- ✅ Focus management with z-index
- ✅ Window animations (enter/exit)
- ✅ Prevent duplicate windows for same route

### Desktop Environment
- ✅ Draggable desktop icons with persistence
- ✅ Menu bar with time display
- ✅ Taskbar with active window list
- ✅ Start menu
- ✅ Multiple wallpapers
- ✅ Settings panel for customization

### Customization
- ✅ 7 built-in wallpapers
- ✅ Theme switching (light/dark/system)
- ✅ Icon size preferences
- ✅ Animation toggles
- ✅ Persistent settings via localStorage

## SEO Compatibility

Despite the desktop interface, StudyOS maintains full SEO compatibility:

- Pages are statically generated at build time
- Each route has proper HTML structure and metadata
- Search engines crawl normal static files
- Client-side windowing does not affect crawling
- Metadata defined in `layout.tsx` for each route

## Development Workflow

### Running Locally
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
npm start
```

### Testing Window System
1. Test window creation - Ensure new pages create windows properly
2. Check positioning - Verify windows open in expected locations
3. Test interactions - Drag, resize, minimize, close functionality
4. Verify animations - Smooth entrance and exit animations
5. Mobile compatibility - Ensure fallback to boring mode works

### Common Debugging

**Windows not appearing:**
- Check `desktop-wrapper` height (should be full viewport)
- Verify `position: fixed` is applied inline
- Check `h-full` classes on html/body

**Positioning issues:**
- Verify `menuBarHeight` and `taskbarHeight` in calculations
- Check `getPositionDefaults` logic for specific routes
- Inspect window's bounding rect in browser DevTools

**Animation problems:**
- Check Framer Motion configurations in Window component
- Verify `AnimatePresence` wraps window list
- Check window key uniqueness

**State sync issues:**
- Use React DevTools to inspect Zustand store
- Verify `addWindow` is called only once per page mount
- Check for duplicate window prevention logic

## File Structure

```
src/
├── app/
│   ├── (desktop)/           # Desktop-enabled pages
│   │   ├── layout.tsx       # Desktop wrapper layout
│   │   ├── page.tsx         # Home page
│   │   ├── courses/
│   │   ├── library/
│   │   ├── notes/
│   │   └── ...
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/
│   ├── desktop/
│   │   ├── desktop-wrapper.tsx
│   │   ├── desktop.tsx
│   │   ├── desktop-icons.tsx
│   │   └── wallpapers.ts
│   ├── menu-bar/
│   │   └── menu-bar.tsx
│   ├── taskbar/
│   │   ├── taskbar.tsx
│   │   └── start-menu.tsx
│   ├── window/
│   │   ├── window.tsx
│   │   ├── window-chrome.tsx
│   │   └── resize-handles.tsx
│   └── ui/                  # Shadcn UI components
├── hooks/
│   ├── use-desktop.ts
│   └── use-keyboard-shortcuts.ts
├── stores/
│   └── desktop-store.ts     # Zustand store
└── types/
    ├── window.ts
    └── desktop.ts
```

## Design Philosophy

**Neobrutalist-Industrial Aesthetic:**
- High contrast, sharp edges
- Glassmorphism effects with `backdrop-blur`
- Minimal border-radius (rounded-sm or none)
- Retro Windows 95/XP inspired chrome
- Plus Jakarta Sans for body text
- JetBrains Mono for labels and code

**Color Palette:**
- Background: `#050505` (Deep Black)
- Surface: `#111111` (Elevated Black)  
- Primary: `#F54E00` (PostHog Orange)
- Muted: `#A1A1AA` (Zinc-400)
- Border: `#242424`

## Performance Considerations

- Windows use `React.memo` to prevent unnecessary re-renders
- Zustand provides efficient state updates
- Framer Motion hardware-accelerated animations
- Static generation for fast initial load
- LocalStorage persistence for settings

## Future Enhancements

Potential improvements:
- Multiple virtual desktops
- Window grouping/tabbing
- More keyboard shortcuts
- Touch gestures for mobile
- Window history/session restore
- Custom window themes
- Accessibility improvements
- Screen reader support

## Contributing

When adding new features:
1. Follow existing component patterns
2. Use TypeScript for type safety
3. Add app settings for new routes
4. Test on different screen sizes
5. Ensure SEO compatibility
6. Document new features

## Credits

Inspired by [PostHog.com](https://posthog.com)'s innovative desktop OS interface.
Built with modern web technologies and designed for student learning.
