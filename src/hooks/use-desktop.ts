"use client"

import { useDesktopStore } from "@/stores/desktop-store"

/**
 * Hook to access desktop store with window management
 */
export function useDesktop() {
  // Simple selectors without shallow - more SSR-friendly
  const windows = useDesktopStore((state) => state.windows)
  const focusedWindow = useDesktopStore((state) => state.focusedWindow)
  const taskbarHeight = useDesktopStore((state) => state.taskbarHeight)
  
  // Actions
  const addWindow = useDesktopStore((state) => state.addWindow)
  const closeWindow = useDesktopStore((state) => state.closeWindow)
  const minimizeWindow = useDesktopStore((state) => state.minimizeWindow)
  const maximizeWindow = useDesktopStore((state) => state.maximizeWindow)
  const restoreWindow = useDesktopStore((state) => state.restoreWindow)
  const bringToFront = useDesktopStore((state) => state.bringToFront)
  const updateWindowPosition = useDesktopStore((state) => state.updateWindowPosition)
  const updateWindowSize = useDesktopStore((state) => state.updateWindowSize)
  const updateWindow = useDesktopStore((state) => state.updateWindow)
  const setWindowTitle = useDesktopStore((state) => state.setWindowTitle)
  const closeAllWindows = useDesktopStore((state) => state.closeAllWindows)
  
  // Helpers
  const getWindowById = useDesktopStore((state) => state.getWindowById)
  const getDesktopCenterPosition = useDesktopStore((state) => state.getDesktopCenterPosition)
  
  return {
    windows,
    focusedWindow,
    taskbarHeight,
    addWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    updateWindow,
    setWindowTitle,
    closeAllWindows,
    getWindowById,
    getDesktopCenterPosition,
  }
}

/**
 * Hook for desktop settings
 */
export function useDesktopSettings() {
  const siteSettings = useDesktopStore((state) => state.siteSettings)
  const updateSiteSettings = useDesktopStore((state) => state.updateSiteSettings)
  
  return {
    siteSettings,
    updateSiteSettings,
  }
}

/**
 * Hook for desktop icons
 */
export function useDesktopIcons() {
  const iconPositions = useDesktopStore((state) => state.iconPositions)
  const setIconPosition = useDesktopStore((state) => state.setIconPosition)
  const resetIconPositions = useDesktopStore((state) => state.resetIconPositions)
  
  return {
    iconPositions,
    setIconPosition,
    resetIconPositions,
  }
}

/**
 * Hook for start menu
 */
export function useStartMenu() {
  const startMenuOpen = useDesktopStore((state) => state.startMenuOpen)
  const toggleStartMenu = useDesktopStore((state) => state.toggleStartMenu)
  const setStartMenuOpen = useDesktopStore((state) => state.setStartMenuOpen)
  
  return {
    startMenuOpen,
    toggleStartMenu,
    setStartMenuOpen,
  }
}

/**
 * Hook to get a specific window by ID
 */
export function useWindow(id: string) {
  const window = useDesktopStore((state) =>
    state.windows.find((w) => w.id === id)
  )
  
  const closeWindow = useDesktopStore((state) => state.closeWindow)
  const minimizeWindow = useDesktopStore((state) => state.minimizeWindow)
  const maximizeWindow = useDesktopStore((state) => state.maximizeWindow)
  const restoreWindow = useDesktopStore((state) => state.restoreWindow)
  const bringToFront = useDesktopStore((state) => state.bringToFront)
  const updateWindowPosition = useDesktopStore((state) => state.updateWindowPosition)
  const updateWindowSize = useDesktopStore((state) => state.updateWindowSize)
  const setWindowTitle = useDesktopStore((state) => state.setWindowTitle)
  
  return {
    window,
    close: () => closeWindow(id),
    minimize: () => minimizeWindow(id),
    maximize: () => maximizeWindow(id),
    restore: () => restoreWindow(id),
    bringToFront: () => bringToFront(id),
    updatePosition: (position: { x: number; y: number }) => updateWindowPosition(id, position),
    updateSize: (size: { width: number; height: number }) => updateWindowSize(id, size),
    setTitle: (title: string) => setWindowTitle(id, title),
  }
}
