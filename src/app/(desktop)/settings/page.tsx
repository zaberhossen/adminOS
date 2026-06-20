"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { SettingsApp } from "@/components/apps/settings-app"

export default function SettingsPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "settings-window",
      key: "settings-window",
      path: "/settings",
      title: "Settings",
      icon: "⚙️",
      element: <SettingsApp />,
    })
  }, [addWindow])

  return null
}
