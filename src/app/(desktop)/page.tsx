"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function HomePage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    // Auto-open home window on mount
    addWindow({
      id: "home-window",
      key: "home-window",
      path: "/",
      title: "home.mdx",
      icon: "📄",
      element: (
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-black tracking-tight text-black">
              Welcome to StudyOS
            </h1>
            <p className="text-lg leading-relaxed text-black/80">
              A retro-inspired desktop OS for modern student learning. Built with Next.js, Zustand, and Shadcn UI.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-black/80">
              <li>Draggable, resizable windows</li>
              <li>Window snapping to edges</li>
              <li>Multiple wallpapers</li>
              <li>Desktop icons with custom positioning</li>
              <li>Start menu and taskbar</li>
              <li>Retro Windows 95/XP aesthetic</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">Quick Start</h2>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center rounded border border-black/30 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/5 transition-colors">
                📚 Browse Courses
              </button>
              <button className="inline-flex items-center rounded border border-black/30 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/5 transition-colors">
                📖 Open Library
              </button>
              <button className="inline-flex items-center rounded border border-black/30 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-black/5 transition-colors">
                📝 Take Notes
              </button>
            </div>
          </div>

          <div className="rounded border border-black/20 bg-blue-50 p-4">
            <p className="text-sm text-black/80">
              <strong>Tip:</strong> Double-click desktop icons to open apps. Drag windows by their title bar. 
              Drag windows to the left or right edge to snap them to half screen.
            </p>
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
