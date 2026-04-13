/* =========================================
   portfolio · Victor Militino
   js/lang.js
   — depende de: data/i18n.js
   ========================================= */

const roles = {
  pt: ['Desenvolvedor Fullstack', 'Engenheiro de Automação', 'Residente Porto Digital', 'Solucionador de Problemas'],
  en: ['Fullstack Developer',     'Automation Engineer',    'Porto Digital Resident',  'Problem Solver'],
  es: ['Desarrollador Fullstack', 'Ingeniero de Automatización', 'Residente Porto Digital', 'Solucionador de Problemas'],
};

let curLang    = 'pt';
let ri = 0, ci = 0, deleting = false, typeTimer = null;

/* ── Typing effect ── */
function typeRole() {
  const words = roles[curLang];
  const word  = words[ri];
  const el    = document.getElementById('hrole');
  if (!el) return;

  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      typeTimer = setTimeout(typeRole, 1800);
      return;
    }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % words.length;
    }
  }
  typeTimer = setTimeout(typeRole, deleting ? 45 : 80);
}

/* ── Apply translations ── */
function applyLang(lang) {
  const t = i18n[lang];
  if (!t) return;

  // text content / innerHTML
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // send button original text
  const sendBtn = document.getElementById('sendbtn');
  if (sendBtn) {
    sendBtn.textContent    = t['contact.send'] || sendBtn.textContent;
    sendBtn.dataset.orig   = t['contact.send'];
    sendBtn.style.background = '';
  }
}

/* ── Public: change language ── */
function setLang(lang) {
  curLang = lang;

  // toggle active button
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  applyLang(lang);

  // restart typing
  ri = 0; ci = 0; deleting = false;
  if (typeTimer) clearTimeout(typeTimer);
  typeRole();
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  // wire lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  setLang('pt');
});
