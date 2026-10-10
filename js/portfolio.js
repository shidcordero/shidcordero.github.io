(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
  window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
  document.getElementById('year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    const reveals = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => reveals.observe(element));
  }
  let scheduled = false;
  const progress = document.querySelector('.scroll-progress');
  const sections = [...document.querySelectorAll('main > section[id]')];
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    let active = 'home';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) active = section.id; });
    nav.querySelectorAll('a').forEach(link => { const current = link.getAttribute('href') === `#${active}`; link.classList.toggle('active', current); if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    scheduled = false;
  };
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  window.addEventListener('resize', updateScroll); updateScroll();
  if (window.matchMedia('(hover: hover)').matches) document.querySelectorAll('.spotlight').forEach(card => { card.addEventListener('pointermove', event => { if (reduced.matches) return; const rect = card.getBoundingClientRect(); card.style.setProperty('--mx', `${event.clientX - rect.left}px`); card.style.setProperty('--my', `${event.clientY - rect.top}px`); }); });
  const canvas = document.getElementById('constellation');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const hero = document.querySelector('.hero');
  let width = 0, height = 0, points = [], frame = null, visible = true;
  const resize = () => { const rect = hero.getBoundingClientRect(); width = rect.width; height = rect.height; const ratio = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); points = Array.from({ length: width < 600 ? 18 : 35 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1 })); };
  let last = 0;
  const draw = time => { frame = null; if (reduced.matches || !visible || document.hidden) return; if (time - last < 32) { frame = requestAnimationFrame(draw); return; } const delta = Math.min((time - last) / 33, 2); last = time; ctx.clearRect(0, 0, width, height); points.forEach((point, index) => { point.x += point.vx * delta; point.y += point.vy * delta; if (point.x < 0 || point.x > width) point.vx *= -1; if (point.y < 0 || point.y > height) point.vy *= -1; ctx.fillStyle = '#87c6b4'; ctx.beginPath(); ctx.arc(point.x, point.y, 1.1, 0, Math.PI * 2); ctx.fill(); for (let j = index + 1; j < points.length; j++) { const other = points[j]; const distance = Math.hypot(point.x - other.x, point.y - other.y); if (distance < 130) { ctx.strokeStyle = `rgba(135,198,180,${(1 - distance / 130) * 0.17})`; ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(other.x, other.y); ctx.stroke(); } } }); frame = requestAnimationFrame(draw); };
  const start = () => { if (frame === null && !reduced.matches && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(draw); } };
  const stop = () => { if (frame !== null) cancelAnimationFrame(frame); frame = null; };
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else start(); });
  window.addEventListener('resize', resize); resize(); start();
})();
