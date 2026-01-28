"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function CoursesPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `courses-${Date.now()}`,
      key: `courses-${Date.now()}`,
      path: "/courses",
      title: "Courses",
      icon: "📚",
      element: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black">Available Courses</h1>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Course Card 1 */}
            <div className="rounded-lg border border-black/20 p-6 space-y-3 bg-gradient-to-br from-blue-50 to-white">
              <div className="text-4xl">💻</div>
              <h3 className="text-xl font-bold text-black">Web Development Fundamentals</h3>
              <p className="text-sm text-black/70">
                Learn HTML, CSS, JavaScript, and modern web development practices.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  Beginner
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  12 weeks
                </span>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="rounded-lg border border-black/20 p-6 space-y-3 bg-gradient-to-br from-purple-50 to-white">
              <div className="text-4xl">🎨</div>
              <h3 className="text-xl font-bold text-black">UI/UX Design Principles</h3>
              <p className="text-sm text-black/70">
                Master user interface and user experience design fundamentals.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                  Intermediate
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  8 weeks
                </span>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="rounded-lg border border-black/20 p-6 space-y-3 bg-gradient-to-br from-green-50 to-white">
              <div className="text-4xl">📊</div>
              <h3 className="text-xl font-bold text-black">Data Science with Python</h3>
              <p className="text-sm text-black/70">
                Explore data analysis, visualization, and machine learning basics.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Advanced
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  16 weeks
                </span>
              </div>
            </div>

            {/* Course Card 4 */}
            <div className="rounded-lg border border-black/20 p-6 space-y-3 bg-gradient-to-br from-orange-50 to-white">
              <div className="text-4xl">🚀</div>
              <h3 className="text-xl font-bold text-black">Product Management 101</h3>
              <p className="text-sm text-black/70">
                Learn how to build and ship successful products from ideation to launch.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                  Beginner
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  10 weeks
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
