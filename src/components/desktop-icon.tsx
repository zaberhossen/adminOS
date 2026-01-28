"use client"

interface DesktopIconProps {
  id: string
  label: string
  icon: string
  onClick: () => void
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-1 text-center cursor-pointer outline-none transition-colors hover:opacity-80 text-white"
      style={{
        minWidth: "112px",
        userSelect: "none",
      }}
    >
      <div className="text-4xl select-none pointer-events-none">{icon}</div>
      <span
        className="text-[11px] font-bold leading-tight select-none pointer-events-none max-w-[100px] break-words"
        style={{
          textShadow: "1px 1px 0 rgba(0,0,0,0.8), -1px -1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {label}
      </span>
    </button>
  )
}
