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
    <div className="absolute bottom-12 left-2 z-[999] w-72 overflow-hidden rounded border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] shadow-xl">
      {/* Header */}
      <div className="border-b border-[#808080] bg-gradient-to-r from-[#0054e3] to-[#0099ff] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <div className="text-lg font-bold text-white">StudyOS</div>
            <div className="text-xs text-white/80">Student Learning Platform</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="divide-y divide-[#a0a0a0]/60 text-sm">
        {/* Apps */}
        <div className="p-2">
          <div className="mb-2 px-2 text-xs font-bold text-black/60">Applications</div>
          {DESKTOP_ICONS.slice(0, 6).map((icon) => (
            <button
              key={icon.id}
              onClick={() => handleIconClick(icon.id)}
              className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-black hover:bg-[#000080] hover:text-white transition-colors"
            >
              <span className="text-xl">{icon.icon}</span>
              <span>{icon.label}</span>
            </button>
          ))}
        </div>

        {/* System */}
        <div className="p-2">
          <div className="mb-2 px-2 text-xs font-bold text-black/60">System</div>
          <button
            onClick={cycleWallpaper}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-black hover:bg-[#000080] hover:text-white transition-colors"
          >
            <span className="text-xl">🖼️</span>
            <span>Change wallpaper</span>
          </button>
          <button
            onClick={() => {
              handleIconClick("settings")
            }}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-black hover:bg-[#000080] hover:text-white transition-colors"
          >
            <span className="text-xl">⚙️</span>
            <span>Settings</span>
          </button>
        </div>

        {/* Power */}
        <div className="p-2">
          <button
            onClick={() => setStartMenuOpen(false)}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-black hover:bg-[#000080] hover:text-white transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span>Close menu</span>
          </button>
        </div>
      </div>
    </div>
  )
}
