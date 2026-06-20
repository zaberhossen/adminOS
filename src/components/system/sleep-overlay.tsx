"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSystem } from "@/hooks/use-desktop"
import { useClock } from "@/hooks/use-clock"

/**
 * Sleep mode: a near-black overlay with an ambient clock. Any interaction wakes
 * the machine. Rendered above everything except the boot splash.
 */
export function SleepOverlay() {
  const { isAsleep, wake } = useSystem()
  const { time, date } = useClock()

  useEffect(() => {
    if (!isAsleep) return
    const onKey = () => wake()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isAsleep, wake])

  return (
    <AnimatePresence>
      {isAsleep && (
        <motion.div
          key="sleep"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={wake}
          className="fixed inset-0 z-[9500] flex cursor-pointer flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-center text-white/70 select-none"
          >
            <div className="text-8xl font-thin tabular-nums tracking-tighter">{time}</div>
            <div className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-white/40">
              {date}
            </div>
          </motion.div>
          <div className="absolute bottom-12 text-xs uppercase tracking-[0.25em] text-white/25">
            Click anywhere to wake
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
