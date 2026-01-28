import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { WindowState, WindowPosition, WindowSize, AppSettings } from "@/types/window"
import { SiteSettings, DEFAULT_SITE_SETTINGS, IconPosition } from "@/types/desktop"

interface DesktopStore {
  // Window Management
  windows: WindowState[]
  focusedWindow: WindowState | null
  maxZIndex: number
  
  // Window Actions
  addWindow: (config: Partial<WindowState> & Pick<WindowState, "id" | "path" | "title">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  bringToFront: (id: string) => void
  updateWindowPosition: (id: string, position: WindowPosition) => void
  updateWindowSize: (id: string, size: WindowSize) => void
  updateWindow: (id: string, updates: Partial<WindowState>) => void
  setWindowTitle: (id: string, title: string) => void
  closeAllWindows: () => void
  
  // Window Helpers
  getWindowById: (id: string) => WindowState | undefined
  getDesktopCenterPosition: (size: WindowSize) => WindowPosition
  getPositionDefaults: (path: string, size: WindowSize) => WindowPosition
  
  // Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
  
  // Desktop Icons
  iconPositions: Record<string, IconPosition>
  setIconPosition: (iconId: string, position: IconPosition) => void
  resetIconPositions: () => void
  
  // UI State
  startMenuOpen: boolean
  toggleStartMenu: () => void
  setStartMenuOpen: (open: boolean) => void
  
  // Constraints
  taskbarHeight: number
}

// Default window size constraints
const DEFAULT_SIZE_CONSTRAINTS = {
  min: { width: 400, height: 300 },
  max: { width: 1400, height: 1000 },
  fixed: false,
  autoHeight: false,
}

// App-specific settings
const APP_SETTINGS: Record<string, AppSettings> = {
  "/": {
    size: {
      min: { width: 700, height: 500 },
      max: { width: 800, height: 800 },
      fixed: false,
    },
    position: { center: true },
  },
  "/courses": {
    size: {
      min: { width: 900, height: 600 },
      max: { width: 1200, height: 900 },
    },
    position: { center: true },
  },
  "/library": {
    size: {
      min: { width: 800, height: 600 },
    },
  },
  "/notes": {
    size: {
      min: { width: 600, height: 500 },
    },
  },
}

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set, get) => ({
      // Initial State
      windows: [],
      focusedWindow: null,
      maxZIndex: 1,
      taskbarHeight: 44,
      startMenuOpen: false,
      siteSettings: DEFAULT_SITE_SETTINGS,
      iconPositions: {},

      // Window Actions
      addWindow: (config) => {
        const state = get()
        const existingWindow = state.windows.find((w) => w.path === config.path)
        
        // If window already exists, bring it to front
        if (existingWindow) {
          get().bringToFront(existingWindow.id)
          return
        }

        const appSettings = APP_SETTINGS[config.path] || {}
        const sizeConstraints = config.sizeConstraints || appSettings.size || DEFAULT_SIZE_CONSTRAINTS
        
        const defaultSize = {
          width: Math.max(sizeConstraints.min.width, 800),
          height: Math.max(sizeConstraints.min.height, 600),
        }
        
        const size = config.size || defaultSize
        const position = config.position || get().getPositionDefaults(config.path, size)

        const newWindow: WindowState = {
          id: config.id,
          key: config.key || config.id,
          path: config.path,
          title: config.title,
          element: config.element,
          position,
          size,
          sizeConstraints,
          zIndex: state.maxZIndex + 1,
          isMinimized: false,
          isMaximized: false,
          appSettings: {
            ...appSettings,
            resizable: config.appSettings?.resizable ?? true,
            minimizable: config.appSettings?.minimizable ?? true,
            maximizable: config.appSettings?.maximizable ?? true,
            closable: config.appSettings?.closable ?? true,
          },
          icon: config.icon || "📄",
          timestamp: Date.now(),
        }

        set((state) => ({
          windows: [...state.windows, newWindow],
          focusedWindow: newWindow,
          maxZIndex: state.maxZIndex + 1,
        }))
      },

      closeWindow: (id) => {
        set((state) => {
          const windows = state.windows.filter((w) => w.id !== id)
          const focusedWindow =
            state.focusedWindow?.id === id
              ? windows.length > 0
                ? windows[windows.length - 1]
                : null
              : state.focusedWindow
          
          return { windows, focusedWindow }
        })
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          focusedWindow: state.focusedWindow?.id === id ? null : state.focusedWindow,
        }))
      },

      maximizeWindow: (id) => {
        set((state) => {
          const window = state.windows.find((w) => w.id === id)
          if (!window) return state

          const desktopWidth = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1200
          const desktopHeight = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 800
          const taskbarHeight = state.taskbarHeight

          return {
            windows: state.windows.map((w) =>
              w.id === id
                ? {
                    ...w,
                    isMaximized: true,
                    previousPosition: w.position,
                    previousSize: w.size,
                    position: { x: 0, y: 0 },
                    size: {
                      width: desktopWidth,
                      height: desktopHeight - taskbarHeight,
                    },
                  }
                : w
            ),
          }
        })
      },

      restoreWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? {
                  ...w,
                  isMinimized: false,
                  isMaximized: false,
                  position: w.previousPosition || w.position,
                  size: w.previousSize || w.size,
                  zIndex: state.maxZIndex + 1,
                }
              : w
          ),
          maxZIndex: state.maxZIndex + 1,
        }))
      },

      bringToFront: (id) => {
        set((state) => {
          const window = state.windows.find((w) => w.id === id)
          if (!window || window.isMinimized) {
            // If minimized, restore it
            get().restoreWindow(id)
            return state
          }

          return {
            windows: state.windows.map((w) =>
              w.id === id ? { ...w, zIndex: state.maxZIndex + 1 } : w
            ),
            focusedWindow: window,
            maxZIndex: state.maxZIndex + 1,
          }
        })
      },

      updateWindowPosition: (id, position) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, position } : w
          ),
        }))
      },

      updateWindowSize: (id, size) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, size } : w
          ),
        }))
      },

      updateWindow: (id, updates) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        }))
      },

      setWindowTitle: (id, title) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, title } : w
          ),
        }))
      },

      closeAllWindows: () => {
        set({ windows: [], focusedWindow: null })
      },

      // Window Helpers
      getWindowById: (id) => {
        return get().windows.find((w) => w.id === id)
      },

      getDesktopCenterPosition: (size) => {
        const desktopWidth = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1200
        const desktopHeight = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 800
        const taskbarHeight = get().taskbarHeight

        return {
          x: Math.max(0, (desktopWidth - size.width) / 2),
          y: Math.max(0, (desktopHeight - taskbarHeight - size.height) / 2),
        }
      },

      getPositionDefaults: (path, size) => {
        const appSettings = APP_SETTINGS[path]
        
        if (appSettings?.position?.center) {
          return get().getDesktopCenterPosition(size)
        }

        if (appSettings?.position?.getPositionDefaults) {
          return appSettings.position.getPositionDefaults(
            size,
            get().windows,
            get().getDesktopCenterPosition
          )
        }

        // Default: cascade windows
        const windows = get().windows
        const offset = (windows.length % 5) * 40
        
        return {
          x: 80 + offset,
          y: 60 + offset,
        }
      },

      // Settings
      updateSiteSettings: (settings) => {
        set((state) => ({
          siteSettings: { ...state.siteSettings, ...settings },
        }))
      },

      // Desktop Icons
      setIconPosition: (iconId, position) => {
        set((state) => ({
          iconPositions: {
            ...state.iconPositions,
            [iconId]: position,
          },
        }))
      },

      resetIconPositions: () => {
        set({ iconPositions: {} })
      },

      // UI State
      toggleStartMenu: () => {
        set((state) => ({ startMenuOpen: !state.startMenuOpen }))
      },

      setStartMenuOpen: (open) => {
        set({ startMenuOpen: open })
      },
    }),
    {
      name: "studyos-desktop-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        siteSettings: state.siteSettings,
        iconPositions: state.iconPositions,
      }),
    }
  )
)
