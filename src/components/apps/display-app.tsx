"use client"

import { useDesktopSettings } from "@/hooks/use-desktop"
import { WALLPAPERS } from "@/components/desktop/wallpapers"
import { cn } from "@/lib/utils"

export function DisplayApp() {
  const { siteSettings, updateSiteSettings } = useDesktopSettings()
  const active = WALLPAPERS[siteSettings.wallpaperIndex % WALLPAPERS.length]

  return (
    <div className="p-6 text-primary">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Display</h1>
      <p className="mb-6 text-sm text-muted">Choose a wallpaper for your desktop.</p>

      {/* Live preview */}
      <div
        className="relative mb-6 flex h-48 items-end overflow-hidden rounded-xl border border-primary"
        style={{
          backgroundImage: active.bgImage,
          backgroundColor: active.bgColor,
          backgroundSize: active.bgSize ?? "cover",
          backgroundPosition: active.bgPosition ?? "center",
          backgroundRepeat: active.bgRepeat ?? "no-repeat",
        }}
      >
        <div className="m-3 rounded-md bg-black/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
          {active.name}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {WALLPAPERS.map((w, index) => (
          <button
            key={w.id}
            onClick={() => updateSiteSettings({ wallpaperIndex: index })}
            className={cn(
              "overflow-hidden rounded-lg border-2 text-left transition-all",
              siteSettings.wallpaperIndex === index
                ? "border-red ring-2 ring-red/30"
                : "border-input hover:border-red/60"
            )}
          >
            <div
              className="h-24 w-full"
              style={{
                backgroundImage: w.bgImage,
                backgroundColor: w.bgColor,
                backgroundSize: w.bgSize ?? "cover",
                backgroundPosition: w.bgPosition ?? "center",
                backgroundRepeat: w.bgRepeat ?? "no-repeat",
              }}
            />
            <div className="bg-primary px-2 py-1.5 text-xs font-medium text-secondary">{w.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
