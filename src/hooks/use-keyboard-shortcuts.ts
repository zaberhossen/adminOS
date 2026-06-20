"use client"

import { useEffect } from "react"
import { useDesktopStore } from "@/stores/desktop-store"

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useDesktopStore.getState()
      const { focusedWindow } = state
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
      const modKey = isMac ? e.metaKey : e.ctrlKey

      // Cmd/Ctrl + W — close focused window
      if (modKey && !e.shiftKey && e.key === "w" && focusedWindow) {
        e.preventDefault()
        state.closeWindow(focusedWindow.id)
        return
      }

      // Cmd/Ctrl + M — minimize focused window
      if (modKey && !e.shiftKey && e.key === "m" && focusedWindow) {
        e.preventDefault()
        state.minimizeWindow(focusedWindow.id)
        return
      }

      // Cmd/Ctrl + Shift + M — maximize focused window
      if (modKey && e.shiftKey && (e.key === "M" || e.key === "m") && focusedWindow) {
        e.preventDefault()
        state.maximizeWindow(focusedWindow.id)
        return
      }

      // Cmd/Ctrl + Shift + W — close all windows
      if (modKey && e.shiftKey && (e.key === "W" || e.key === "w")) {
        e.preventDefault()
        state.closeAllWindows()
        return
      }

      // Cmd/Ctrl + L — lock the session
      if (modKey && e.key === "l") {
        e.preventDefault()
        state.lock()
        return
      }

      // Escape — close transient surfaces
      if (e.key === "Escape") {
        if (state.startMenuOpen) state.setStartMenuOpen(false)
        if (state.notificationCenterOpen) state.setNotificationCenterOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
}
