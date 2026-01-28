"use client"

import { useEffect } from "react"
import { useDesktop } from "./use-desktop"

export function useKeyboardShortcuts() {
  const { focusedWindow, closeWindow, minimizeWindow, maximizeWindow, closeAllWindows } =
    useDesktop()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
      const modKey = isMac ? e.metaKey : e.ctrlKey

      // Cmd/Ctrl + W - Close focused window
      if (modKey && e.key === "w" && focusedWindow) {
        e.preventDefault()
        closeWindow(focusedWindow.id)
      }

      // Cmd/Ctrl + M - Minimize focused window
      if (modKey && e.key === "m" && focusedWindow) {
        e.preventDefault()
        minimizeWindow(focusedWindow.id)
      }

      // Cmd/Ctrl + Shift + M - Maximize focused window
      if (modKey && e.shiftKey && e.key === "M" && focusedWindow) {
        e.preventDefault()
        maximizeWindow(focusedWindow.id)
      }

      // Cmd/Ctrl + Shift + W - Close all windows
      if (modKey && e.shiftKey && e.key === "W") {
        e.preventDefault()
        closeAllWindows()
      }

      // Escape - Close start menu or unfocus window
      if (e.key === "Escape") {
        // This will be handled by the start menu component
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedWindow, closeWindow, minimizeWindow, maximizeWindow, closeAllWindows])
}
