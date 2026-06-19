"use client"

import { useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { useDesktop, useDesktopSettings } from "@/hooks/use-desktop"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Desktop } from "./desktop"
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
      data-scheme="primary"
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        position: 'fixed',
        backgroundImage: wallpaper.bgImage,
        backgroundColor: wallpaper.bgColor,
        backgroundSize: wallpaper.bgSize ?? "cover",
        backgroundPosition: wallpaper.bgPosition ?? "center",
        backgroundRepeat: wallpaper.bgRepeat ?? "no-repeat",
      }}
    >
      {/* Menu Bar (top, translucent) */}
      <MenuBar />

      {/* Desktop Area */}
      <div ref={constraintsRef} className="relative flex-1 overflow-hidden">
        {/* Desktop Icons and Background */}
        <Desktop constraintsRef={constraintsRef} />

        {/* Windows */}
        <AnimatePresence mode="sync">
          {windows.map((window) => (
            <Window key={window.key} windowState={window} constraintsRef={constraintsRef} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
