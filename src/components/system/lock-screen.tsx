"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, ArrowRight, User } from "lucide-react"
import { useSystem, useDesktopSettings } from "@/hooks/use-desktop"
import { WALLPAPERS } from "@/components/desktop/wallpapers"
import { useClock } from "@/hooks/use-clock"

/**
 * Login / lock screen. Shown on startup and whenever the session is locked.
 * Authentication is intentionally a no-op — this is a template, so any
 * (or no) password signs in. Swap `handleSubmit` for a real auth call.
 */
export function LockScreen() {
  const { isLocked, isBooting, unlock } = useSystem()
  const { siteSettings } = useDesktopSettings()
  const { time, date } = useClock()
  const [password, setPassword] = useState("")
  const [shake, setShake] = useState(false)

  const wallpaper = WALLPAPERS[siteSettings.wallpaperIndex % WALLPAPERS.length]
  const visible = isLocked && !isBooting

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo auth: accept anything. Show a shake only on a deliberately wrong word.
    if (password.trim().toLowerCase() === "wrong") {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    unlock()
    setPassword("")
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="lock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: wallpaper.bgImage,
            backgroundColor: wallpaper.bgColor,
            backgroundSize: wallpaper.bgSize ?? "cover",
            backgroundPosition: wallpaper.bgPosition ?? "center",
            backgroundRepeat: wallpaper.bgRepeat ?? "no-repeat",
          }}
        >
          {/* Dim + blur scrim */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-xl" />

          {/* Clock */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="relative z-10 mb-12 text-center text-white drop-shadow"
          >
            <div className="text-7xl font-bold tabular-nums tracking-tight">{time}</div>
            <div className="mt-2 text-lg font-medium text-white/80">{date}</div>
          </motion.div>

          {/* Login card */}
          <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-80 rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-5 flex flex-col items-center gap-3">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/15 text-3xl ring-2 ring-white/20">
                👤
              </div>
              <div className="text-center">
                <div className="text-base font-semibold">Admin</div>
                <div className="flex items-center justify-center gap-1 text-xs text-white/60">
                  <User className="size-3" /> admin@adminos.dev
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 focus-within:border-white/50">
              <Lock className="size-4 shrink-0 text-white/60" />
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (any will do)"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Sign in"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-white/90 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
            >
              Sign in
            </button>
            <p className="mt-3 text-center text-[11px] text-white/50">
              Demo login — authentication is stubbed for the template.
            </p>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
