"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { DisplayApp } from "@/components/apps/display-app"

export default function DisplayPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "display-window",
      key: "display-window",
      path: "/display",
      title: "Display",
      icon: "🖥️",
      element: <DisplayApp />,
    })
  }, [addWindow])

  return null
}
