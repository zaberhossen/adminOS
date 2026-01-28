"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useDragControls, PanInfo } from "framer-motion"
import { WindowState } from "@/types/window"
import { useDesktop } from "@/hooks/use-desktop"
import { WindowChrome } from "./window-chrome"
import { ResizeHandles } from "./resize-handles"
import { cn } from "@/lib/utils"

interface WindowProps {
  windowState: WindowState
  constraintsRef: React.RefObject<HTMLDivElement | null>
}

const snapThreshold = 50 // pixels from edge to trigger snap

export function Window({ windowState, constraintsRef }: WindowProps) {
  const {
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
    updateWindow,
  } = useDesktop()
  
  const windowRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [snapIndicator, setSnapIndicator] = useState<"left" | "right" | null>(null)

  // Handle window focus
  const handleMouseDown = () => {
    if (windowState.isMinimized) return
    bringToFront(windowState.id)
  }

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true)
    bringToFront(windowState.id)
  }

  // Handle drag with snap preview
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!constraintsRef.current) return

    const containerRect = constraintsRef.current.getBoundingClientRect()
    const x = info.point.x - containerRect.left
    const y = info.point.y - containerRect.top

    // Check for snap zones
    if (x < snapThreshold) {
      setSnapIndicator("left")
    } else if (x > containerRect.width - snapThreshold) {
      setSnapIndicator("right")
    } else {
      setSnapIndicator(null)
    }
  }

  // Handle drag end with snapping
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)

    if (!constraintsRef.current) return

    const containerRect = constraintsRef.current.getBoundingClientRect()
    const x = info.point.x - containerRect.left

    // Snap to left half
    if (x < snapThreshold) {
      updateWindow(windowState.id, {
        position: { x: 0, y: 0 },
        size: {
          width: containerRect.width / 2,
          height: containerRect.height,
        },
        isMaximized: false,
      })
      setSnapIndicator(null)
      return
    }

    // Snap to right half
    if (x > containerRect.width - snapThreshold) {
      updateWindow(windowState.id, {
        position: { x: containerRect.width / 2, y: 0 },
        size: {
          width: containerRect.width / 2,
          height: containerRect.height,
        },
        isMaximized: false,
      })
      setSnapIndicator(null)
      return
    }

    // Normal drag - update position
    const newPosition = {
      x: windowState.position.x + info.offset.x,
      y: windowState.position.y + info.offset.y,
    }
    updateWindowPosition(windowState.id, newPosition)
    setSnapIndicator(null)
  }

  // Handle resize
  const handleResize = (direction: string, delta: { x: number; y: number }) => {
    const newSize = { ...windowState.size }
    const newPosition = { ...windowState.position }

    // Resize based on direction
    if (direction.includes("right")) {
      newSize.width = Math.max(
        windowState.sizeConstraints.min.width,
        Math.min(
          windowState.sizeConstraints.max?.width || Infinity,
          windowState.size.width + delta.x
        )
      )
    }
    if (direction.includes("left")) {
      const newWidth = Math.max(
        windowState.sizeConstraints.min.width,
        Math.min(
          windowState.sizeConstraints.max?.width || Infinity,
          windowState.size.width - delta.x
        )
      )
      if (newWidth !== windowState.size.width) {
        newPosition.x = windowState.position.x + delta.x
        newSize.width = newWidth
      }
    }
    if (direction.includes("bottom")) {
      newSize.height = Math.max(
        windowState.sizeConstraints.min.height,
        Math.min(
          windowState.sizeConstraints.max?.height || Infinity,
          windowState.size.height + delta.y
        )
      )
    }
    if (direction.includes("top")) {
      const newHeight = Math.max(
        windowState.sizeConstraints.min.height,
        Math.min(
          windowState.sizeConstraints.max?.height || Infinity,
          windowState.size.height - delta.y
        )
      )
      if (newHeight !== windowState.size.height) {
        newPosition.y = windowState.position.y + delta.y
        newSize.height = newHeight
      }
    }

    updateWindow(windowState.id, {
      position: newPosition,
      size: newSize,
    })
  }

  // Don't render if minimized
  if (windowState.isMinimized) {
    return null
  }

  return (
    <>
      {/* Snap Indicator */}
      {snapIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className={cn(
            "pointer-events-none absolute top-0 z-[9999] h-full bg-blue-500",
            snapIndicator === "left" ? "left-0" : "right-0"
          )}
          style={{
            width: constraintsRef.current
              ? constraintsRef.current.clientWidth / 2
              : "50%",
          }}
        />
      )}

      {/* Window */}
      <motion.div
        ref={windowRef}
        drag={!windowState.isMaximized && !isResizing}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: windowState.position.x,
          y: windowState.position.y,
          width: windowState.size.width,
          height: windowState.size.height,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          position: "absolute",
          zIndex: windowState.zIndex,
        }}
        className={cn(
          "flex flex-col overflow-hidden rounded-lg shadow-2xl border-2",
          "border-t-white border-l-white border-r-[#808080] border-b-[#808080]",
          "bg-[#c0c0c0]"
        )}
      >
        {/* Window Chrome (Title Bar) */}
        <WindowChrome
          windowState={windowState}
          dragControls={dragControls}
          isDragging={isDragging}
        />

        {/* Window Content */}
        <div className="relative flex-1 overflow-auto bg-white">
          {windowState.element || (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <div className="mb-2 text-4xl">{windowState.icon}</div>
                <div className="text-lg font-semibold">{windowState.title}</div>
                <div className="mt-2 text-sm text-black/60">{windowState.path}</div>
              </div>
            </div>
          )}
        </div>

        {/* Resize Handles */}
        {!windowState.isMaximized &&
          windowState.appSettings.resizable !== false && (
            <ResizeHandles
              onResize={handleResize}
              onResizeStart={() => setIsResizing(true)}
              onResizeEnd={() => setIsResizing(false)}
            />
          )}
      </motion.div>
    </>
  )
}
