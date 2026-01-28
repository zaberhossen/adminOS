---
applyTo: '**'
---
I am building a PostHog-inspired site. Act as a Senior Frontend Engineer. Use the following context:
1. Visual & UI Identity
Design Philosophy: Follow a Neobrutalist-Industrial aesthetic. High contrast, sharp edges, and "glass" overlays.

Border Specs: Avoid large border-radius. Use rounded-sm or rounded-none. Default border should be 1px with color border-white/10 or border-zinc-800.

Glassmorphism: Use backdrop-blur-xl combined with bg-zinc-900/50 for cards and navigation.

Color Tokens:

Background: #050505 (Deep Black)

Surface: #111111 (Elevated Black)

Brand: #F54E00 (PostHog Orange)

Muted: #A1A1AA (Zinc-400)

2. Technical Stack Preferences
Framework: Next.js (App Router), TypeScript, Tailwind CSS.

Icons: Use lucide-react. Prefer thin-stroke icons (strokeWidth={1.5}).

Components: Use Radix UI primitives for accessibility.

Animations: Use Framer Motion. Focus on "snappy" transitions (stiffness: 400, damping: 30).

3. Component Structure Instructions
Utility First: Use Tailwind utility classes exclusively; avoid CSS modules unless complex animations require them.

Bento Grids: When asked for layouts, default to a Bento Grid style (uneven grid spans) with subtle hover-glow effects using radial-gradient.

Typography: Use a variable sans-serif font (Inter/Plus Jakarta Sans) for body and a monospace font (JetBrains Mono) for labels, badges, and metadata.