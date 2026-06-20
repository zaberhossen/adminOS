"use client"

import { useEffect } from "react"
import { useDesktopSettings } from "@/hooks/use-desktop"

/**
 * Applies the active theme to <body> as `.light` / `.dark` classes, which the
 * scheme system in globals.css keys off of. The initial class is set by the
 * blocking script in layout.tsx; this keeps it in sync with runtime changes and
 * with the OS preference when the theme is "system".
 */
export function ThemeSync() {
  const { siteSettings } = useDesktopSettings()
  const { theme, reduceMotion } = siteSettings

  useEffect(() => {
    const body = document.body
    const apply = (dark: boolean) => {
      body.classList.toggle("dark", dark)
      body.classList.toggle("light", !dark)
    }

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      apply(mq.matches)
      const onChange = (e: MediaQueryListEvent) => apply(e.matches)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    }

    apply(theme === "dark")
  }, [theme])

  // Expose a motion preference for components/animations to read.
  useEffect(() => {
    document.documentElement.dataset.reduceMotion = reduceMotion ? "true" : "false"
  }, [reduceMotion])

  return null
}
