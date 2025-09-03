export const tokens = {
  color: {
    primary: {
      50: 'oklch(0.97 0.02 240)',
      100: 'oklch(0.92 0.03 240)',
      200: 'oklch(0.85 0.05 240)',
      300: 'oklch(0.78 0.07 240)',
      400: 'oklch(0.72 0.14 240)',
      500: 'oklch(0.62 0.15 240)',
      600: 'oklch(0.52 0.12 240)',
      700: 'oklch(0.42 0.10 240)',
      800: 'oklch(0.35 0.06 240)',
      900: 'oklch(0.28 0.05 240)'
    }
  },
  space: [4, 8, 12, 16, 24, 32, 48],
  motion: {
    fast: '120ms',
    base: '200ms',
    slow: '320ms',
    easing: 'cubic-bezier(.2,.7,.2,1)'
  },
  type: {
    h1: 'clamp(2.2rem, 2vw + 1rem, 3.2rem)',
    h2: 'clamp(1.5rem, 1vw + 1rem, 2rem)'
  }
};
