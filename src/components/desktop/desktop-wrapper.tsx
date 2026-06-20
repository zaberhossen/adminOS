"use client"

import { useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { useDesktop, useDesktopSettings, useStartMenu } from "@/hooks/use-desktop"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Desktop } from "./desktop"
import { MenuBar } from "../menu-bar/menu-bar"
import { StartMenu } from "../taskbar/start-menu"
import { Window } from "../window/window"
import { WALLPAPERS } from "./wallpapers"

export function DesktopWrapper() {
  const { windows } = useDesktop()
  const { siteSettings } = useDesktopSettings()
  const { startMenuOpen } = useStartMenu()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  const wallpaper = WALLPAPERS[siteSettings.wallpaperIndex % WALLPAPERS.length]

  // "boring" mode falls back to plain Next.js pages (no desktop chrome).
  if (siteSettings.experience === "boring") {
    return null
  }

  return (
    <div
      data-scheme="primary"
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        backgroundImage: wallpaper.bgImage,
        backgroundColor: wallpaper.bgColor,
        backgroundSize: wallpaper.bgSize ?? "cover",
        backgroundPosition: wallpaper.bgPosition ?? "center",
        backgroundRepeat: wallpaper.bgRepeat ?? "no-repeat",
      }}
    >
      {/* Menu Bar (top, translucent) */}
      <MenuBar />

      {/* Start menu (anchored under the menu bar) */}
      {startMenuOpen && <StartMenu />}

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
