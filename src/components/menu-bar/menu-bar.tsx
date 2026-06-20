"use client"

import { Bell, Lock, Moon, Sun, MoonStar } from "lucide-react"
import {
  useStartMenu,
  useSystem,
  useNotifications,
  useDesktopSettings,
} from "@/hooks/use-desktop"
import { useClock } from "@/hooks/use-clock"
import { cn } from "@/lib/utils"

export function MenuBar() {
  const { toggleStartMenu, startMenuOpen } = useStartMenu()
  const { lock, sleep } = useSystem()
  const { siteSettings, updateSiteSettings } = useDesktopSettings()
  const { notifications, toggleNotificationCenter, notificationCenterOpen } = useNotifications()
  const { time } = useClock()

  const unread = notifications.filter((n) => !n.read).length
  const isDark = siteSettings.theme === "dark"

  const cycleTheme = () => {
    // Quick toggle between light and dark from the menu bar.
    updateSiteSettings({ theme: isDark ? "light" : "dark" })
  }

  return (
    <div
      data-scheme="tertiary"
      className="relative z-[100] flex h-9 items-center gap-1 border-b border-primary bg-primary/70 px-2 backdrop-blur-2xl skin-classic:bg-primary"
    >
      <button
        onClick={toggleStartMenu}
        className={cn(
          "flex items-center gap-2 rounded px-3 py-1 text-sm font-bold text-primary transition-colors hover:bg-accent",
          startMenuOpen && "bg-accent"
        )}
      >
        <span className="text-base">🪟</span>
        <span>adminOS</span>
      </button>

      <div className="ml-1 hidden gap-0.5 sm:flex">
        <MenuBarItem label="File" />
        <MenuBarItem label="Edit" />
        <MenuBarItem label="View" />
        <MenuBarItem label="Window" />
        <MenuBarItem label="Help" />
      </div>

      <div className="ml-auto flex items-center gap-0.5">
        <TrayButton
          label={isDark ? "Switch to light" : "Switch to dark"}
          onClick={cycleTheme}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </TrayButton>

        <TrayButton
          label="Notifications"
          onClick={toggleNotificationCenter}
          active={notificationCenterOpen}
        >
          <span className="relative">
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex min-w-3.5 items-center justify-center rounded-full bg-red px-1 text-[9px] font-bold leading-none text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </span>
        </TrayButton>

        <TrayButton label="Sleep" onClick={sleep}>
          <MoonStar className="size-4" />
        </TrayButton>

        <TrayButton label="Lock" onClick={lock}>
          <Lock className="size-4" />
        </TrayButton>

        <span className="ml-1 px-1 text-xs font-medium tabular-nums text-secondary">
          {time}
        </span>
      </div>
    </div>
  )
}

function MenuBarItem({ label }: { label: string }) {
  return (
    <button className="rounded px-2.5 py-1 text-sm font-medium text-secondary transition-colors hover:bg-accent hover:text-primary">
      {label}
    </button>
  )
}

function TrayButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "flex size-7 items-center justify-center rounded text-secondary transition-colors hover:bg-accent hover:text-primary",
        active && "bg-accent text-primary"
      )}
    >
      {children}
    </button>
  )
}
