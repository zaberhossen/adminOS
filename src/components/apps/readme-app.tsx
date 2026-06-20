"use client"

import { useDesktop } from "@/hooks/use-desktop"
import { DESKTOP_ICONS } from "@/components/desktop/desktop-icons"
import { nextId } from "@/lib/id"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const FEATURES = [
  "Draggable, resizable, snappable windows",
  "Light / dark / system themes (no flash on load)",
  "Boot splash, login & lock screen, sleep mode",
  "Notification center with unread badges",
  "Switchable wallpapers",
  "shadcn/ui kit included",
]

const SHORTCUTS = [
  ["⌘/Ctrl + W", "Close window"],
  ["⌘/Ctrl + M", "Minimize window"],
  ["⌘/Ctrl + ⇧ + M", "Maximize window"],
  ["⌘/Ctrl + L", "Lock screen"],
  ["Esc", "Close menus"],
]

export function ReadmeApp() {
  const { addWindow } = useDesktop()

  const openApp = (id: string) => {
    const icon = DESKTOP_ICONS.find((i) => i.id === id)
    if (!icon?.path) return
    const winId = nextId(`window-${id}`)
    addWindow({
      id: winId,
      key: winId,
      path: icon.path,
      title: icon.label,
      icon: icon.icon,
    })
  }

  return (
    <div className="p-8 text-primary">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🪟</span>
        <div>
          <h1 className="text-3xl font-black tracking-tight">adminOS</h1>
          <p className="text-sm text-muted">An OS-style admin dashboard template for Next.js.</p>
        </div>
      </div>

      <p className="mt-5 leading-relaxed text-secondary">
        adminOS is a starting point for your next admin panel. Every app is a real
        window you can drag, resize, snap and minimize. Built with Next.js, Zustand,
        Framer Motion, Tailwind and shadcn/ui — fork it and ship your own.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">Next.js 16</Badge>
        <Badge variant="secondary">React 19</Badge>
        <Badge variant="secondary">Zustand</Badge>
        <Badge variant="secondary">Tailwind v4</Badge>
        <Badge variant="secondary">shadcn/ui</Badge>
      </div>

      <Separator className="my-6" />

      <h2 className="mb-3 text-lg font-bold">Features</h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-secondary">
            <span className="mt-0.5 text-green">✓</span> {f}
          </li>
        ))}
      </ul>

      <h2 className="mb-3 mt-6 text-lg font-bold">Open an app</h2>
      <div className="flex flex-wrap gap-2">
        {DESKTOP_ICONS.filter((i) => i.id !== "readme").map((icon) => (
          <button
            key={icon.id}
            onClick={() => openApp(icon.id)}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-input px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-accent hover:text-primary"
          >
            <span>{icon.icon}</span> {icon.label}
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-6 text-lg font-bold">Keyboard shortcuts</h2>
      <div className="overflow-hidden rounded-lg border border-primary">
        {SHORTCUTS.map(([keys, desc], i) => (
          <div
            key={keys}
            className={`flex items-center justify-between px-4 py-2 text-sm ${i % 2 ? "bg-accent/40" : ""}`}
          >
            <span className="text-secondary">{desc}</span>
            <kbd className="rounded border border-input bg-primary px-2 py-0.5 font-mono text-xs text-primary">
              {keys}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  )
}
