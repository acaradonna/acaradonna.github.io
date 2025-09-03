// Entrance reveal animations via IntersectionObserver
(function () {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  // If cards were dynamically created with reveal class before observer, mark them in.
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('in')) {
        el.classList.add('in');
      }
    });
  }, 0);
})();

// Smooth scroll for internal anchors
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// Magnetic hover effect for cards
(function () {
  const strength = 14; // soften tilt for readability
  const root = document.documentElement;
  const set = (card, tx, ty) => {
    card.style.setProperty('--tx', `${tx}px`);
    card.style.setProperty('--ty', `${ty}px`);
  };
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      const dx = (e.clientX - midX) / rect.width;
      const dy = (e.clientY - midY) / rect.height;
      const tx = strength * dx;
      const ty = strength * dy;
      set(card, tx, ty);
      // 3D tilt and moving shine
      const rx = (-dy * 8).toFixed(2);
      const ry = (dx * 10).toFixed(2);
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
      const mx = ((dx + 0.5) * 100).toFixed(2) + '%';
      card.style.setProperty('--mx', mx);
    });
  });
  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.card').forEach(card => {
      set(card, 0, 0);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '50%');
    });
  }, true);
})();

// UX toggles: Focus mode and High contrast (persisted)
(function () {
  const body = document.body;
  const focusBtn = document.getElementById('toggle-focus');
  const contrastBtn = document.getElementById('toggle-contrast');
  const artBtn = document.getElementById('toggle-art');
  const fieldBtn = document.getElementById('toggle-field');
  const sync = () => {
    try {
      localStorage.setItem('ux-prefs', JSON.stringify({
        focus: body.classList.contains('focus-mode'),
        contrast: body.classList.contains('high-contrast'),
        field: body.classList.contains('trippy') ? 'trippy' : body.classList.contains('playful') ? 'playful' : 'chill',
        art: (() => {
          const span = artBtn && artBtn.querySelector('span');
          return span ? /On/.test(span.textContent || '') : true;
        })()
      }));
    } catch { }
  };
  try {
    const saved = localStorage.getItem('ux-prefs');
    if (saved) {
      const prefs = JSON.parse(saved);
      if (prefs.focus) body.classList.add('focus-mode');
      if (prefs.contrast) body.classList.add('high-contrast');
      if (prefs.field) {
        body.classList.remove('chill', 'playful', 'trippy');
        body.classList.add(prefs.field);
        if (fieldBtn) fieldBtn.querySelector('span').textContent = prefs.field.charAt(0).toUpperCase() + prefs.field.slice(1);
      }
      if (artBtn && Object.prototype.hasOwnProperty.call(prefs, 'art')) {
        const span = artBtn.querySelector('span');
        if (span) span.textContent = prefs.art ? 'On' : 'Off';
        const canvas = document.getElementById('art-canvas');
        if (canvas) canvas.style.opacity = prefs.art ? '' : '0';
      }
    } else {
      // Default art OFF for clarity unless user opts in
      if (artBtn) {
        const span = artBtn.querySelector('span');
        if (span) span.textContent = 'Off';
      }
      const canvas = document.getElementById('art-canvas');
      if (canvas) canvas.style.opacity = '0';
    }
  } catch { }

  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      const on = body.classList.toggle('focus-mode');
      focusBtn.setAttribute('aria-pressed', String(on));
      focusBtn.querySelector('span').textContent = on ? 'On' : 'Off';
      // Pause art when in focus mode by invoking art toggle if needed
      if (on && artBtn && /On/.test(artBtn.textContent)) artBtn.click();
      sync();
    });
  }
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      const on = body.classList.toggle('high-contrast');
      contrastBtn.setAttribute('aria-pressed', String(on));
      contrastBtn.querySelector('span').textContent = on ? 'On' : 'Off';
      sync();
    });
  }

  if (fieldBtn) {
    const cycle = () => {
      const order = ['chill', 'playful', 'trippy'];
      const current = order.find(k => body.classList.contains(k)) || 'chill';
      const next = order[(order.indexOf(current) + 1) % order.length];
      body.classList.remove('chill', 'playful', 'trippy');
      body.classList.add(next);
      fieldBtn.querySelector('span').textContent = next.charAt(0).toUpperCase() + next.slice(1);
      sync();
    };
    fieldBtn.addEventListener('click', cycle);
  }

  if (artBtn) {
    artBtn.addEventListener('click', () => {
      const span = artBtn.querySelector('span');
      if (!span) return;
      const next = /On/.test(span.textContent || '') ? 'Off' : 'On';
      span.textContent = next;
      const canvas = document.getElementById('art-canvas');
      if (canvas) canvas.style.opacity = next === 'On' ? '' : '0';
      sync();
    });
  }
})();

// Progressive enhancement: hydrate Featured with live GitHub data (if allowed by CORS)
(function () {
  const container = document.getElementById('featured');
  if (!container) return;
  const username = 'acaradonna';
  // Public GitHub API with unauthenticated rate limits (60/hr). This is best-effort.
  fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(list => list.slice(0, 12))
    .then(repos => {
      // Only replace if data looks valid
      if (!Array.isArray(repos) || repos.length === 0) return;
      container.innerHTML = '';
      for (const repo of repos) {
        const a = document.createElement('a');
        a.className = 'card feral reveal in';
        a.href = repo.html_url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `
          <div class="repo-name">${repo.name}</div>
          <div class="repo-desc">${repo.description ?? 'Repository'}</div>
          <div class="badges">
            ${repo.language ? `<span class="badge">${repo.language}</span>` : ''}
            <span class="badge muted">★ ${repo.stargazers_count}</span>
          </div>`;
        container.appendChild(a);
      }
    })
    .catch(() => { });
})();
