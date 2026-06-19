import { Wallpaper } from "@/types/desktop"

/* Wallpapers tuned to PostHog's warm "OS" palette — light, low-contrast
   surfaces so the cream window chrome reads cleanly on top. */
export const WALLPAPERS: Wallpaper[] = [
  {
    id: "keyboard-garden",
    name: "Keyboard Garden",
    bgColor: "#E1D7C2",
    bgImage:
      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(106,168,79,0.18) 0%, transparent 50%)",
  },
  {
    id: "soft-cream",
    name: "Soft Cream",
    bgColor: "#EEEFE9",
    bgImage:
      "linear-gradient(90deg, rgba(35,37,29,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(35,37,29,0.04) 1px, transparent 1px)",
    bgSize: "44px 44px",
  },
  {
    id: "startup-monopoly",
    name: "Startup Monopoly",
    bgColor: "#FEFCED",
    bgImage:
      "url('https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png')",
    bgSize: "cover",
    bgPosition: "center",
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
    id: "warm-dawn",
    name: "Warm Dawn",
    bgColor: "#FFF1D5",
    bgImage:
      "linear-gradient(160deg, #FFF1D5 0%, #E5E7E0 55%, #DAE0EB 100%)",
  },
  {
    id: "coding-at-night",
    name: "Coding at Night",
    bgColor: "#54618E",
    bgImage:
      "radial-gradient(circle at 75% 20%, rgba(255,255,255,0.12) 0%, transparent 45%)",
  },
]
