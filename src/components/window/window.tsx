"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useDragControls, useMotionValue, PanInfo } from "framer-motion"
import { WindowState } from "@/types/window"
import { useDesktop } from "@/hooks/use-desktop"
import { WindowChrome } from "./window-chrome"
import { ResizeHandles } from "./resize-handles"
import { cn } from "@/lib/utils"

interface WindowProps {
  windowState: WindowState
  constraintsRef: React.RefObject<HTMLDivElement | null>
}

const snapThreshold = 40 // px from edge to trigger snap

const clamp = (value: number, min: number, max?: number) =>
  Math.max(min, Math.min(max ?? Infinity, value))

export function Window({ windowState, constraintsRef }: WindowProps) {
  const {
    bringToFront,
    updateWindowPosition,
    updateWindow,
    restoreWindow,
  } = useDesktop()

  const windowRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [snapIndicator, setSnapIndicator] = useState<"left" | "right" | null>(null)

  // Position is driven by motion values so dragging never triggers a React
  // re-render (smooth + no lag) and the released value is the constraint-clamped
  // transform (precise — not the raw pointer offset).
  const x = useMotionValue(windowState.position.x)
  const y = useMotionValue(windowState.position.y)

  // Bases captured at the start of an interaction, read from refs to avoid
  // stale-closure bugs in the long-lived pointer listeners.
  const containerRect = useRef<DOMRect | null>(null)
  const resizeBase = useRef<{
    width: number
    height: number
    x: number
    y: number
  } | null>(null)

  // Sync motion values when position changes from outside a drag
  // (maximize, restore, snap, resize from a left/top edge).
  useEffect(() => {
    if (isDragging) return
    x.set(windowState.position.x)
    y.set(windowState.position.y)
  }, [windowState.position.x, windowState.position.y, isDragging, x, y])

  const handleMouseDown = () => {
    if (windowState.isMinimized) return
    bringToFront(windowState.id)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    bringToFront(windowState.id)
    containerRect.current = constraintsRef.current?.getBoundingClientRect() ?? null
  }

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const rect = containerRect.current
    if (!rect) return
    const localX = info.point.x - rect.left
    if (localX < snapThreshold) {
      if (snapIndicator !== "left") setSnapIndicator("left")
    } else if (localX > rect.width - snapThreshold) {
      if (snapIndicator !== "right") setSnapIndicator("right")
    } else if (snapIndicator !== null) {
      setSnapIndicator(null)
    }
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const rect = containerRect.current
    const localX = rect ? info.point.x - rect.left : null

    // Snap to a half on release near an edge
    if (rect && localX !== null && localX < snapThreshold) {
      setSnapIndicator(null)
      updateWindow(windowState.id, {
        position: { x: 0, y: 0 },
        size: { width: Math.round(rect.width / 2), height: rect.height },
        isMaximized: false,
      })
      return
    }
    if (rect && localX !== null && localX > rect.width - snapThreshold) {
      setSnapIndicator(null)
      updateWindow(windowState.id, {
        position: { x: Math.round(rect.width / 2), y: 0 },
        size: { width: Math.round(rect.width / 2), height: rect.height },
        isMaximized: false,
      })
      return
    }

    setSnapIndicator(null)
    // The motion value already holds the clamped, exact transform.
    updateWindowPosition(windowState.id, {
      x: Math.round(x.get()),
      y: Math.round(y.get()),
    })
  }

  // ---- Resize: capture base size/position once, apply total delta. ----
  const handleResizeStart = () => {
    setIsResizing(true)
    bringToFront(windowState.id)
    resizeBase.current = {
      width: windowState.size.width,
      height: windowState.size.height,
      x: windowState.position.x,
      y: windowState.position.y,
    }
  }

  const handleResizeEnd = () => {
    setIsResizing(false)
    resizeBase.current = null
  }

  const handleResize = (direction: string, delta: { x: number; y: number }) => {
    const base = resizeBase.current
    if (!base) return
    const { min, max } = windowState.sizeConstraints

    let width = base.width
    let height = base.height
    let posX = base.x
    let posY = base.y

    if (direction.includes("right")) {
      width = clamp(base.width + delta.x, min.width, max?.width)
    }
    if (direction.includes("left")) {
      width = clamp(base.width - delta.x, min.width, max?.width)
      posX = base.x + (base.width - width)
    }
    if (direction.includes("bottom")) {
      height = clamp(base.height + delta.y, min.height, max?.height)
    }
    if (direction.includes("top")) {
      height = clamp(base.height - delta.y, min.height, max?.height)
      posY = base.y + (base.height - height)
    }

    updateWindow(windowState.id, {
      size: { width: Math.round(width), height: Math.round(height) },
      position: { x: Math.round(posX), y: Math.round(posY) },
    })
  }

  // ---- Maximize / restore from the real container box (no cutoff). ----
  const handleToggleMaximize = () => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id)
      return
    }
    const rect = constraintsRef.current?.getBoundingClientRect()
    if (!rect) return
    updateWindow(windowState.id, {
      isMaximized: true,
      previousPosition: windowState.position,
      previousSize: windowState.size,
      position: { x: 0, y: 0 },
      size: { width: Math.round(rect.width), height: Math.round(rect.height) },
      zIndex: windowState.zIndex,
    })
  }

  if (windowState.isMinimized) {
    return null
  }

  return (
    <>
      {/* Snap preview */}
      {snapIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className={cn(
            "pointer-events-none absolute top-0 z-[9999] h-full rounded-md border-2 border-blue bg-blue/40",
            snapIndicator === "left" ? "left-0" : "right-0"
          )}
          style={{
            width: containerRect.current
              ? containerRect.current.width / 2
              : "50%",
          }}
        />
      )}

      {/* Window */}
      <motion.div
        ref={windowRef}
        drag={!windowState.isMaximized && !isResizing}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.14, ease: "easeOut" }}
        style={{
          position: "absolute",
          x,
          y,
          width: windowState.size.width,
          height: windowState.size.height,
          zIndex: windowState.zIndex,
        }}
        data-scheme="tertiary"
        className={cn(
          "@container flex flex-col overflow-hidden rounded border bg-transparent",
          isDragging || isResizing
            ? "[&_*]:select-none shadow-2xl border-primary"
            : "shadow-lg border-input"
        )}
      >
        {/* Title bar */}
        <WindowChrome
          windowState={windowState}
          dragControls={dragControls}
          isDragging={isDragging}
          onToggleMaximize={handleToggleMaximize}
        />

        {/* Content */}
        <div data-scheme="primary" className="relative flex-1 overflow-auto bg-primary text-primary">
          {windowState.element || (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div>
                <div className="mb-2 text-4xl">{windowState.icon}</div>
                <div className="text-lg font-semibold text-primary">{windowState.title}</div>
                <div className="mt-2 text-sm text-muted">{windowState.path}</div>
              </div>
            </div>
          )}
        </div>

        {/* Resize handles */}
        {!windowState.isMaximized &&
          windowState.appSettings.resizable !== false && (
            <ResizeHandles
              onResize={handleResize}
              onResizeStart={handleResizeStart}
              onResizeEnd={handleResizeEnd}
            />
          )}
      </motion.div>
    </>
  )
}
