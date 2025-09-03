# 01_Critique

Inputs
- SITE_URL: https://acaradonna.github.io
- CODEBASE: Jekyll + HTML/CSS/JS (no build)
- BRAND INTENT (inferred): confident, technical, imaginative, elegant; audience: engineers/recruiters/collaborators
- CONSTRAINTS: GitHub Pages, no heavy deps, a11y/perf first

## Composition & Hierarchy
- Hero lacks a clear focal field; background motion competes with content.
- Sidebar is strong but content container translucency reduces figure/ground separation.
- Grid rhythm on cards is good; hover effects slightly over-active for reading contexts.

## Color
- Prior version overused hues; recent duotone is an improvement but needs tighter contrast control across sections.
- Accents occasionally fight with background intensity.

## Type
- Inter is solid but heading doesn’t achieve a distinctive typographic moment.
- Vertical rhythm is acceptable; could benefit from stronger scale in hero.

## Motion
- Prior particle background was noisy; new duotone is calmer but needs clearer temporal phrasing and rest.
- Hover tilt/shine is tasteful but can be softened in reduced-motion.

## Texture & Iconography
- Grain was too strong; reduced now. Iconography minimal (OK).

## Depth
- Shadows/glow consistent. Transparency previously muddied layers; now more opaque (good).

## Issues (Severity)
- High: Background can still pull eye at times on long dwell.
- High: Contrast ramps not guaranteed WCAG across all states.
- Med: Motion tokens not centralized; durations vary.
- Med: Hero type doesn’t carry enough brand voice.
- Low: No consistent pattern library for decorative effects.

## Fix-first (Top 10)
1. Centralize motion and color tokens; enforce WCAG pairs.
2. Add reduced-motion variants to all custom effects (done for many; finalize).
3. Introduce signature background with strict intensity control (Chill/Playful/Trippy).
4. Implement Liquid Split divider for sectional hierarchy.
5. Add Feral Corner utility for a subtle, ownable quirk.
6. Introduce Sacred Field pattern at low opacity for depth (static on reduced motion).
7. Strengthen hero typographic moment; fluid scale.
8. Soften 3D tilt defaults; maintain clarity.
9. Create Storybook-style sandbox for effects.
10. Add a11y/contrast regression checks in QA.
