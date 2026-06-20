"use client"

import { SystemShell } from "@/components/system/system-shell"

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SystemShell />
      {/* Hidden container for Next.js pages — they render inside windows */}
      <div className="hidden">{children}</div>
    </>
  )
}
