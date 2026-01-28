"use client"

import { useEffect } from "react"
import { useDesktop, useDesktopSettings } from "@/hooks/use-desktop"
import { WALLPAPERS } from "@/components/desktop/wallpapers"

export default function DisplayPage() {
  const { addWindow } = useDesktop()
  const { siteSettings, updateSiteSettings } = useDesktopSettings()

  useEffect(() => {
    addWindow({
      id: `display-${Date.now()}`,
      key: `display-${Date.now()}`,
      path: "/display",
      title: "Display Options",
      icon: "🖥️",
      element: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black">Display Options</h1>
          
          <div className="space-y-6">
            {/* Wallpapers */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">Wallpapers</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {WALLPAPERS.map((wallpaper, index) => (
                  <button
                    key={wallpaper.id}
                    onClick={() => updateSiteSettings({ wallpaperIndex: index })}
                    className={`flex flex-col overflow-hidden rounded border-2 transition-all ${
                      siteSettings.wallpaperIndex === index
                        ? "border-blue-500 ring-2 ring-blue-500/40"
                        : "border-black/30 hover:border-blue-500"
                    }`}
                  >
                    <div
                      className="h-24 w-full"
                      style={{
                        backgroundImage: wallpaper.bgImage,
                        backgroundColor: wallpaper.bgColor,
                        backgroundSize: wallpaper.bgSize ?? "cover",
                        backgroundPosition: wallpaper.bgPosition ?? "center",
                        backgroundRepeat: wallpaper.bgRepeat ?? "no-repeat",
                      }}
                    />
                    <div className="bg-white px-2 py-1 text-xs font-semibold text-black">
                      {wallpaper.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Wallpaper Preview */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">Live Preview</h3>
              <div
                className="h-48 overflow-hidden rounded border-2 border-black/30"
                style={{
                  backgroundImage: WALLPAPERS[siteSettings.wallpaperIndex].bgImage,
                  backgroundColor: WALLPAPERS[siteSettings.wallpaperIndex].bgColor,
                  backgroundSize: WALLPAPERS[siteSettings.wallpaperIndex].bgSize ?? "cover",
                  backgroundPosition: WALLPAPERS[siteSettings.wallpaperIndex].bgPosition ?? "center",
                  backgroundRepeat: WALLPAPERS[siteSettings.wallpaperIndex].bgRepeat ?? "no-repeat",
                }}
              >
                <div className="bg-black/50 px-3 py-2 text-sm font-semibold text-white">
                  {WALLPAPERS[siteSettings.wallpaperIndex].name}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    })
  }, [addWindow, siteSettings, updateSiteSettings])

  return null
}
