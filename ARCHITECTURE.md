# adminOS — Architecture

How the OS-style desktop is wired together. Read alongside [README.md](README.md).

## Big picture

adminOS is a single Next.js route (`/`) that renders a **desktop**. "Apps" are
not separate pages you navigate to — they are React components rendered inside
**windows** managed by a global store. The URL stays on the desktop; opening an
app just adds a window to state.

```
app/(desktop)/layout.tsx
  └─ SystemShell
       ├─ ThemeSync ............ applies light/dark to <body>
       ├─ DesktopWrapper ....... wallpaper + MenuBar + StartMenu + Desktop + Windows
       ├─ NotificationCenter ... slide-in sidebar         (z 8000)
       ├─ SleepOverlay ......... ambient clock, click-to-wake (z 9500)
       ├─ LockScreen ........... login / lock              (z 9000)
       └─ BootScreen ........... splash, auto-dismiss       (z 10000)
```

## State — Zustand (`src/stores/desktop-store.ts`)

One store holds everything:

- **Windows**: `windows[]`, `focusedWindow`, `maxZIndex` and the actions to
  add / close / minimize / maximize / restore / focus / move / resize.
- **Settings** (`siteSettings`): theme, wallpaper, animations, reduce-motion,
  experience mode.
- **Icons**: `iconPositions` for drag-arranged desktop icons.
- **System session** (ephemeral): `isBooting`, `isLocked`, `isAsleep`.
- **Notifications**: `notifications[]` + `notificationCenterOpen`.

Only `siteSettings` and `iconPositions` are **persisted** (localStorage key
`adminos-desktop-storage`). Session flags like lock/sleep/boot intentionally
reset on reload so the OS "boots" every visit.

Hooks in `src/hooks/use-desktop.ts` expose narrow slices: `useDesktop`,
`useDesktopSettings`, `useDesktopIcons`, `useStartMenu`, `useSystem`,
`useNotifications`, `useWindow`.

## Windows (`src/components/window/`)

- `window.tsx` — drag (Framer Motion `useMotionValue`, so dragging never
  re-renders React), edge-snap preview, maximize/restore from the real
  container box. Window **content is resolved by path** via the app registry
  (`WindowContent`), falling back to an explicit `element` or a placeholder.
- `window-chrome.tsx` — title bar + traffic-light controls.
- `resize-handles.tsx` — 8-direction resize, clamped to size constraints.

## Apps & the registry (`src/components/apps/`)

`registry.tsx` maps `path → { title, icon, Component }`. Every app is loaded
with `next/dynamic`, so a window only pulls in its bundle when opened
(performance-first). Anything that opens a window — desktop icons, the start
menu, deep-linked routes — funnels through the same registry, so there is a
single source of truth for what each path renders.

To add an app: write the component, register the path, add a desktop icon.

## System layers (`src/components/system/`)

| File | Responsibility |
| --- | --- |
| `system-shell.tsx` | Stacks every layer in z-order |
| `theme-sync.tsx` | Reflects `siteSettings.theme` onto `<body>`; watches OS preference for "system" |
| `boot-screen.tsx` | Deterministic ~1.7s splash, then `setBooting(false)` |
| `lock-screen.tsx` | Login/lock over blurred wallpaper; **stubbed auth** |
| `sleep-overlay.tsx` | Black ambient-clock overlay; any input wakes |
| `notification-center.tsx` | Right sidebar, mark-read / dismiss / clear |

A render-blocking script in `app/layout.tsx` reads the persisted theme and sets
the `<body>` class **before first paint** to avoid a light/dark flash.

## Theming (`src/app/globals.css`)

Ported from PostHog's desktop skin and translated to Tailwind v4:

- A **scheme system** — `[data-scheme="primary|secondary|tertiary"]` sets raw
  RGB triples consumed by semantic `@utility` classes (`bg-primary`,
  `text-secondary`, `border-input`, …).
- `.light` / `.dark` on `<body>` flips the whole palette.
- shadcn/ui components use their own `zinc` + `dark:` classes and sit cleanly on
  top of the scheme surfaces.

## Conventions

- App screens use **scheme utilities** (`text-primary`, `bg-accent`, …) so they
  follow light/dark automatically; shadcn primitives bring their own dark mode.
- Keep windows thin: route `page.tsx` files just open a window; the real UI lives
  in `src/components/apps/`.
- Time is rendered via `useClock()` (`src/hooks/use-clock.ts`) which is
  mount-safe to avoid hydration mismatches.
