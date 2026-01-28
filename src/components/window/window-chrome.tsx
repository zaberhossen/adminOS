"use client"

import { DragControls } from "framer-motion"
import { X, Minus, Square, Maximize2 } from "lucide-react"
import { WindowState } from "@/types/window"
import { useDesktop } from "@/hooks/use-desktop"
import { cn } from "@/lib/utils"

interface WindowChromeProps {
  windowState: WindowState
  dragControls: DragControls
  isDragging: boolean
}

export function WindowChrome({ windowState, dragControls, isDragging }: WindowChromeProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow } = useDesktop()

  const handleClose = () => {
    closeWindow(windowState.id)
  }

  const handleMinimize = () => {
    minimizeWindow(windowState.id)
  }

  const handleMaximize = () => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id)
    } else {
      maximizeWindow(windowState.id)
    }
  }

  const handleDoubleClick = () => {
    if (windowState.appSettings.maximizable !== false) {
      handleMaximize()
    }
  }

  return (
    <div
      onPointerDown={(e) => dragControls.start(e)}
      onDoubleClick={handleDoubleClick}
      className={cn(
        "flex items-center justify-between",
        "h-8 px-2 cursor-move select-none",
        "bg-gradient-to-b from-[#0054e3] to-[#0099ff]",
        "border-b border-[#808080]",
        isDragging && "cursor-grabbing"
      )}
    >
      {/* Window Icon and Title */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-sm">{windowState.icon}</span>
        <span className="text-sm font-semibold text-white truncate">
          {windowState.title}
        </span>
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-1">
        {/* Minimize Button */}
        {windowState.appSettings.minimizable !== false && (
          <button
            onClick={handleMinimize}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded",
              "bg-white/90 hover:bg-white",
              "border border-black/20",
              "transition-colors"
            )}
            title="Minimize"
          >
            <Minus className="h-3 w-3 text-black" />
          </button>
        )}

        {/* Maximize Button */}
        {windowState.appSettings.maximizable !== false && (
          <button
            onClick={handleMaximize}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded",
              "bg-white/90 hover:bg-white",
              "border border-black/20",
              "transition-colors"
            )}
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          >
            {windowState.isMaximized ? (
              <Square className="h-3 w-3 text-black" />
            ) : (
              <Maximize2 className="h-3 w-3 text-black" />
            )}
          </button>
        )}

        {/* Close Button */}
        {windowState.appSettings.closable !== false && (
          <button
            onClick={handleClose}
            onPointerDown={(e) => e.stopPropagation()}
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded",
              "bg-red-500/90 hover:bg-red-500",
              "border border-black/20",
              "transition-colors"
            )}
            title="Close"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}
