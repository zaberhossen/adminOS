"use client"

import { useEffect, useState } from "react"

/**
 * Shared ticking clock. Returns mount-safe formatted time/date strings so
 * server and client render identically until hydration completes.
 */
export function useClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    // Set the real time only after mount so SSR and the first client render
    // match (avoids a hydration mismatch); then tick every second.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    time: now
      ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "--:--",
    date: now
      ? now.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : "",
    mounted: now !== null,
  }
}
