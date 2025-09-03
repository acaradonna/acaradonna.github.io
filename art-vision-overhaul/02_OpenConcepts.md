# 02_OpenConcepts

## Concept A — Chromatic Thread
Premise: A single luminous thread runs through the interface—appearing as underlines, subtle borders, and a quiet gradient in CTAs.
- Color & texture: deep navy ground; chroma thread in oklch(0.72 0.14 240) → oklch(0.72 0.13 140).
- Shape & movement: straight lines that expand 1–2px on hover; no ambient motion.
- Type & UI: crisp Inter; headings a touch larger; rhythm steady.
- Emotion: focused, deliberate; a tiny surprise on interaction.
- Reduced motion: underline expands without animation (instant state).
- Snippet:
```css
.link-underline{position:relative}
.link-underline::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:linear-gradient(90deg, var(--primary), var(--accent));transform:scaleX(.6);transform-origin:left;transition:transform 200ms var(--ease)}
.link-underline:hover::after{transform:scaleX(1)}
@media (prefers-reduced-motion:reduce){.link-underline::after{transition:none}}
```

## Concept B — Monochrome Calm
Premise: Mostly monochrome; one chromatic pulse appears only in primary CTAs.
- Color & texture: navy/white/gray; accent gradient only in `.button.primary`.
- Shape & movement: zero ambient motion; small opacity/translate enters.
- Type & UI: editorial spacing; large hero, compact card body.
- Emotion: calm authority.
- Reduced motion: no animation; only state changes.
- Snippet:
```css
.button.primary{background:linear-gradient(90deg, var(--primary), var(--accent));color:#061026}
```

## Concept C — Quiet Grid
Premise: A faint grid (2–3% alpha) aligns content; not decorative, but structural.
- Color & texture: same navy base; grid only in large screens.
- Shape & movement: no motion; grid fades at small breakpoints.
- Type & UI: consistent baselines; generous whitespace.
- Emotion: orderly, confident.
- Reduced motion: n/a.
- Snippet:
```css
@media (min-width: 1200px){
  body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.02;background:linear-gradient(#fff 1px,transparent 1px) 0 0/1px 24px,linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/24px 1px}
}
```
