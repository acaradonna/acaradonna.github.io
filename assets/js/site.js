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
