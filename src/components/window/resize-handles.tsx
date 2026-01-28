"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface ResizeHandlesProps {
  onResize: (direction: string, delta: { x: number; y: number }) => void
  onResizeStart: () => void
  onResizeEnd: () => void
}

export function ResizeHandles({ onResize, onResizeStart, onResizeEnd }: ResizeHandlesProps) {
  const dragStart = useRef({ x: 0, y: 0 })
  const currentDirection = useRef("")

  const handlePointerDown = (direction: string) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    currentDirection.current = direction
    dragStart.current = { x: e.clientX, y: e.clientY }
    onResizeStart()

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = {
        x: moveEvent.clientX - dragStart.current.x,
        y: moveEvent.clientY - dragStart.current.y,
      }
      onResize(direction, delta)
      dragStart.current = { x: moveEvent.clientX, y: moveEvent.clientY }
    }

    const handlePointerUp = () => {
      onResizeEnd()
      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerup", handlePointerUp)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }

  const handleStyles = "absolute bg-transparent hover:bg-blue-500/20 transition-colors"

  return (
    <>
      {/* Top */}
      <div
        onPointerDown={handlePointerDown("top")}
        className={cn(handleStyles, "top-0 left-2 right-2 h-1 cursor-ns-resize")}
      />
      
      {/* Right */}
      <div
        onPointerDown={handlePointerDown("right")}
        className={cn(handleStyles, "right-0 top-2 bottom-2 w-1 cursor-ew-resize")}
      />
      
      {/* Bottom */}
      <div
        onPointerDown={handlePointerDown("bottom")}
        className={cn(handleStyles, "bottom-0 left-2 right-2 h-1 cursor-ns-resize")}
      />
      
      {/* Left */}
      <div
        onPointerDown={handlePointerDown("left")}
        className={cn(handleStyles, "left-0 top-2 bottom-2 w-1 cursor-ew-resize")}
      />
      
      {/* Top-left corner */}
      <div
        onPointerDown={handlePointerDown("top-left")}
        className={cn(handleStyles, "top-0 left-0 h-2 w-2 cursor-nwse-resize")}
      />
      
      {/* Top-right corner */}
      <div
        onPointerDown={handlePointerDown("top-right")}
        className={cn(handleStyles, "top-0 right-0 h-2 w-2 cursor-nesw-resize")}
      />
      
      {/* Bottom-right corner */}
      <div
        onPointerDown={handlePointerDown("bottom-right")}
        className={cn(handleStyles, "bottom-0 right-0 h-2 w-2 cursor-nwse-resize")}
      />
      
      {/* Bottom-left corner */}
      <div
        onPointerDown={handlePointerDown("bottom-left")}
        className={cn(handleStyles, "bottom-0 left-0 h-2 w-2 cursor-nesw-resize")}
      />
    </>
  )
}
