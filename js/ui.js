/* ui.js — Mobile nav, photo upload, logo upload, skill bars,
            typed text, scroll spy, counters, toast, CV download */

/* ---- Mobile nav ---- */
const menuBtn   = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const navClose  = document.getElementById('nav-close');

function openNav()  { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeNav() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }

if (menuBtn)   menuBtn.addEventListener('click', openNav);
if (navClose)  navClose.addEventListener('click', closeNav);
mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ---- Logo upload ---- */
const logoInput   = document.getElementById('logo-upload');
const logoPreview = document.getElementById('logo-preview');

if (logoInput && logoPreview) {
  logoPreview.addEventListener('click', () => logoInput.click());
  logoPreview.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') logoInput.click(); });
  logoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      logoPreview.innerHTML = `<img src="${ev.target.result}" alt="Site logo" width="44" height="44" loading="lazy">`;
    };
    reader.readAsDataURL(file);
  });
}

/* ---- Profile photo upload ---- */
const photoInput = document.getElementById('photo-upload');
const photoPrev  = document.getElementById('photo-preview');
const photoWrap  = document.getElementById('photo-wrap');

if (photoWrap)  photoWrap.addEventListener('click', () => photoInput && photoInput.click());
if (photoInput) {
  photoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file || !photoPrev) return;
    const reader = new FileReader();
    reader.onload = ev => {
      photoPrev.innerHTML = `<img src="${ev.target.result}" alt="Profile photo" width="340" height="340" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    };
    reader.readAsDataURL(file);
  });
}

/* ---- Typed subtitle ---- */
const typedEl = document.getElementById('typed-text');
const cursor  = document.getElementById('typed-cursor');
const roles   = ['CSE-AI Student','ML Enthusiast','Full-Stack Learner','Cybersecurity Explorer','Aspiring Developer'];
let rIdx = 0, cIdx = 0, typing = true;

function typeStep() {
  const phrase = roles[rIdx];
  if (typing) {
    if (cIdx < phrase.length) {
      typedEl && (typedEl.textContent = phrase.slice(0, ++cIdx));
      setTimeout(typeStep, 80);
    } else {
      typing = false;
      setTimeout(typeStep, 1800);
    }
  } else {
    if (cIdx > 0) {
      typedEl && (typedEl.textContent = phrase.slice(0, --cIdx));
      setTimeout(typeStep, 40);
    } else {
      rIdx = (rIdx + 1) % roles.length;
      typing = true;
      setTimeout(typeStep, 200);
    }
  }
}
if (typedEl) typeStep();

/* Blinking cursor */
if (cursor) {
  setInterval(() => cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0', 500);
}

/* ---- Scroll-spy active nav ---- */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const spyObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        const active = a.getAttribute('href') === `#${e.target.id}`;
        a.style.color = active ? 'var(--text)' : '';
        a.style.fontWeight = active ? '700' : '';
        const after = a.querySelector('::after');
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spyObs.observe(s));

/* ---- Skill bars on scroll ---- */
const bars = document.querySelectorAll('.skill-bar__fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = e.target.dataset.pct;
      e.target.style.width = target + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
bars.forEach(b => barObs.observe(b));

/* ---- Progress rings on scroll ---- */
const rings = document.querySelectorAll('.skill-ring circle.ring-fill');
const ringObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const circ = parseFloat(e.target.dataset.circ);
      const pct  = parseFloat(e.target.dataset.pct);
      e.target.style.strokeDashoffset = circ - (pct / 100) * circ;
      ringObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
rings.forEach(r => ringObs.observe(r));

/* ---- Animated counter ---- */
function animateCounter(el, target, duration = 1400) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + '+';
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target.querySelector('.stat-num');
      if (el && el.dataset.target) {
        animateCounter(el, parseInt(el.dataset.target));
        statObs.unobserve(e.target);
      }
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.hero__stat').forEach(s => statObs.observe(s));

/* ---- Toast ---- */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  if (type === 'error') el.style.background = '#a12c7b';
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
window.showToast = showToast;

/* ---- Editable contact fields → toast ---- */
document.querySelectorAll('[data-editable]').forEach(el => {
  el.addEventListener('blur', () => showToast(`${el.dataset.editable} saved ✓`));
});

/* ---- CV download stub ---- */
const dlBtn = document.getElementById('cv-download');
if (dlBtn) {
  dlBtn.addEventListener('click', () => {
    const blob = new Blob(['Replace this file with your actual CV PDF.'], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'Devanshu_Chheda_CV.txt'; a.click();
    showToast('CV download started!');
  });
}
