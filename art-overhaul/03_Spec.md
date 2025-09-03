# 03_Spec

Decision: Hybrid — LIQUID SPLIT (as sectional divider) + SACRED FIELD (low-intensity background); FERAL CORNER as optional signature on select blocks.

## Tokens
- Color (OKLCH primary ramp): see tokens.ts
- Space: 4 8 12 16 24 32 48
- Type scale: clamp(2.2rem, 2vw + 1rem, 3.2rem) for h1; h2 clamp(1.5rem, 1vw + 1rem, 2rem)
- Motion: --dur-fast 120ms; --dur 200ms; --dur-slow 320ms; easing: cubic-bezier(.2,.7,.2,1)

## Components
- LiquidSplit: pseudo-element divider with SVG filter; reduced-motion removes filter.
- SacredField: pattern layer with intensity: .chill .playful .trippy (opacity/scale deltas).
- FeralCorner: utility class with CSS mask vars.
- Cards/Buttons: maintain 3D tilt but lower angle; high-contrast body copy.

## Accessibility
- All text on splits sits on solid surfaces; contrast ≥ 4.5:1 body, 3:1 large.
- Reduced-motion removes all animation and leaves meaningful static visuals.

## Pattern Library Outline
- tokens.ts
- utilities/_liquid-split.css
- utilities/_feral-corner.css
- utilities/_sacred-field.css
- demo prototypes under /art-overhaul/prototypes
