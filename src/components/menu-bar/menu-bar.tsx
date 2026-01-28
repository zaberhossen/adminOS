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
    <div className="flex h-11 items-center bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] px-2 shadow-sm border-b border-black/10">
      <button
        onClick={toggleStartMenu}
        className="flex items-center gap-2 rounded px-3 py-1 text-sm font-semibold text-black hover:bg-black/10 transition-colors"
      >
        <span className="text-lg">🎓</span>
        <span>StudyOS</span>
      </button>
      
      <div className="ml-4 flex gap-1">
        <MenuBarItem label="File" />
        <MenuBarItem label="Edit" />
        <MenuBarItem label="View" />
        <MenuBarItem label="Window" />
        <MenuBarItem label="Help" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-black/70">
          {mounted ? time : "--:--"}
        </span>
      </div>
    </div>
  )
}

function MenuBarItem({ label }: { label: string }) {
  return (
    <button className="rounded px-3 py-1 text-sm font-medium text-black hover:bg-black/10 transition-colors">
      {label}
    </button>
  )
}
