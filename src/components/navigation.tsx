"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Blog", href: "/blog" },
  { name: "Library", href: "/library" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">StudyOS</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50",
                pathname === item.href
                  ? "text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-50"
          >
            Get Started <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-6 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  pathname === item.href
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
