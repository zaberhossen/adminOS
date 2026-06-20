"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, BellOff, CheckCheck } from "lucide-react"
import { useNotifications } from "@/hooks/use-desktop"
import { AppNotification, NotificationKind } from "@/types/desktop"
import { cn } from "@/lib/utils"

const KIND_STYLES: Record<NotificationKind, string> = {
  info: "bg-blue/15 text-blue",
  success: "bg-green/15 text-green",
  warning: "bg-orange/15 text-orange-dark",
  error: "bg-red/15 text-red",
}

function relativeTime(ts: number): string {
  if (!ts) return "earlier"
  const diff = Date.now() - ts
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

function NotificationCard({ n }: { n: AppNotification }) {
  const { dismissNotification, markNotificationRead } = useNotifications()
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.18 }}
      onClick={() => markNotificationRead(n.id)}
      className={cn(
        "group relative cursor-default rounded-lg border border-input bg-input p-3 text-sm",
        !n.read && "ring-1 ring-blue/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-md text-base", KIND_STYLES[n.kind])}>
          {n.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-semibold text-primary">{n.title}</span>
            <span className="shrink-0 text-[11px] text-muted">{relativeTime(n.timestamp)}</span>
          </div>
          <p className="mt-0.5 text-secondary">{n.body}</p>
          <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            {n.app}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          dismissNotification(n.id)
        }}
        aria-label="Dismiss"
        className="absolute right-1.5 top-1.5 hidden size-6 items-center justify-center rounded text-muted transition-colors hover:bg-accent hover:text-primary group-hover:flex"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  )
}

export function NotificationCenter() {
  const {
    notifications,
    notificationCenterOpen,
    setNotificationCenterOpen,
    markAllNotificationsRead,
    clearNotifications,
  } = useNotifications()

  return (
    <AnimatePresence>
      {notificationCenterOpen && (
        <>
          {/* Click-away scrim (transparent) */}
          <motion.div
            key="notif-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[8000]"
            onClick={() => setNotificationCenterOpen(false)}
          />
          <motion.aside
            key="notif-panel"
            data-scheme="secondary"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="fixed bottom-0 right-0 top-9 z-[8001] flex w-[340px] flex-col border-l border-primary bg-primary/80 backdrop-blur-2xl skin-classic:bg-primary"
          >
            <header className="flex items-center justify-between border-b border-primary px-4 py-3">
              <div>
                <div className="text-sm font-bold text-primary">Notifications</div>
                <div className="text-xs text-muted">
                  {notifications.filter((n) => !n.read).length} unread
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={markAllNotificationsRead}
                  title="Mark all read"
                  className="flex size-7 items-center justify-center rounded text-secondary transition-colors hover:bg-accent hover:text-primary"
                >
                  <CheckCheck className="size-4" />
                </button>
                <button
                  onClick={() => setNotificationCenterOpen(false)}
                  title="Close"
                  className="flex size-7 items-center justify-center rounded text-secondary transition-colors hover:bg-accent hover:text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              <AnimatePresence initial={false}>
                {notifications.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-center text-muted">
                    <BellOff className="size-8 opacity-40" />
                    <span className="text-sm">You&apos;re all caught up</span>
                  </div>
                ) : (
                  notifications.map((n) => <NotificationCard key={n.id} n={n} />)
                )}
              </AnimatePresence>
            </div>

            {notifications.length > 0 && (
              <footer className="border-t border-primary p-3">
                <button
                  onClick={clearNotifications}
                  className="w-full rounded-md border border-input bg-input py-2 text-sm font-medium text-secondary transition-colors hover:bg-accent hover:text-primary"
                >
                  Clear all
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
