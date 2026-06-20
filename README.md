# adminOS

An **OS-style admin dashboard template for Next.js**. Every screen is a real,
draggable window on a desktop — built to be forked as the starting point for your
next admin panel or internal tool.

> Renamed and reframed from the original `studyos` desktop experiment into a
> reusable admin template. Aesthetic inspired by [PostHog.com](https://posthog.com)'s
> warm-cream "OS" desktop skin.

## Features

- 🪟 **Window manager** — draggable, resizable, snap-to-edge, maximize, minimize, focus & z-order
- 🌗 **Theming** — light / dark / system, applied before first paint (no flash)
- 🖼️ **Wallpapers** — switchable backgrounds, persisted per user
- 🔐 **Login & lock screen** — stubbed auth, `⌘/Ctrl + L` to lock
- ⏻ **Boot splash & sleep mode** — full OS-feel session lifecycle
- 🔔 **Notification center** — slide-in sidebar with unread badges
- 🧩 **shadcn/ui kit** — Button, Card, Dialog, Badge, Input, Switch, Tabs, Table, Progress, Avatar, Skeleton… with a live **UI Kit** demo app
- ⚡ **Performance-first** — each app is code-split (`next/dynamic`); only open windows load their bundle
- 💾 **Persistence** — settings & icon layout saved to `localStorage` via Zustand

## Bundled apps

| App | Path | What it shows |
| --- | --- | --- |
| Dashboard | `/dashboard` | Stat cards, bar chart, activity feed, goals |
| Users | `/users` | Searchable members table with statuses |
| Analytics | `/analytics` | Tabs, sparklines, retention heatmap |
| Files | `/files` | Breadcrumb file browser |
| UI Kit | `/ui-kit` | Live gallery of every shadcn component |
| Settings | `/settings` | Theme, motion, wallpaper, experience mode |
| Display | `/display` | Wallpaper picker with live preview |
| Read Me | `/` | This overview, in-app |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zustand ·
Framer Motion · shadcn/ui · lucide-react

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You'll boot into the login
screen — any password (or none) signs you in; it's a stubbed demo.

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Make it yours

1. **Add an app** — create a component in `src/components/apps/`, register it in
   [`src/components/apps/registry.tsx`](src/components/apps/registry.tsx), then add
   a desktop icon in [`src/components/desktop/desktop-icons.tsx`](src/components/desktop/desktop-icons.tsx).
   Optionally add a window-sizing entry in `APP_SETTINGS` in
   [`src/stores/desktop-store.ts`](src/stores/desktop-store.ts).
2. **Real auth** — replace the no-op `handleSubmit` in
   [`src/components/system/lock-screen.tsx`](src/components/system/lock-screen.tsx).
3. **Wallpapers** — edit [`src/components/desktop/wallpapers.ts`](src/components/desktop/wallpapers.ts).
4. **Theme tokens** — tune the scheme variables in
   [`src/app/globals.css`](src/app/globals.css).

See [ARCHITECTURE.md](ARCHITECTURE.md) for how the pieces fit together.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `⌘/Ctrl + W` | Close focused window |
| `⌘/Ctrl + M` | Minimize focused window |
| `⌘/Ctrl + ⇧ + M` | Maximize focused window |
| `⌘/Ctrl + ⇧ + W` | Close all windows |
| `⌘/Ctrl + L` | Lock screen |
| `Esc` | Close start menu / notifications |

## License

MIT — use it for anything.
