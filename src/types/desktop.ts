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

export interface SiteSettings {
  theme: "light" | "dark" | "system"
  wallpaperIndex: number
  animations: boolean
  cursorStyle: "default" | "xl" | "custom"
  iconSize: "small" | "medium" | "large"
  experience: "studyos" | "boring" // OS mode vs traditional website
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  theme: "system",
  wallpaperIndex: 0,
  animations: true,
  cursorStyle: "default",
  iconSize: "medium",
  experience: "studyos",
}
