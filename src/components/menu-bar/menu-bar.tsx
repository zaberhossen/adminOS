"use client"

import { useState, useEffect } from "react"
import { useStartMenu } from "@/hooks/use-desktop"

export function MenuBar() {
  const { toggleStartMenu } = useStartMenu()
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

  return (
    <div
      data-scheme="tertiary"
      className="flex h-9 items-center gap-1 bg-primary/70 backdrop-blur-2xl skin-classic:bg-primary px-2 border-b border-primary"
    >
      <button
        onClick={toggleStartMenu}
        className="flex items-center gap-2 rounded px-3 py-1 text-sm font-bold text-primary hover:bg-accent transition-colors"
      >
        <span className="text-base">🎓</span>
        <span>StudyOS</span>
      </button>

      <div className="ml-1 flex gap-0.5">
        <MenuBarItem label="File" />
        <MenuBarItem label="Edit" />
        <MenuBarItem label="View" />
        <MenuBarItem label="Window" />
        <MenuBarItem label="Help" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-secondary font-medium tabular-nums">
          {mounted ? time : "--:--"}
        </span>
      </div>
    </div>
  )
}

function MenuBarItem({ label }: { label: string }) {
  return (
    <button className="rounded px-2.5 py-1 text-sm font-medium text-secondary hover:text-primary hover:bg-accent transition-colors">
      {label}
    </button>
  )
}
