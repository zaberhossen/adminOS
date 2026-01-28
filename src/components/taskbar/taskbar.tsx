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
      <div className="relative flex h-11 items-center gap-2 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] px-2 shadow-[0_-2px_4px_rgba(0,0,0,0.1)] border-t border-black/10">
        {/* Start Button */}
        <button
          onClick={toggleStartMenu}
          className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm font-bold transition-colors ${
            startMenuOpen
              ? "bg-gradient-to-b from-[#c0c0c0] to-[#d0d0d0] shadow-inner"
              : "bg-gradient-to-b from-white to-[#e0e0e0] hover:from-[#f0f0f0] hover:to-[#d8d8d8] shadow-sm"
          }`}
        >
          <span className="text-lg">🎓</span>
          <span className="text-black">Start</span>
        </button>

        {/* Separator */}
        <div className="h-8 w-px bg-black/20" />

        {/* Active Windows */}
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => handleWindowClick(window.id)}
              className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-all ${
                window.isMinimized
                  ? "bg-gradient-to-b from-white to-[#e0e0e0] text-black/70"
                  : "bg-gradient-to-b from-[#c8d8f0] to-[#b0c8e8] text-black shadow-sm"
              } hover:brightness-105`}
            >
              <span>{window.icon}</span>
              <span className="max-w-[150px] truncate">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-black">
            {mounted ? time : "--:--"}
          </span>
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && <StartMenu />}
    </>
  )
}
