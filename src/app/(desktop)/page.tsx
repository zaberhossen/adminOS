"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { ReadmeApp } from "@/components/apps/readme-app"

export default function HomePage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "readme-window",
      key: "readme-window",
      path: "/",
      title: "Read Me",
      icon: "📄",
      element: <ReadmeApp />,
    })
  }, [addWindow])

  return null
}
