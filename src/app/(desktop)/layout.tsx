"use client"

import { DesktopWrapper } from "@/components/desktop/desktop-wrapper"

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DesktopWrapper />
      {/* Hidden container for Next.js pages - they'll be rendered in windows */}
      <div className="hidden">{children}</div>
    </>
  )
}
