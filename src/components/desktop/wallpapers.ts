import { Wallpaper } from "@/types/desktop"

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "retro-illust",
    name: "Retro Illustration",
    bgImage:
      "url('https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80')",
    bgSize: "cover",
    bgPosition: "center",
    bgRepeat: "no-repeat",
  },
  {
    id: "teal-grid",
    name: "Teal Grid",
    bgColor: "#008080",
    bgImage:
      "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
    bgSize: "48px 48px",
  },
  {
    id: "soft-beige",
    name: "Soft Beige",
    bgColor: "#b4a388",
    bgImage:
      "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.18) 0 18%, transparent 20%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 0 20%, transparent 22%)",
    bgSize: "180px 180px",
  },
  {
    id: "bliss",
    name: "2001 Bliss",
    bgImage:
      "url('https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg')",
    bgSize: "1180px 738px",
    bgRepeat: "repeat",
    bgPosition: "center",
  },
  {
    id: "startup-monopoly",
    name: "Startup Monopoly",
    bgColor: "#1a1a1a",
    bgImage:
      "url('https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png')",
  },
  {
    id: "purple-gradient",
    name: "Purple Dreams",
    bgColor: "#6b46c1",
    bgImage:
      "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
  },
  {
    id: "study-books",
    name: "Study Mode",
    bgColor: "#2c3e50",
    bgImage:
      "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80')",
    bgSize: "cover",
    bgPosition: "center",
  },
]
