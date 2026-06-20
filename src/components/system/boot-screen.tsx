"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSystem } from "@/hooks/use-desktop"

const BOOT_LINES = [
  "Mounting filesystem…",
  "Starting window server…",
  "Loading theme engine…",
  "Initializing apps…",
  "Ready.",
]

/**
 * Splash / loading screen shown on every session start. Auto-dismisses after a
 * short, deterministic sequence so the desktop feels like it "boots".
 */
export function BootScreen() {
  const { isBooting, setBooting } = useSystem()
  const [progress, setProgress] = useState(0)
  const [line, setLine] = useState(0)

  useEffect(() => {
    if (!isBooting) return
    let raf = 0
    let start = 0
    const duration = 1700

    const tick = (t: number) => {
      if (!start) start = t
      const elapsed = t - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      setLine(Math.min(BOOT_LINES.length - 1, Math.floor((pct / 100) * BOOT_LINES.length)))
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        setBooting(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isBooting, setBooting])

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1d1f27] text-[#eaecf6]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex size-20 items-center justify-center rounded-2xl bg-[#2b2d36] text-4xl shadow-2xl ring-1 ring-white/10">
              🪟
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight">adminOS</div>
              <div className="mt-1 text-sm text-white/50">Next.js Admin Template</div>
            </div>

            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[#F54E00]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="h-4 font-mono text-xs text-white/40">{BOOT_LINES[line]}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
