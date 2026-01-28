"use client"

import { useEffect } from "react"
import { useDesktop, useDesktopSettings } from "@/hooks/use-desktop"

export default function SettingsPage() {
  const { addWindow } = useDesktop()
  const { siteSettings, updateSiteSettings } = useDesktopSettings()

  useEffect(() => {
    addWindow({
      id: `settings-${Date.now()}`,
      key: `settings-${Date.now()}`,
      path: "/settings",
      title: "Settings",
      icon: "⚙️",
      element: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black">System Settings</h1>
          
          <div className="space-y-6">
            {/* Theme */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">Appearance</h3>
              <div className="flex gap-2">
                {["light", "dark", "system"].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateSiteSettings({ theme: theme as any })}
                    className={`rounded border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      siteSettings.theme === theme
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-black border-black/20 hover:bg-black/5"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Animations */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">Animations</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={siteSettings.animations}
                  onChange={(e) => updateSiteSettings({ animations: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="text-sm">Enable animations</span>
              </label>
            </div>

            {/* Experience Mode */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-black">Experience Mode</h3>
              <div className="flex gap-2">
                {["studyos", "boring"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateSiteSettings({ experience: mode as any })}
                    className={`rounded border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      siteSettings.experience === mode
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-black border-black/20 hover:bg-black/5"
                    }`}
                  >
                    {mode === "studyos" ? "Desktop OS" : "Traditional"}
                  </button>
                ))}
              </div>
              <p className="text-xs text-black/60">
                Switch between desktop OS mode and traditional website mode
              </p>
            </div>
          </div>
        </div>
      ),
    })
  }, [addWindow, siteSettings, updateSiteSettings])

  return null
}
