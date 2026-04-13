/* =========================================
   portfolio · Victor Militino
   js/main.js
   ========================================= */

/* ── Cursor ── */
(function initCursor() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animate() {
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, .tag, .stat, .proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform  = 'translate(-50%,-50%) scale(2)';
      ring.style.width     = '56px';
      ring.style.height    = '56px';
      ring.style.opacity   = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.width     = '36px';
      ring.style.height    = '36px';
      ring.style.opacity   = '0.5';
    });
  });
})();

/* ── Scroll animations (IntersectionObserver) ── */
(function initScrollAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .tl-item').forEach((el, i) => {
    if (el.classList.contains('tl-item')) {
      el.style.transitionDelay = (i * 0.12) + 's';
    }
    obs.observe(el);
  });
})();

/* ── Nav: darken on scroll ── */
(function initNav() {
  const nav = document.querySelector('.pnav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(10,10,15,0.97)'
      : 'rgba(10,10,15,0.92)';
  });
})();

/* ── Hero parallax orbs on mouse ── */
(function initParallax() {
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  if (!orb1 || !orb2) return;
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 28;
    const y = (e.clientY / window.innerHeight - 0.5) * 28;
    orb1.style.transform = `translate(${x}px, ${y}px)`;
    orb2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
  });
})();

/* ── Project filter ── */
function filterProj(cat, btn) {
  document.querySelectorAll('.flt').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.proj-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? 'flex' : 'none';
  });
}

/* ── Contact form feedback ── */
(function initForm() {
  const btn = document.getElementById('sendbtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const sent = (typeof i18n !== 'undefined' && i18n[curLang])
      ? i18n[curLang]['contact.sent']
      : 'Enviado! ✓';
    const orig = btn.dataset.orig || btn.textContent;
    btn.dataset.orig = orig;
    btn.textContent   = sent;
    btn.style.background = '#2dd4bf';
    setTimeout(() => {
      btn.textContent      = orig;
      btn.style.background = '';
    }, 3000);
  });
})();
