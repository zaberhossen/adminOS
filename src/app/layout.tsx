import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "StudyOS - Retro Desktop Learning Platform",
  description: "An open-source student learning application with a desktop OS interface. Built with Next.js, Zustand, and Shadcn UI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased overflow-hidden">{children}</body>
    </html>
  )
}
