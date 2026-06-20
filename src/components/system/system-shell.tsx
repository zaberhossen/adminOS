"use client"

import { ThemeSync } from "./theme-sync"
import { BootScreen } from "./boot-screen"
import { LockScreen } from "./lock-screen"
import { SleepOverlay } from "./sleep-overlay"
import { NotificationCenter } from "./notification-center"
import { DesktopWrapper } from "@/components/desktop/desktop-wrapper"

/**
 * Top-level OS shell. Owns the theme sync and every full-screen system layer
 * (boot splash, lock screen, sleep mode, notification center) stacked above the
 * desktop in deliberate z-order:
 *   desktop < notifications (8000) < sleep (9500) < lock (9000) < boot (10000)
 */
export function SystemShell() {
  return (
    <>
      <ThemeSync />
      <DesktopWrapper />
      <NotificationCenter />
      <SleepOverlay />
      <LockScreen />
      <BootScreen />
    </>
  )
}
