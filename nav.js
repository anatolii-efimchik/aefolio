(function () {
  const sectionIds = ['cases', 'experience', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  const navLinks = document.querySelectorAll('nav a[href]');

  function setActive(id) {
    navLinks.forEach(link => {
      const tail = (link.getAttribute('href') || '').split('#').pop();
      link.toggleAttribute('aria-current', tail === id);
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
})();
