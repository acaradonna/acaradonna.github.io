# 03_Spec — Selected Direction: Chromatic Thread (Calm)

Why: It preserves the clean professional baseline while allowing a single expressive accent that scales.

## Style Tokens
- Color (OKLCH):
  - --bg: oklch(0.17 0.03 260)
  - --bg-elev: oklch(0.20 0.04 260)
  - --text: oklch(0.93 0.02 260)
  - --primary: oklch(0.72 0.14 240)
  - --accent: oklch(0.72 0.13 140)
- Type:
  - h1: clamp(2rem, 2vw + 1rem, 3.25rem)
  - body: 16px/1.55
- Motion:
  - --dur-fast: 120ms; --dur: 200ms; --ease: cubic-bezier(.2,.7,.2,1)
- Shape:
  - radius-card: 14px; underline-thickness: 2px

## Components
- Hero: solid background, larger h1. Optional underline flourish under h2/section titles.
- Buttons: `.button.primary` gets a linear gradient from --primary to --accent.
- Cards: focus-visible outline; restrained shadow on hover only.
- Links/headings: `.link-underline` motif per concept.

## Reduced Motion
- All transitions become instant, no keyframe animations.

## Prototype
See prototype demo page and snippet in 02_OpenConcepts.md.
