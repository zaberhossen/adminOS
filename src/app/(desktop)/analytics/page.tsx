"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { AnalyticsApp } from "@/components/apps/analytics-app"

export default function AnalyticsPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "analytics-window",
      key: "analytics-window",
      path: "/analytics",
      title: "Analytics",
      icon: "📈",
      element: <AnalyticsApp />,
    })
  }, [addWindow])

  return null
}
