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
  onToggleMaximize: () => void
}

export function WindowChrome({ windowState, dragControls, isDragging, onToggleMaximize }: WindowChromeProps) {
  const { closeWindow, minimizeWindow } = useDesktop()

  const handleClose = () => {
    closeWindow(windowState.id)
  }

  const handleMinimize = () => {
    minimizeWindow(windowState.id)
  }

  const handleMaximize = () => {
    onToggleMaximize()
  }

  const handleDoubleClick = () => {
    if (windowState.appSettings.maximizable !== false) {
      onToggleMaximize()
    }
  }

  return (
    <div
      data-scheme="tertiary"
      onPointerDown={(e) => dragControls.start(e)}
      onDoubleClick={handleDoubleClick}
      className={cn(
        "flex-shrink-0 w-full grid grid-cols-[minmax(80px,auto)_1fr_minmax(80px,auto)] gap-1 items-center",
        "py-1 pl-2 pr-1 select-none",
        "bg-primary/50 backdrop-blur-2xl skin-classic:bg-primary border-b border-input",
        isDragging ? "cursor-grabbing" : "cursor-move"
      )}
    >
      {/* Left: window icon */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm">{windowState.icon}</span>
      </div>

      {/* Center: title */}
      <div className="flex-1 truncate flex items-center justify-center">
        <span className="text-sm font-semibold text-primary truncate select-none">
          {windowState.title}
        </span>
      </div>

      {/* Right: window controls */}
      <div className="flex items-center justify-end gap-0.5">
        {windowState.appSettings.minimizable !== false && (
          <button
            onClick={handleMinimize}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center justify-center size-6 rounded text-secondary hover:text-primary hover:bg-accent transition-colors"
            title="Minimize"
          >
            <Minus className="size-4" />
          </button>
        )}

        {windowState.appSettings.maximizable !== false && (
          <button
            onClick={handleMaximize}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center justify-center size-6 rounded text-secondary hover:text-primary hover:bg-accent transition-colors"
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          >
            {windowState.isMaximized ? (
              <Square className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </button>
        )}

        {windowState.appSettings.closable !== false && (
          <button
            onClick={handleClose}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center justify-center size-6 rounded text-secondary hover:text-white hover:bg-red transition-colors"
            title="Close"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
