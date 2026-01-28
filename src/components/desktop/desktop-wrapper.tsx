"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { useDesktop, useDesktopSettings } from "@/hooks/use-desktop"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Desktop } from "./desktop"
import { Taskbar } from "../taskbar/taskbar"
import { MenuBar } from "../menu-bar/menu-bar"
import { Window } from "../window/window"
import { WALLPAPERS } from "./wallpapers"

export function DesktopWrapper() {
  const { windows } = useDesktop()
  const { siteSettings } = useDesktopSettings()
  const constraintsRef = useRef<HTMLDivElement>(null)
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  const wallpaper = WALLPAPERS[siteSettings.wallpaperIndex % WALLPAPERS.length]

  // Check if we're in boring mode (traditional website)
  if (siteSettings.experience === "boring") {
    return null // Return null to show normal Next.js pages
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        backgroundImage: wallpaper.bgImage,
        backgroundColor: wallpaper.bgColor,
        backgroundSize: wallpaper.bgSize ?? "cover",
        backgroundPosition: wallpaper.bgPosition ?? "center",
        backgroundRepeat: wallpaper.bgRepeat ?? "no-repeat",
      }}
    >
      {/* Subtle overlay for better readability */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15))",
        }}
      />

      {/* Menu Bar (macOS-style) */}
      <MenuBar />

      {/* Desktop Area */}
      <div ref={constraintsRef} className="relative flex-1 overflow-hidden p-3">
        {/* Desktop Icons and Background */}
        <Desktop constraintsRef={constraintsRef} />

        {/* Windows */}
        <AnimatePresence mode="sync">
          {windows.map((window) => (
            <Window key={window.key} windowState={window} constraintsRef={constraintsRef} />
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
