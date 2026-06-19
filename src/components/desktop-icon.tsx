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
      className="group flex flex-col items-center gap-1 p-1 text-center cursor-pointer outline-none select-none"
      style={{
        minWidth: "112px",
        userSelect: "none",
      }}
    >
      <div className="text-4xl select-none pointer-events-none transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="max-w-[100px] break-words text-[13px] font-medium leading-snug text-primary select-none pointer-events-none">
        <span className="rounded-[2px] px-0.5 skin-classic:underline decoration-dotted decoration-light-9 underline-offset-[3px] group-hover:bg-accent">
          {label}
        </span>
      </span>
    </button>
  )
}
