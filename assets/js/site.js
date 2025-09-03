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
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      const dx = (e.clientX - midX) / rect.width;
      const dy = (e.clientY - midY) / rect.height;
      const tx = strength * dx;
      const ty = strength * dy;
      card.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });
  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.card').forEach(card => {
      card.style.transform = '';
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
        a.className = 'card reveal';
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
