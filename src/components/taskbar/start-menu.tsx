"use client"

import { useDesktop, useStartMenu, useDesktopSettings } from "@/hooks/use-desktop"
import { DESKTOP_ICONS } from "../desktop/desktop-icons"
import { WALLPAPERS } from "../desktop/wallpapers"

export function StartMenu() {
  const { addWindow } = useDesktop()
  const { setStartMenuOpen } = useStartMenu()
  const { siteSettings, updateSiteSettings } = useDesktopSettings()

  const handleIconClick = (iconId: string) => {
    const icon = DESKTOP_ICONS.find((i) => i.id === iconId)
    if (!icon) return

    if (icon.path) {
      addWindow({
        id: `window-${iconId}-${Date.now()}`,
        key: `window-${iconId}-${Date.now()}`,
        path: icon.path,
        title: icon.label,
        icon: icon.icon,
      })
    }
    setStartMenuOpen(false)
  }

  const cycleWallpaper = () => {
    updateSiteSettings({
      wallpaperIndex: (siteSettings.wallpaperIndex + 1) % WALLPAPERS.length,
    })
  }

  return (
    <div
      data-scheme="secondary"
      className="absolute bottom-14 left-2 z-[999] w-72 overflow-hidden rounded-md border border-primary bg-primary shadow-2xl"
    >
      {/* Header */}
      <div data-scheme="tertiary" className="border-b border-primary bg-accent px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <div className="text-base font-bold text-primary">StudyOS</div>
            <div className="text-xs text-secondary">Student Learning Platform</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="divide-y divide-primary text-sm">
        {/* Apps */}
        <div className="p-2">
          <div className="mb-1 px-2 text-xs font-semibold text-muted">Applications</div>
          {DESKTOP_ICONS.slice(0, 6).map((icon) => (
            <button
              key={icon.id}
              onClick={() => handleIconClick(icon.id)}
              className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary hover:bg-accent transition-colors"
            >
              <span className="text-lg">{icon.icon}</span>
              <span>{icon.label}</span>
            </button>
          ))}
        </div>

        {/* System */}
        <div className="p-2">
          <div className="mb-1 px-2 text-xs font-semibold text-muted">System</div>
          <button
            onClick={cycleWallpaper}
            className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary hover:bg-accent transition-colors"
          >
            <span className="text-lg">🖼️</span>
            <span>Change wallpaper</span>
          </button>
          <button
            onClick={() => {
              handleIconClick("settings")
            }}
            className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary hover:bg-accent transition-colors"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </button>
        </div>

        {/* Power */}
        <div className="p-2">
          <button
            onClick={() => setStartMenuOpen(false)}
            className="flex w-full items-center gap-3 rounded px-3 py-1.5 text-left text-primary hover:bg-accent transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span>Close menu</span>
          </button>
        </div>
      </div>
    </div>
  )
}
