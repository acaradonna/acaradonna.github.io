// Entrance reveal animations via IntersectionObserver
(function() {
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
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
(function() {
  const strength = 18;
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

// Progressive enhancement: hydrate Featured with live GitHub data (if allowed by CORS)
(function() {
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
        a.className = 'card reveal in';
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
    .catch(() => {});
})();
