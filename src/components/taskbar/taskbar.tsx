"use client"

import { useState, useEffect } from "react"
import { useDesktop, useStartMenu } from "@/hooks/use-desktop"
import { StartMenu } from "./start-menu"

export function Taskbar() {
  const { windows, bringToFront, minimizeWindow } = useDesktop()
  const { startMenuOpen, toggleStartMenu } = useStartMenu()
  const [time, setTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Update time immediately
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }
    
    updateTime()
    
    // Update every second
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleWindowClick = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId)
    if (!window) return

    if (window.isMinimized) {
      bringToFront(windowId)
    } else {
      minimizeWindow(windowId)
    }
  }

  return (
    <>
      <div
        data-scheme="tertiary"
        className="relative flex h-12 items-center gap-2 bg-primary/70 backdrop-blur-2xl skin-classic:bg-primary px-2 border-t border-primary"
      >
        {/* Start Button */}
        <button
          onClick={toggleStartMenu}
          className={`flex items-center gap-2 rounded border px-3 py-1.5 text-sm font-bold transition-colors ${
            startMenuOpen
              ? "border-primary bg-accent text-primary"
              : "border-input bg-input text-primary hover:bg-accent"
          }`}
        >
          <span className="text-base">🎓</span>
          <span>Start</span>
        </button>

        {/* Separator */}
        <div className="h-7 w-px bg-line opacity-60" />

        {/* Active Windows */}
        <div className="flex flex-1 gap-1.5 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window.id)}
              className={`flex items-center gap-2 rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
                window.isMinimized
                  ? "border-input bg-input text-muted hover:bg-accent hover:text-secondary"
                  : "border-primary bg-accent text-primary"
              }`}
            >
              <span>{window.icon}</span>
              <span className="max-w-[150px] truncate">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-secondary tabular-nums">
            {mounted ? time : "--:--"}
          </span>
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && <StartMenu />}
    </>
  )
}
