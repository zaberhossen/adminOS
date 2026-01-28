"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function LibraryPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `library-${Date.now()}`,
      key: `library-${Date.now()}`,
      path: "/library",
      title: "Library",
      icon: "📖",
      element: (
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-black/10 bg-gray-50 p-4 space-y-2">
            <h2 className="text-sm font-bold text-black/60 uppercase tracking-wider mb-4">Categories</h2>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium bg-blue-500 text-white">
              📚 All Resources
            </button>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium text-black hover:bg-black/5 transition-colors">
              📄 Documents
            </button>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium text-black hover:bg-black/5 transition-colors">
              🎥 Videos
            </button>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium text-black hover:bg-black/5 transition-colors">
              🎧 Audio
            </button>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium text-black hover:bg-black/5 transition-colors">
              🔗 Links
            </button>
            <button className="w-full text-left rounded px-3 py-2 text-sm font-medium text-black hover:bg-black/5 transition-colors">
              ⭐ Favorites
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-black">Resource Library</h1>
              <input
                type="search"
                placeholder="Search resources..."
                className="rounded border border-black/20 px-4 py-2 text-sm"
              />
            </div>

            {/* Resource List */}
            <div className="space-y-3">
              {[
                { icon: "📄", title: "React Hooks Guide", type: "PDF", size: "2.4 MB" },
                { icon: "🎥", title: "Next.js Tutorial Series", type: "Video", size: "450 MB" },
                { icon: "📄", title: "TypeScript Best Practices", type: "Document", size: "1.2 MB" },
                { icon: "🔗", title: "Tailwind CSS Cheat Sheet", type: "Link", size: "—" },
                { icon: "🎧", title: "Software Engineering Podcast", type: "Audio", size: "45 MB" },
                { icon: "📄", title: "Database Design Fundamentals", type: "PDF", size: "3.8 MB" },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-black/10 p-4 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <div className="text-3xl">{resource.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-black">{resource.title}</div>
                    <div className="text-sm text-black/60">
                      {resource.type} • {resource.size}
                    </div>
                  </div>
                  <button className="rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
