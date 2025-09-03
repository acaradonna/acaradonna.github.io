// Generative Art Canvas: color-mixing particles with flow field and bloom
// Inspired by color theory and additive blending – creates painterly light trails.
(() => {
  const canvas = document.getElementById('art-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0, height = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
  let running = true;

  const resize = () => {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  // Flow field using curl noise approximation
  const seed = Math.random() * 1000;
  function noise(x, y) {
    // Simple pseudo-random hash – fast and looks organic enough for art
    return Math.sin(12.9898 * x + 78.233 * y + seed) * 43758.5453 % 1;
  }
  function flow(x, y, t) {
    const n = noise(x * 0.003 + t * 0.0002, y * 0.003 - t * 0.0001);
    const angle = n * Math.PI * 2;
    return { x: Math.cos(angle), y: Math.sin(angle) };
  }

  // Particles with additive compositing
  const PALETTE = [
    [122, 162, 247], // blue
    [158, 206, 106], // green
    [255, 158, 100], // orange
    [255, 95, 109],  // coral
    [142, 84, 233],  // purple
  ];
  const particles = [];
  const NUM = Math.min(380, Math.floor(width * height / 9000));
  for (let i = 0; i < NUM; i++) {
    const c = PALETTE[i % PALETTE.length];
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0, vy: 0,
      color: `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.06)`,
      size: 1 + Math.random() * 1.5,
      life: Math.random() * 1000,
    });
  }

  let lastTime = performance.now();
  function tick(now) {
    if (!running) return;
    const dt = Math.min(33, now - lastTime);
    lastTime = now;

    // Faint motion blur to create bloom-like trails
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(10,14,30,0.07)';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';

    const t = now;
    for (const p of particles) {
      const f = flow(p.x, p.y, t);
      p.vx += f.x * 0.4; p.vy += f.y * 0.4;
      p.vx *= 0.94; p.vy *= 0.94; // damping
      p.x += p.vx; p.y += p.vy;
      p.life += dt;

      // Wrap edges for continuity
      if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;

      // Draw with subtle radial gradient per particle
      const r = p.size * (1 + Math.sin(p.life * 0.01) * 0.5);
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 30 * r);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 20 * r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Toggle Art mode
  const toggle = document.getElementById('toggle-art');
  if (toggle) {
    toggle.addEventListener('click', () => {
      running = !running;
      toggle.querySelector('span').textContent = running ? 'On' : 'Off';
      if (running) {
        lastTime = performance.now();
        requestAnimationFrame(tick);
      }
    });
  }
})();
