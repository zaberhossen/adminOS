export interface Wallpaper {
  id: string
  name: string
  bgColor?: string
  bgImage?: string
  bgSize?: string
  bgPosition?: string
  bgRepeat?: string
}

export interface IconPosition {
  x: number
  y: number
}

export interface DesktopIcon {
  id: string
  label: string
  icon: string
  path?: string
  action?: () => void
}

export type ThemeMode = "light" | "dark" | "system"

export interface SiteSettings {
  theme: ThemeMode
  wallpaperIndex: number
  animations: boolean
  cursorStyle: "default" | "xl" | "custom"
  iconSize: "small" | "medium" | "large"
  experience: "os" | "boring" // OS mode vs traditional website
  reduceMotion: boolean
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  theme: "system",
  wallpaperIndex: 0,
  animations: true,
  cursorStyle: "default",
  iconSize: "medium",
  experience: "os",
  reduceMotion: false,
}

export type NotificationKind = "info" | "success" | "warning" | "error"

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  app: string
  icon: string
  timestamp: number
  read: boolean
}
