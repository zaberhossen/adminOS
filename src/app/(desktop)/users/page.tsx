"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { UsersApp } from "@/components/apps/users-app"

export default function UsersPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: "users-window",
      key: "users-window",
      path: "/users",
      title: "Users",
      icon: "👥",
      element: <UsersApp />,
    })
  }, [addWindow])

  return null
}
