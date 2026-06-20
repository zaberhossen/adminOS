"use client"

import { motion } from "framer-motion"
import { Image as ImageIcon, Moon, Sun, Lock, MoonStar } from "lucide-react"
import {
  useDesktop,
  useStartMenu,
  useDesktopSettings,
  useSystem,
} from "@/hooks/use-desktop"
import { DESKTOP_ICONS } from "../desktop/desktop-icons"
import { WALLPAPERS } from "../desktop/wallpapers"
import { nextId } from "@/lib/id"

export function StartMenu() {
  const { addWindow } = useDesktop()
  const { setStartMenuOpen } = useStartMenu()
  const { siteSettings, updateSiteSettings } = useDesktopSettings()
  const { lock, sleep } = useSystem()

  const isDark = siteSettings.theme === "dark"

  const handleIconClick = (iconId: string) => {
    const icon = DESKTOP_ICONS.find((i) => i.id === iconId)
    if (!icon || !icon.path) return
    const id = nextId(`window-${iconId}`)
    addWindow({
      id,
      key: id,
      path: icon.path,
      title: icon.label,
      icon: icon.icon,
    })
    setStartMenuOpen(false)
  }

  const cycleWallpaper = () =>
    updateSiteSettings({
      wallpaperIndex: (siteSettings.wallpaperIndex + 1) % WALLPAPERS.length,
    })

  const toggleTheme = () =>
    updateSiteSettings({ theme: isDark ? "light" : "dark" })

  return (
    <>
      {/* click-away */}
      <div className="fixed inset-0 z-[140]" onClick={() => setStartMenuOpen(false)} />
      <motion.div
        data-scheme="secondary"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        className="absolute left-2 top-10 z-[150] w-72 overflow-hidden rounded-lg border border-primary bg-primary/90 shadow-2xl backdrop-blur-2xl skin-classic:bg-primary"
      >
        {/* Header */}
        <div data-scheme="tertiary" className="border-b border-primary bg-accent px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪟</span>
            <div>
              <div className="text-base font-bold text-primary">adminOS</div>
              <div className="text-xs text-secondary">Next.js Admin Template</div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-primary text-sm">
          {/* Apps */}
          <div className="p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-muted">Applications</div>
            {DESKTOP_ICONS.filter((i) => i.id !== "readme").map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconClick(icon.id)}
                className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary transition-colors hover:bg-accent"
              >
                <span className="text-lg">{icon.icon}</span>
                <span>{icon.label}</span>
              </button>
            ))}
          </div>

          {/* System */}
          <div className="p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-muted">System</div>
            <SystemRow icon={<ImageIcon className="size-4" />} label="Change wallpaper" onClick={cycleWallpaper} />
            <SystemRow
              icon={isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              label={isDark ? "Light mode" : "Dark mode"}
              onClick={toggleTheme}
            />
            <SystemRow icon={<MoonStar className="size-4" />} label="Sleep" onClick={() => { sleep(); setStartMenuOpen(false) }} />
            <SystemRow icon={<Lock className="size-4" />} label="Lock screen" onClick={() => { lock(); setStartMenuOpen(false) }} />
          </div>
        </div>
      </motion.div>
    </>
  )
}

function SystemRow({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary transition-colors hover:bg-accent"
    >
      <span className="flex size-5 items-center justify-center text-secondary">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
