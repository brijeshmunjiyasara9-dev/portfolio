'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function usePortfolioAnimations() {
  useEffect(() => {
    // Load GSAP dynamically
    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;

      // Wait for GSAP to be available from CDN
      const checkGSAP = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkGSAP);
          initAnimations();
        }
      }, 50);

      // Fallback timeout
      setTimeout(() => clearInterval(checkGSAP), 5000);
    };

    const initAnimations = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ── NAV scroll-aware transparency ──
      const nav = document.getElementById('nav');
      const handleScroll = () => {
        if (window.scrollY > 60) {
          nav?.classList.add('scrolled');
        } else {
          nav?.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // ── Hero title line-by-line reveal ──
      document.querySelectorAll('.hero-title .reveal-line').forEach((line, i) => {
        const text = line.innerHTML;
        line.innerHTML = `<span class="reveal-line-inner" style="transition-delay:${i * 0.14}s">${text}</span>`;
      });

      // ── Intersection Observer for scroll reveals ──
      const revealTargets = document.querySelectorAll(
        '.reveal-up, .reveal-fade, .img-reveal, .hero-title'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      revealTargets.forEach((el) => observer.observe(el));

      // Trigger hero elements immediately
      setTimeout(() => {
        document.querySelectorAll('.hero .reveal-up, .hero .img-reveal, .hero-title').forEach(
          (el) => el.classList.add('in-view')
        );
      }, 100);

      // ── GSAP Parallax — full-bleed image ──
      const parallaxEl = document.querySelector('.parallax-img img');
      if (parallaxEl) {
        gsap.to(parallaxEl, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.full-bleed-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // ── Horizontal Drag Scroll ──
      const scrollWrap = document.querySelector('.objects-hscroll-wrap') as HTMLElement | null;
      if (scrollWrap) {
        let isDown = false;
        let startX = 0;
        let scrollLeftVal = 0;

        scrollWrap.addEventListener('mousedown', (e) => {
          isDown = true;
          scrollWrap.style.cursor = 'grabbing';
          startX = (e as MouseEvent).pageX - scrollWrap.offsetLeft;
          scrollLeftVal = scrollWrap.scrollLeft;
        });
        scrollWrap.addEventListener('mouseleave', () => {
          isDown = false;
          scrollWrap.style.cursor = 'grab';
        });
        scrollWrap.addEventListener('mouseup', () => {
          isDown = false;
          scrollWrap.style.cursor = 'grab';
        });
        scrollWrap.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = (e as MouseEvent).pageX - scrollWrap.offsetLeft;
          const walk = (x - startX) * 1.4;
          scrollWrap.scrollLeft = scrollLeftVal - walk;
        });

        // Touch support
        let touchStartX = 0;
        let touchScrollLeft = 0;
        scrollWrap.addEventListener('touchstart', (e) => {
          touchStartX = (e as TouchEvent).touches[0].pageX;
          touchScrollLeft = scrollWrap.scrollLeft;
        }, { passive: true });
        scrollWrap.addEventListener('touchmove', (e) => {
          const walk = ((e as TouchEvent).touches[0].pageX - touchStartX) * 1.2;
          scrollWrap.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
      }

      // ── GSAP section title animations ──
      document.querySelectorAll('.section-title').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      // ── Marquee pause on hover ──
      const marqueeTrack = document.querySelector('.marquee-track') as HTMLElement | null;
      if (marqueeTrack) {
        marqueeTrack.addEventListener('mouseenter', () => {
          marqueeTrack.style.animationPlayState = 'paused';
        });
        marqueeTrack.addEventListener('mouseleave', () => {
          marqueeTrack.style.animationPlayState = 'running';
        });
      }

      // ── Updates number toggle ──
      const nums = document.querySelectorAll('.updates-numbers .num');
      const updateItems = document.querySelectorAll('.update-item');
      nums.forEach((num, i) => {
        num.addEventListener('click', () => {
          nums.forEach((n) => n.classList.remove('active'));
          num.classList.add('active');
          updateItems.forEach((item, j) => {
            (item as HTMLElement).style.opacity = j === i % updateItems.length ? '1' : '0.4';
          });
        });
      });

      // ── GSAP staggered people images ──
      const peopleImgs = document.querySelectorAll('.person-img');
      if (peopleImgs.length) {
        gsap.fromTo(
          peopleImgs,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.people-images', start: 'top 80%', once: true },
          }
        );
      }

      // ── Smooth cursor glow ──
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
        document.addEventListener('mousemove', (e) => {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
          glow.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => {
          glow.style.opacity = '0';
        });
      }

      // ── Page fade in ──
      document.body.style.opacity = '1';

      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    };

    // Page fade in init
    document.body.style.transition = 'opacity 0.35s ease';
    document.body.style.opacity = '0';

    loadGSAP();
  }, []);
}
