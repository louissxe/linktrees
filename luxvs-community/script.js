/* ============================================
   LUXV'S HUB — script.js
   ============================================ */

'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/* ─── Loading ───────────────────────────────── */

(function () {
  const el = $('#loading');
  if (!el) return;
  const hide = () => {
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1)';
    el.style.opacity = '0';
    setTimeout(() => { el.style.visibility = 'hidden'; el.style.pointerEvents = 'none'; }, 700);
  };
  document.readyState === 'complete' ? setTimeout(hide, 280) : window.addEventListener('load', () => setTimeout(hide, 280));
})();

/* ─── Hero entrance ─────────────────────────── */

(function () {
  const items = [
    $('.hero-eyebrow'),
    $('.hero-copy h1'),
    $('.hero-sub'),
    $('.hero-actions'),
    $('.hero-stats'),
    $('.hero-visual'),
  ].filter(Boolean);

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
  });

  const base = 480;
  items.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, base + i * 95);
  });
})();

/* ─── Header scroll ─────────────────────────── */

(function () {
  const h = $('#header');
  if (!h) return;
  let t = false;
  window.addEventListener('scroll', () => {
    if (t) return;
    requestAnimationFrame(() => {
      h.classList.toggle('scrolled', window.scrollY > 36);
      t = false;
    });
    t = true;
  }, { passive: true });
})();

/* ─── Active nav ────────────────────────────── */

(function () {
  const links = $$('.nav-link');
  const secs = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if (!secs.length) return;

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe ? secs.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(s)
  ) : null;
})();

/* ─── Mobile menu ───────────────────────────── */

(function () {
  const toggle = $('#menuToggle');
  const nav    = $('#navLinks');
  if (!toggle || !nav) return;

  let open = false;

  const set = (s) => {
    open = s;
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };

  toggle.addEventListener('click', () => set(!open));
  $$('a', nav).forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('click', e => {
    if (open && !$('#header').contains(e.target)) set(false);
  });
})();

/* ─── Smooth scroll ─────────────────────────── */

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  });
});

/* ─── Scroll reveal ─────────────────────────── */

(function () {
  const targets = $$(
    '.pricing-card, .sc-card, .extra-pill, .team-member, ' +
    '.contact-card, .hto-steps li, .tcard, .about-left p, ' +
    '.about-badges span, .section-label, .hero-stats .stat'
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement
        ? $$(':scope > *', entry.target.parentElement).filter(el => targets.includes(el))
        : [];
      const idx = siblings.indexOf(entry.target);
      const delay = clamp(idx * 60, 0, 350);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
      }, delay);
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -48px 0px', threshold: 0.06 });

  targets.forEach(el => obs.observe(el));
})();

/* ─── Testimonial slider ────────────────────── */

(function () {
  const track   = $('.testimonial-track');
  const slides  = $$('.testimonial-slide');
  const dots    = $$('.testimonial-dot');
  const prev    = $('.slider-prev');
  const next    = $('.slider-next');
  const wrapper = $('.testimonial-slider');
  if (!track || !slides.length) return;

  let cur = 0, timer = null, dragging = false, sx = 0, dx = 0;

  const go = (i, animate = true) => {
    cur = ((i % slides.length) + slides.length) % slides.length;
    track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' : 'none';
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === cur));
  };

  const autoplay = () => { timer = setInterval(() => go(cur + 1), 4800); };
  const reset    = () => { clearInterval(timer); autoplay(); };

  prev?.addEventListener('click', () => { go(cur - 1); reset(); });
  next?.addEventListener('click', () => { go(cur + 1); reset(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));

  wrapper?.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper?.addEventListener('mouseleave', autoplay);

  // drag
  track.addEventListener('mousedown',  e => { dragging = true; sx = e.clientX; dx = 0; });
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; dx = 0; }, { passive: true });

  const onMove = (x) => {
    if (!dragging && !('ontouchstart' in window)) return;
    dx = x - sx;
    track.style.transition = 'none';
    track.style.transform = `translateX(calc(-${cur * 100}% + ${dx}px))`;
  };

  const onEnd = () => {
    dragging = false;
    if (Math.abs(dx) > 52) { dx < 0 ? go(cur + 1) : go(cur - 1); }
    else { go(cur); }
    reset();
    dx = 0;
  };

  document.addEventListener('mousemove',  e => { if (dragging) onMove(e.clientX); });
  track.addEventListener  ('touchmove',   e => onMove(e.touches[0].clientX), { passive: true });
  document.addEventListener('mouseup',    onEnd);
  track.addEventListener  ('touchend',    onEnd);
  track.addEventListener  ('dragstart',   e => e.preventDefault());

  autoplay();
})();

/* ─── Back to top ───────────────────────────── */

(function () {
  const btn = $('#backToTop');
  if (!btn) return;
  let t = false;
  window.addEventListener('scroll', () => {
    if (t) return;
    requestAnimationFrame(() => {
      btn.classList.toggle('visible', window.scrollY > 420);
      t = false;
    });
    t = true;
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─── Canvas particle field ─────────────────── */

(function () {
  const canvas = $('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;
  const mouse = { x: -999, y: -999 };
  let pts = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  const make = () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    r:  Math.random() * 1.1 + 0.2,
    o:  Math.random() * 0.5 + 0.07,
  });

  const init = () => {
    resize();
    pts = Array.from({ length: clamp(Math.floor(W / 13), 40, 95) }, make);
  };

  const REPEL = 125, CONNECT = 105;

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const ddx = p.x - mouse.x, ddy = p.y - mouse.y;
      const d2 = ddx * ddx + ddy * ddy;
      if (d2 < REPEL * REPEL) {
        const d = Math.sqrt(d2);
        const f = (REPEL - d) / REPEL * 0.26;
        p.vx += ddx / d * f;
        p.vy += ddy / d * f;
      }
      p.vx *= 0.983; p.vy *= 0.983;
      p.x += p.vx;   p.y += p.vy;
      if (p.x < -4) p.x = W + 4; if (p.x > W + 4) p.x = -4;
      if (p.y < -4) p.y = H + 4; if (p.y > H + 4) p.y = -4;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.o})`;
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const ex = p.x - q.x, ey = p.y - q.y;
        const ed = Math.sqrt(ex * ex + ey * ey);
        if (ed < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,255,255,${(1 - ed / CONNECT) * 0.065})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? cancelAnimationFrame(raf) : (raf = requestAnimationFrame(draw));
  });

  init(); draw();
})();

/* ─── Magnetic buttons ──────────────────────── */

(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  $$('.btn, .slider-arrow, .back-to-top, .pc-btn, .nav-cta').forEach(btn => {
    let b;
    btn.addEventListener('mouseenter', () => { b = btn.getBoundingClientRect(); });
    btn.addEventListener('mousemove', e => {
      if (!b) return;
      const dx = (e.clientX - (b.left + b.width  / 2)) / b.width  * 7;
      const dy = (e.clientY - (b.top  + b.height / 2)) / b.height * 7;
      btn.style.transform = `translate(${dx}px, ${dy - 2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; b = null; });
  });
})();

/* ─── Card tilt ─────────────────────────────── */

(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  $$('.sc-card, .contact-card').forEach(card => {
    let b;
    card.addEventListener('mouseenter', () => {
      b = card.getBoundingClientRect();
      card.style.transition = 'transform 0.12s ease, border-color 0.25s ease, box-shadow 0.35s ease';
    });
    card.addEventListener('mousemove', e => {
      if (!b) return;
      const rx = ((e.clientY - b.top)  / b.height - 0.5) * -5;
      const ry = ((e.clientX - b.left) / b.width  - 0.5) *  5;
      card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, box-shadow 0.35s ease';
      card.style.transform = '';
      b = null;
    });
  });
})();

/* ─── Cursor glow ───────────────────────────── */

(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const g = document.createElement('div');
  Object.assign(g.style, {
    position: 'fixed', width: '300px', height: '300px', borderRadius: '50%',
    pointerEvents: 'none', zIndex: '0',
    background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 68%)',
    transform: 'translate(-50%,-50%)', opacity: '0',
    transition: 'opacity 0.4s ease', top: '0', left: '0',
  });
  document.body.appendChild(g);

  let tx = 0, ty = 0, cx = 0, cy = 0, visible = false;

  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!visible) { g.style.opacity = '1'; visible = true; }
  }, { passive: true });

  window.addEventListener('mouseleave', () => { g.style.opacity = '0'; visible = false; });

  (function move() {
    cx = lerp(cx, tx, 0.07);
    cy = lerp(cy, ty, 0.07);
    g.style.left = cx + 'px';
    g.style.top  = cy + 'px';
    requestAnimationFrame(move);
  })();
})();

/* ─── Marquee pause on hover ────────────────── */

(function () {
  const track = $('.marquee-track');
  if (!track) return;
  const strip = $('.marquee-strip');
  strip?.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  strip?.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
})();
