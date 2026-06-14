document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const statValues = document.querySelectorAll('.stat-card .value');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = `${target}${suffix}`;
      }

      requestAnimationFrame(frame);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  statValues.forEach((el) => observer.observe(el));

  const quote = document.getElementById('quote-text');
  const quotes = [
    'الروح الجماعية هي أسرع طريق للفوز.',
    'كل تدريب جديد يفتح بابًا جديدًا للتقدم.',
    'نادينا يصنع الانتصارات بخطوة واحدة في كل مرة.'
  ];

  if (quote) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % quotes.length;
      quote.textContent = quotes[index];
    }, 3500);
  }

  const discoverBtn = document.getElementById('discoverBtn');
  const discoverMenu = document.getElementById('discoverMenu');

  if (discoverBtn && discoverMenu) {
    discoverBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !discoverMenu.classList.contains('open');
      discoverMenu.classList.toggle('open', willOpen);
      discoverBtn.setAttribute('aria-expanded', String(willOpen));
    });

    document.addEventListener('click', () => {
      discoverMenu.classList.remove('open');
      discoverBtn.setAttribute('aria-expanded', 'false');
    });
  }
});
