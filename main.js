/* ========================================
   main.js — The Obsidian Assembly
   ======================================== */

'use strict';

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   1. NAV — scroll-aware transparency
   ═══════════════════════════════════════ */
const nav = document.getElementById('nav');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastY = y;
}, { passive: true });

/* ═══════════════════════════════════════
   2. HERO title line-by-line reveal
   ═══════════════════════════════════════ */
function wrapLines() {
  document.querySelectorAll('.hero-title .reveal-line').forEach((line, i) => {
    const text = line.innerHTML;
    line.innerHTML = `<span class="reveal-line-inner" style="transition-delay:${i * 0.14}s">${text}</span>`;
  });
}
wrapLines();

/* ═══════════════════════════════════════
   3. INTERSECTION OBSERVER — scroll reveals
   ═══════════════════════════════════════ */
const revealTargets = document.querySelectorAll(
  '.reveal-up, .reveal-fade, .img-reveal, .hero-title'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealTargets.forEach(el => observer.observe(el));

// Also trigger hero immediately on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .img-reveal, .hero-title').forEach(el => {
    setTimeout(() => el.classList.add('in-view'), 100);
  });
});

/* ═══════════════════════════════════════
   4. GSAP PARALLAX — full-bleed image
   ═══════════════════════════════════════ */
const parallaxEl = document.querySelector('.parallax-img img');
if (parallaxEl) {
  gsap.to(parallaxEl, {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.full-bleed-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });
}

/* ═══════════════════════════════════════
   5. HORIZONTAL DRAG SCROLL — objects strip
   ═══════════════════════════════════════ */
const scrollWrap = document.querySelector('.objects-hscroll-wrap');
if (scrollWrap) {
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollWrap.addEventListener('mousedown', e => {
    isDown = true;
    scrollWrap.style.cursor = 'grabbing';
    startX = e.pageX - scrollWrap.offsetLeft;
    scrollLeft = scrollWrap.scrollLeft;
  });
  scrollWrap.addEventListener('mouseleave', () => {
    isDown = false;
    scrollWrap.style.cursor = 'grab';
  });
  scrollWrap.addEventListener('mouseup', () => {
    isDown = false;
    scrollWrap.style.cursor = 'grab';
  });
  scrollWrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWrap.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollWrap.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX, touchScrollLeft;
  scrollWrap.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = scrollWrap.scrollLeft;
  }, { passive: true });
  scrollWrap.addEventListener('touchmove', e => {
    const walk = (e.touches[0].pageX - touchStartX) * 1.2;
    scrollWrap.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });
}

/* ═══════════════════════════════════════
   6. GSAP TEXT SPLIT — section titles
   ═══════════════════════════════════════ */
document.querySelectorAll('.section-title').forEach(el => {
  gsap.fromTo(el, {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    }
  });
});

/* ═══════════════════════════════════════
   7. MARQUEE — pause on hover
   ═══════════════════════════════════════ */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ═══════════════════════════════════════
   8. UPDATES — number toggle
   ═══════════════════════════════════════ */
const nums = document.querySelectorAll('.updates-numbers .num');
const updateItems = document.querySelectorAll('.update-item');

nums.forEach((num, i) => {
  num.addEventListener('click', () => {
    nums.forEach(n => n.classList.remove('active'));
    num.classList.add('active');
    // Animate update items
    updateItems.forEach((item, j) => {
      item.style.opacity = j === i % updateItems.length ? '1' : '0.4';
    });
  });
});

/* ═══════════════════════════════════════
   9. APPLY FORM — submit handler
   ═══════════════════════════════════════ */
const form = document.getElementById('applyForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Submitted';
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'default';
  });
}

/* ═══════════════════════════════════════
   10. GSAP — staggered people images
   ═══════════════════════════════════════ */
const peopleImgs = document.querySelectorAll('.person-img');
if (peopleImgs.length) {
  gsap.fromTo(peopleImgs, {
    opacity: 0,
    y: 50,
    scale: 0.97
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.people-images',
      start: 'top 80%',
      once: true
    }
  });
}

/* ═══════════════════════════════════════
   11. SMOOTH CURSOR glow (desktop only)
   ═══════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,184,138,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.18s ease, top 0.18s ease, opacity 0.3s;
    opacity: 0;
    left: -999px; top: -999px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    glow.style.opacity = '1';
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
}

/* ═══════════════════════════════════════
   12. PAGE TRANSITIONS — fade between pages
   ═══════════════════════════════════════ */
document.body.style.transition = 'opacity 0.35s ease';
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.includes('mailto')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 350);
    });
  }
});
