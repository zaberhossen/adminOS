"use client"

import dynamic from "next/dynamic"
import { ComponentType } from "react"

/** Lightweight loading state shown while an app chunk streams in. */
function AppLoading() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-muted">
      <span className="animate-pulse">Loading…</span>
    </div>
  )
}

// Each app is code-split via next/dynamic so a window only pulls in its own
// bundle when opened — keeps the initial desktop payload small.
const lazy = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, { loading: AppLoading })

export interface AppDefinition {
  title: string
  icon: string
  Component: ComponentType
}

export const APP_REGISTRY: Record<string, AppDefinition> = {
  "/": {
    title: "Read Me",
    icon: "📄",
    Component: lazy(() => import("./readme-app").then((m) => ({ default: m.ReadmeApp }))),
  },
  "/dashboard": {
    title: "Dashboard",
    icon: "📊",
    Component: lazy(() => import("./dashboard-app").then((m) => ({ default: m.DashboardApp }))),
  },
  "/users": {
    title: "Users",
    icon: "👥",
    Component: lazy(() => import("./users-app").then((m) => ({ default: m.UsersApp }))),
  },
  "/analytics": {
    title: "Analytics",
    icon: "📈",
    Component: lazy(() => import("./analytics-app").then((m) => ({ default: m.AnalyticsApp }))),
  },
  "/files": {
    title: "Files",
    icon: "🗂️",
    Component: lazy(() => import("./files-app").then((m) => ({ default: m.FilesApp }))),
  },
  "/ui-kit": {
    title: "UI Kit",
    icon: "🧩",
    Component: lazy(() => import("./ui-kit-app").then((m) => ({ default: m.UiKitApp }))),
  },
  "/settings": {
    title: "Settings",
    icon: "⚙️",
    Component: lazy(() => import("./settings-app").then((m) => ({ default: m.SettingsApp }))),
  },
  "/display": {
    title: "Display",
    icon: "🖥️",
    Component: lazy(() => import("./display-app").then((m) => ({ default: m.DisplayApp }))),
  },
}

export function getApp(path: string): AppDefinition | undefined {
  return APP_REGISTRY[path]
}
