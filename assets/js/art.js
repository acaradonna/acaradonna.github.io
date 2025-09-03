// Duotone WebGL background with upward "bubbling" field
// Artistic goals: minimal palette, fluid motion, elegant negative space.
(() => {
  const canvas = document.getElementById('art-canvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, preserveDrawingBuffer: false });
  if (!gl) { console.warn('WebGL unavailable, falling back to previous art.'); return; }

  let width = 0, height = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
  const resize = () => {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener('resize', resize);

  // Shaders
  const vert = `
  attribute vec2 a;
  void main(){ gl_Position = vec4(a, 0.0, 1.0); }
  `;

  // Fragment shader: domain-warped SDF metaballs rising upward, duotone mix
  const frag = `
  precision highp float;
  uniform vec2 u_res; // in pixels
  uniform float u_time;
  uniform vec3 u_c1; // color 1
  uniform vec3 u_c2; // color 2
  uniform float u_noiseScale;
  uniform float u_speed;

  // Value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }

  // Smooth min
  float smin(float a, float b, float k){
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy) / u_res; // 0..1
    vec2 p = uv * 2.0 - 1.0; p.x *= u_res.x/u_res.y;

    // Domain warping for fluid feel
    float t = u_time * u_speed;
    vec2 q = uv * u_noiseScale;
    float n1 = noise(q + vec2(0.0, t));
    float n2 = noise(q * 1.7 + vec2(5.2, -t*0.6));
    vec2 warp = vec2(n1, n2) * 0.35;

    // Metaballs rising upward
    float field = 1.0;
    for(int i=0;i<5;i++){
      float fi = float(i);
      vec2 c = vec2(0.2 + 0.15*fi, mod(uv.y + t*0.1 + 0.17*fi, 1.2) - 0.1);
      c += warp * (0.2 + 0.1*fi);
      float r = 0.22 - 0.03*fi;
      float d = length((uv + warp) - c) - r;
      field = smin(field, d, 0.18);
    }

    // Smooth duotone: inside vs outside
    float edge = smoothstep(-0.02, 0.02, field);
    vec3 col = mix(u_c1, u_c2, edge);

    // Subtle vignette
    float vig = smoothstep(1.2, 0.2, length(p));
    col *= mix(0.92, 1.0, vig);

    gl_FragColor = vec4(col, 0.9);
  }
  `;

  function compile(type, src){
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); }
    return s;
  }
  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); }
  gl.useProgram(prog);

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const locA = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(locA);
  gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);

  const u_res = gl.getUniformLocation(prog, 'u_res');
  const u_time = gl.getUniformLocation(prog, 'u_time');
  const u_c1 = gl.getUniformLocation(prog, 'u_c1');
  const u_c2 = gl.getUniformLocation(prog, 'u_c2');
  const u_noiseScale = gl.getUniformLocation(prog, 'u_noiseScale');
  const u_speed = gl.getUniformLocation(prog, 'u_speed');

  // Duotone palette: deep navy + electric blue (adjustable)
  let color1 = [0.06, 0.10, 0.26];
  let color2 = [0.33, 0.53, 0.97];

  // Persist choice in localStorage
  try {
    const saved = localStorage.getItem('duotone');
    if (saved) {
      const { c1, c2 } = JSON.parse(saved);
      if (Array.isArray(c1) && Array.isArray(c2)) { color1 = c1; color2 = c2; }
    }
  } catch {}

  function render(time){
    gl.uniform2f(u_res, canvas.width, canvas.height);
    gl.uniform1f(u_time, time * 0.001);
    gl.uniform3f(u_c1, color1[0], color1[1], color1[2]);
    gl.uniform3f(u_c2, color2[0], color2[1], color2[2]);
    gl.uniform1f(u_noiseScale, 2.2);
    gl.uniform1f(u_speed, 0.8);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!paused) requestAnimationFrame(render);
  }

  let paused = false;
  const artBtn = document.getElementById('toggle-art');
  const focusBtn = document.getElementById('toggle-focus');
  function setPaused(p){ paused = p; }
  if (artBtn) {
    artBtn.addEventListener('click', () => {
      setPaused(/On/.test(artBtn.textContent) ? false : true);
      if (!paused) requestAnimationFrame(render);
    });
  }
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      if (/On/.test(focusBtn.textContent)) { setPaused(true); }
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !paused) requestAnimationFrame(render);
  });

  requestAnimationFrame(render);
})();
