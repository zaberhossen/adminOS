"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useDesktopSettings } from "@/hooks/use-desktop"
import { ThemeMode } from "@/types/desktop"
import { WALLPAPERS } from "@/components/desktop/wallpapers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const THEMES: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <Label className="text-primary">{label}</Label>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

export function SettingsApp() {
  const { siteSettings, updateSiteSettings } = useDesktopSettings()

  return (
    <div className="p-6 text-primary">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mb-6 text-sm text-muted">Personalize your adminOS workspace.</p>

      <div className="space-y-4">
        {/* Appearance */}
        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardContent>
            <Label className="text-primary">Theme</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => updateSiteSettings({ theme: t.value })}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm font-medium transition-colors",
                    siteSettings.theme === t.value
                      ? "border-red bg-red/10 text-primary"
                      : "border-input text-secondary hover:bg-accent"
                  )}
                >
                  <t.icon className="size-5" />
                  {t.label}
                </button>
              ))}
            </div>

            <Separator className="my-4" />

            <Row label="Animations" hint="Window open/close transitions">
              <Switch
                checked={siteSettings.animations}
                onCheckedChange={(v) => updateSiteSettings({ animations: v })}
              />
            </Row>
            <Row label="Reduce motion" hint="Minimize non-essential movement">
              <Switch
                checked={siteSettings.reduceMotion}
                onCheckedChange={(v) => updateSiteSettings({ reduceMotion: v })}
              />
            </Row>
          </CardContent>
        </Card>

        {/* Wallpaper */}
        <Card>
          <CardHeader><CardTitle>Wallpaper</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {WALLPAPERS.map((w, index) => (
                <button
                  key={w.id}
                  onClick={() => updateSiteSettings({ wallpaperIndex: index })}
                  className={cn(
                    "overflow-hidden rounded-lg border-2 transition-all",
                    siteSettings.wallpaperIndex === index
                      ? "border-red ring-2 ring-red/30"
                      : "border-input hover:border-red/60"
                  )}
                >
                  <div
                    className="h-16 w-full"
                    style={{
                      backgroundImage: w.bgImage,
                      backgroundColor: w.bgColor,
                      backgroundSize: w.bgSize ?? "cover",
                      backgroundPosition: w.bgPosition ?? "center",
                      backgroundRepeat: w.bgRepeat ?? "no-repeat",
                    }}
                  />
                  <div className="bg-primary px-2 py-1 text-[11px] font-medium text-secondary">{w.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
          <CardContent>
            <Row label="Desktop OS mode" hint="Turn off to fall back to plain pages">
              <Switch
                checked={siteSettings.experience === "os"}
                onCheckedChange={(v) => updateSiteSettings({ experience: v ? "os" : "boring" })}
              />
            </Row>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
