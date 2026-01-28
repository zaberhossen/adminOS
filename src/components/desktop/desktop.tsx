"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDesktop, useDesktopIcons } from "@/hooks/use-desktop"
import { DESKTOP_ICONS } from "./desktop-icons"
import { DesktopIcon as DesktopIconComponent } from "../desktop-icon"
import { IconPosition } from "@/types/desktop"

interface DesktopProps {
  constraintsRef: React.RefObject<HTMLDivElement | null>
}

export function Desktop({ constraintsRef }: DesktopProps) {
  const { addWindow } = useDesktop()
  const { iconPositions, setIconPosition } = useDesktopIcons()
  const [mounted, setMounted] = useState(false)
  const [rendered, setRendered] = useState(false)

  // Generate initial grid positions for icons
  const generateInitialPositions = (): Record<string, IconPosition> => {
    const positions: Record<string, IconPosition> = {}
    const containerHeight = typeof window !== "undefined" ? window.innerHeight : 800

    const iconHeight = 75
    const paddingHorizontal = 12
    const paddingVertical = 20
    const columnSpacing = 128

    const availableHeight = containerHeight - paddingVertical * 2 - 44 // 44 for taskbar
    const maxIconsPerColumn = Math.floor(availableHeight / iconHeight)

    DESKTOP_ICONS.forEach((icon, index) => {
      const columnIndex = Math.floor(index / maxIconsPerColumn)
      const positionInColumn = index % maxIconsPerColumn

      positions[icon.id] = {
        x: paddingHorizontal + columnIndex * columnSpacing,
        y: paddingVertical + positionInColumn * iconHeight,
      }
    })

    return positions
  }

  useEffect(() => {
    setMounted(true)

    // Initialize icon positions if not already set
    if (Object.keys(iconPositions).length === 0) {
      const initialPositions = generateInitialPositions()
      Object.entries(initialPositions).forEach(([id, position]) => {
        setIconPosition(id, position)
      })
    }

    // Trigger animation
    setTimeout(() => {
      setRendered(true)
    }, 200)

    // Handle window resize
    const handleResize = () => {
      const initialPositions = generateInitialPositions()
      Object.entries(initialPositions).forEach(([id, position]) => {
        setIconPosition(id, position)
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleIconDoubleClick = (iconId: string) => {
    const icon = DESKTOP_ICONS.find((i) => i.id === iconId)
    if (!icon) return

    if (icon.action) {
      icon.action()
    } else if (icon.path) {
      const timestamp = Date.now()
      addWindow({
        id: `window-${iconId}-${timestamp}`,
        key: `window-${iconId}-${timestamp}`,
        path: icon.path,
        title: icon.label,
        icon: icon.icon,
      })
    }
  }

  const handlePositionChange = (iconId: string, position: IconPosition) => {
    setIconPosition(iconId, position)
  }

  if (!mounted) return null

  return (
    <>
      {/* Desktop Icons */}
      {DESKTOP_ICONS.map((icon) => {
        const position = iconPositions[icon.id] || { x: 0, y: 0 }
        return (
          <motion.div
            key={icon.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: rendered ? 1 : 0, scale: rendered ? 1 : 0.8 }}
            transition={{
              delay: Object.keys(iconPositions).indexOf(icon.id) * 0.05,
            }}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            onDragEnd={(event, info) => {
              handlePositionChange(icon.id, {
                x: position.x + info.offset.x,
                y: position.y + info.offset.y,
              })
            }}
          >
            <DesktopIconComponent
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            />
          </motion.div>
        )
      })}
    </>
  )
}
