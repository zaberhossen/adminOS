"use client"

import { useState } from "react"
import { Folder, FileText, FileCode, FileImage, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Node = {
  name: string
  kind: "folder" | "doc" | "code" | "image"
  size?: string
  modified: string
}

const TREE: Record<string, Node[]> = {
  "~": [
    { name: "Projects", kind: "folder", modified: "Today" },
    { name: "Documents", kind: "folder", modified: "Yesterday" },
    { name: "README.md", kind: "doc", size: "4 KB", modified: "Today" },
    { name: "avatar.png", kind: "image", size: "82 KB", modified: "Mar 2" },
  ],
  "~/Projects": [
    { name: "adminos", kind: "folder", modified: "Today" },
    { name: "landing-page", kind: "folder", modified: "Mar 1" },
    { name: "notes.txt", kind: "doc", size: "1 KB", modified: "Feb 24" },
  ],
  "~/Documents": [
    { name: "invoice-2024.pdf", kind: "doc", size: "120 KB", modified: "Mar 5" },
    { name: "config.json", kind: "code", size: "2 KB", modified: "Mar 4" },
  ],
}

const ICONS = {
  folder: Folder,
  doc: FileText,
  code: FileCode,
  image: FileImage,
}

export function FilesApp() {
  const [path, setPath] = useState("~")
  const nodes = TREE[path] ?? []
  const segments = path.split("/")

  const open = (node: Node) => {
    if (node.kind === "folder") {
      const next = path === "~" ? `~/${node.name}` : `${path}/${node.name}`
      if (TREE[next]) setPath(next)
    }
  }

  return (
    <div className="flex h-full flex-col text-primary">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 border-b border-primary px-4 py-2 text-sm">
        {segments.map((seg, i) => {
          const target = segments.slice(0, i + 1).join("/")
          return (
            <span key={target} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 text-muted" />}
              <button
                onClick={() => setPath(target)}
                className="rounded px-1.5 py-0.5 font-medium hover:bg-accent"
              >
                {seg}
              </button>
            </span>
          )
        })}
      </div>

      {/* Listing */}
      <div className="flex-1 overflow-auto p-2">
        <div className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
          <span>Name</span>
          <span className="w-20 text-right">Size</span>
          <span className="w-24 text-right">Modified</span>
        </div>
        {nodes.map((node) => {
          const Icon = ICONS[node.kind]
          return (
            <button
              key={node.name}
              onDoubleClick={() => open(node)}
              onClick={() => open(node)}
              className={cn(
                "grid w-full grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                node.kind === "folder" && "cursor-pointer"
              )}
            >
              <span className="flex items-center gap-2.5 truncate">
                <Icon className={cn("size-4 shrink-0", node.kind === "folder" ? "text-blue" : "text-muted")} />
                <span className="truncate font-medium">{node.name}</span>
              </span>
              <span className="w-20 text-right text-xs text-muted">{node.size ?? "—"}</span>
              <span className="w-24 text-right text-xs text-muted">{node.modified}</span>
            </button>
          )
        })}
      </div>

      <div className="border-t border-primary px-4 py-1.5 text-xs text-muted">
        {nodes.length} items
      </div>
    </div>
  )
}
