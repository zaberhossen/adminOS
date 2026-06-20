"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { UiKitApp } from "@/components/apps/ui-kit-app"

export default function UiKitPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "ui-kit-window",
      key: "ui-kit-window",
      path: "/ui-kit",
      title: "UI Kit",
      icon: "🧩",
      element: <UiKitApp />,
    })
  }, [addWindow])

  return null
}
