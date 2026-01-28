"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"
import { Card, CardContent } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with StudyOS",
    excerpt: "Learn the basics of navigating and using StudyOS for your studies.",
    date: "Jan 25, 2026",
    category: "Tutorial",
    emoji: "🎯",
  },
  {
    id: 2,
    title: "Effective Note-Taking Strategies",
    excerpt: "Discover proven techniques for better note-taking and retention.",
    date: "Jan 23, 2026",
    category: "Study Tips",
    emoji: "📝",
  },
  {
    id: 3,
    title: "Time Management for Students",
    excerpt: "Master your schedule and maximize productivity with these tips.",
    date: "Jan 20, 2026",
    category: "Productivity",
    emoji: "⏰",
  },
]

export default function BlogPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `blog-${Date.now()}`,
      key: `blog-${Date.now()}`,
      path: "/blog",
      title: "Blog",
      icon: "✍️",
      element: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black">Student Blog</h1>
          
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">{post.emoji}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                          {post.category}
                        </span>
                        <span className="text-xs text-black/60">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-black">{post.title}</h3>
                      <p className="text-sm text-black/70">{post.excerpt}</p>
                      <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Read more →
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
