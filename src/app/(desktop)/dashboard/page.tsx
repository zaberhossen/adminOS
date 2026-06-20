"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { DashboardApp } from "@/components/apps/dashboard-app"

export default function DashboardPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "dashboard-window",
      key: "dashboard-window",
      path: "/dashboard",
      title: "Dashboard",
      icon: "📊",
      element: <DashboardApp />,
    })
  }, [addWindow])

  return null
}
