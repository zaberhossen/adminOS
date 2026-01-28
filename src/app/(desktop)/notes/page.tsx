"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

export default function NotesPage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `notes-${Date.now()}`,
      key: `notes-${Date.now()}`,
      path: "/notes",
      title: "notes.app",
      icon: "📝",
      element: (
        <div className="flex h-full">
          {/* Notes List */}
          <div className="w-72 border-r border-black/10 bg-gray-50">
            <div className="border-b border-black/10 p-4">
              <button className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                + New Note
              </button>
            </div>
            <div className="divide-y divide-black/10">
              {[
                { title: "Web Development Notes", date: "Jan 25, 2026", preview: "React hooks and state management..." },
                { title: "UI Design Principles", date: "Jan 24, 2026", preview: "Color theory and typography..." },
                { title: "Meeting Notes", date: "Jan 23, 2026", preview: "Discussed project timeline..." },
                { title: "Reading List", date: "Jan 22, 2026", preview: "Books to read this semester..." },
              ].map((note, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 hover:bg-black/5 transition-colors ${
                    index === 0 ? "bg-white" : ""
                  }`}
                >
                  <div className="font-semibold text-black text-sm">{note.title}</div>
                  <div className="text-xs text-black/60 mt-1">{note.date}</div>
                  <div className="text-xs text-black/50 mt-1 line-clamp-2">{note.preview}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Note Editor */}
          <div className="flex-1 flex flex-col">
            <div className="border-b border-black/10 p-4 space-y-2">
              <input
                type="text"
                placeholder="Note title"
                defaultValue="Web Development Notes"
                className="w-full text-2xl font-bold text-black outline-none bg-transparent"
              />
              <div className="text-sm text-black/60">Last edited: January 25, 2026 at 2:30 PM</div>
            </div>
            <div className="flex-1 p-6">
              <textarea
                className="h-full w-full resize-none text-black outline-none bg-transparent font-mono text-sm leading-relaxed"
                defaultValue={`# React Hooks and State Management

## useState Hook
- Used for managing local component state
- Returns current state and updater function
- Example: const [count, setCount] = useState(0)

## useEffect Hook
- Used for side effects in components
- Runs after render
- Can specify dependencies array

## Custom Hooks
- Reusable stateful logic
- Must start with "use"
- Can use other hooks inside

## Best Practices
1. Keep state close to where it's used
2. Don't mutate state directly
3. Use multiple state variables instead of one complex object
4. Consider using reducers for complex state logic`}
              />
            </div>
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
