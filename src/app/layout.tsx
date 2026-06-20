import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "adminOS — Next.js Admin Template",
  description:
    "An open-source, OS-style admin dashboard template for Next.js. Draggable windows, light/dark themes, wallpapers, lock screen and a shadcn UI kit. Built with Next.js, Zustand, Framer Motion and Tailwind.",
}

// Runs before first paint so the persisted theme is applied with no flash.
const themeScript = `
(function () {
  try {
    var raw = localStorage.getItem("adminos-desktop-storage");
    var theme = "system";
    if (raw) { theme = (JSON.parse(raw).state || {}).siteSettings?.theme || "system"; }
    var dark = theme === "dark" || (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
    var b = document.body;
    b.classList.add(dark ? "dark" : "light");
    b.setAttribute("data-skin", "classic");
    b.setAttribute("data-scheme", "primary");
  } catch (e) {
    document.body.classList.add("light");
  }
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased overflow-hidden" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  )
}
