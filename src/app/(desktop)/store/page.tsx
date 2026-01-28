"use client"

import { useEffect } from "react"
import { useDesktop } from "@/hooks/use-desktop"

const products = [
  { id: 1, name: "StudyOS Pro", price: "$9.99/mo", emoji: "⭐", features: ["Unlimited storage", "Priority support"] },
  { id: 2, name: "Study Bundle", price: "$29.99", emoji: "📦", features: ["10 courses", "Certificates"] },
  { id: 3, name: "Premium Notes", price: "$4.99/mo", emoji: "📝", features: ["Advanced editing", "Cloud sync"] },
]

export default function StorePage() {
  const { addWindow } = useDesktop()

  useEffect(() => {
    addWindow({
      id: `store-${Date.now()}`,
      key: `store-${Date.now()}`,
      path: "/store",
      title: "Store",
      icon: "🛍️",
      element: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black">StudyOS Store</h1>
          
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-black/20 p-6 space-y-4 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl">{product.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold text-black">{product.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">{product.price}</p>
                </div>
                <ul className="space-y-1 text-sm text-black/70">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
    })
  }, [addWindow])

  return null
}
