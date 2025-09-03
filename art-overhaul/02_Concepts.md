# 02_Concepts

## A) LIQUID SPLIT — Duotone Upward Drip
- Thesis: Minimal, editorial page split with a living, upward boundary that subtly mixes.
- References: Turrell color fields, Issey Miyake fabric motion, Stripe gradients.
- Palette (OKLCH):
  - c1: oklch(0.35 0.06 260) navy
  - c2: oklch(0.72 0.14 240) electric blue
- Type: Inter variable; hero uses larger weight axis; fluid scale via clamp.
- Motion: feTurbulence + feDisplacementMap animate scale/seed slowly upward.
- Texture: Very low grain overlay.
- Icon style: Line-simple, no fill.
- Key frames: hero split at 40vh; sections sit on clear ground.
- A11y: static split when reduced-motion; ensure text never crosses low-contrast edge.
- Squint Narrative: Eye hits hero headline; boundary adds intrigue; cards read cleanly.
- Prototype:
```html
<svg width="0" height="0">
  <filter id="liquidSplit" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence baseFrequency="0.004" numOctaves="2" seed="3" result="turb" />
    <feDisplacementMap in2="turb" in="SourceGraphic" scale="20" />
  </filter>
</svg>
<style>
.split{position:relative;}
.split::before{content:"";position:absolute;inset:auto 0 0 0;height:40vh;background:linear-gradient(180deg,var(--c1),var(--c2));filter:url(#liquidSplit)}
@media (prefers-reduced-motion:reduce){.split::before{filter:none}}
</style>
```

## B) FERAL CORNER — Morphing Signature
- Thesis: Clean cards/containers with a single rebellious corner that morphs.
- References: Bauhaus cut corners, Elias Stein.
- Palette: neutrals + single accent.
- Type: Inter variable; slight tracking for headings.
- Motion: mask-image with conic/radial gradients; micro wobble on hover.
- Texture: None.
- Icon style: Geometric, consistent stroke.
- Frames: apply class `.feral` to container.
- A11y: freezes under reduced motion.
- Prototype:
```css
.feral{--corner:18px;--wob:6px;mask:
 radial-gradient(120% 120% at 100% 0,transparent 0 calc(var(--corner)+var(--wob)),#000 calc(var(--corner)+var(--wob)+2px))}
.feral:hover{--wob:10px}
@media (prefers-reduced-motion:reduce){.feral:hover{--wob:0}}
```

## C) SACRED FIELD — Meditative Geometry
- Thesis: Soft Flower-of-Life tiling beneath content, barely breathing.
- References: Sacred geometry tilings, Albers.
- Palette: duotone substrate; accent pops.
- Type: Inter variable with optical sizing.
- Motion: extremely slow rotate/phase; static when reduced.
- Texture: SVG pattern at 4–8% opacity with mix-blend.
- Icon style: minimal.
- Frames: background layer with intensity classes.
- A11y: ensure low alpha and pause when reduced.
- Prototype:
```html
<svg width="0" height="0">
  <defs>
    <pattern id="flower" width="60" height="52" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="26" r="25" fill="none" stroke="currentColor" opacity="0.08"/>
    </pattern>
  </defs>
</svg>
<style>
.sacred{background:radial-gradient(100% 100% at 50% 0,transparent,rgba(255,255,255,0.02)),
        var(--field-color);}
.sacred::before{content:"";position:fixed;inset:0;background:var(--field-pattern) center/60px 52px;opacity:.06;mix-blend-mode:soft-light;}
@media (prefers-reduced-motion:reduce){.sacred::before{opacity:.04}}
</style>
```
