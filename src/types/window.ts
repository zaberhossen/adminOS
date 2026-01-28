import { ReactNode } from "react"

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowSizeConstraints {
  min: { width: number; height: number }
  max?: { width: number; height: number }
  fixed?: boolean
  autoHeight?: boolean
}

export interface AppSettings {
  size?: WindowSizeConstraints
  position?: {
    center?: boolean
    getPositionDefaults?: (
      size: WindowSize,
      windows: WindowState[],
      getDesktopCenterPosition: (size: WindowSize) => WindowPosition
    ) => WindowPosition
  }
  resizable?: boolean
  minimizable?: boolean
  maximizable?: boolean
  closable?: boolean
}

export interface WindowState {
  id: string
  key: string
  path: string
  title: string
  element?: ReactNode
  position: WindowPosition
  previousPosition?: WindowPosition
  size: WindowSize
  previousSize?: WindowSize
  sizeConstraints: WindowSizeConstraints
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  appSettings: AppSettings
  icon?: string
  timestamp: number
}

export type WindowAction =
  | { type: "ADD_WINDOW"; payload: Partial<WindowState> & Pick<WindowState, "id" | "path" | "title"> }
  | { type: "CLOSE_WINDOW"; payload: { id: string } }
  | { type: "MINIMIZE_WINDOW"; payload: { id: string } }
  | { type: "MAXIMIZE_WINDOW"; payload: { id: string } }
  | { type: "RESTORE_WINDOW"; payload: { id: string } }
  | { type: "BRING_TO_FRONT"; payload: { id: string } }
  | { type: "UPDATE_POSITION"; payload: { id: string; position: WindowPosition } }
  | { type: "UPDATE_SIZE"; payload: { id: string; size: WindowSize } }
  | { type: "UPDATE_WINDOW"; payload: { id: string; updates: Partial<WindowState> } }
  | { type: "SET_TITLE"; payload: { id: string; title: string } }
  | { type: "CLOSE_ALL_WINDOWS" }
