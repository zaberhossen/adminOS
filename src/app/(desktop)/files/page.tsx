"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { FilesApp } from "@/components/apps/files-app"

export default function FilesPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "files-window",
      key: "files-window",
      path: "/files",
      title: "Files",
      icon: "🗂️",
      element: <FilesApp />,
    })
  }, [addWindow])

  return null
}
